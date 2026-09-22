import express from 'express';
import path from 'path';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const PORT = 3000;

// Lazy initialization of Gemini client
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // API health route
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
  });

  // AI Spanish Tutor Route
  app.post('/api/tutor/chat', async (req, res) => {
    try {
      const { messages, history, userMessage, message, currentDay, dayTitle } = req.body;
      const effectiveUserMsg = userMessage || message || '¡Hola Sofía!';
      const effectiveHistory = history || messages || [];

      const ai = getGeminiClient();
      if (!ai) {
        // High-quality contextual fallback when Gemini API key is not yet set
        const simulatedReplies: Record<string, { replyEs: string; replyEn: string; tip?: string }> = {
          default: {
            replyEs: "¡Hola! Muy buen esfuerzo. Me alegra mucho que estés practicando tu español hoy.",
            replyEn: "Hello! Great effort. I'm very glad you are practicing your Spanish today.",
            tip: "Recuerda que la constancia diaria es la clave para aprender un idioma en 30 días."
          }
        };

        const lowerMsg = (effectiveUserMsg || '').toLowerCase();
        let fallback = simulatedReplies.default;

        if (lowerMsg.includes('hola') || lowerMsg.includes('buenos')) {
          fallback = {
            replyEs: "¡Hola! ¿Cómo estás hoy? ¿Listo para aprender y practicar?",
            replyEn: "Hello! How are you today? Ready to learn and practice?",
            tip: "En español, '¿Cómo estás?' se usa con amigos, y '¿Cómo está usted?' para situaciones formales."
          };
        } else if (lowerMsg.includes('gracias')) {
          fallback = {
            replyEs: "¡De nada! Es un placer ayudarte en tu viaje de 30 días con el español.",
            replyEn: "You're welcome! It's a pleasure to help you on your 30-day journey with Spanish.",
            tip: "También puedes decir '¡Con gusto!' o 'No hay de qué'."
          };
        } else if (lowerMsg.includes('restaurante') || lowerMsg.includes('tapas') || lowerMsg.includes('comer') || lowerMsg.includes('pedir')) {
          fallback = {
            replyEs: "¡Excelente! En un restaurante español puedes decir: 'Por favor, ¿me trae la cuenta?' o 'Quisiera una paella'.",
            replyEn: "Excellent! In a Spanish restaurant you can say: 'Please, could you bring me the bill?' or 'I would like a paella'.",
            tip: "Usa 'Quisiera...' para sonar muy cortés y educado."
          };
        } else {
          fallback = {
            replyEs: `¡Muy bien dicho! Has practicado: "${effectiveUserMsg}". Sigue practicando expresiones como esta todos los días.`,
            replyEn: `Well said! You practiced: "${effectiveUserMsg}". Keep practicing expressions like this every day.`,
            tip: "Intenta construir oraciones cortas usando el sujeto + verbo + predicado."
          };
        }

        return res.json({
          reply: fallback.replyEs,
          replyEs: fallback.replyEs,
          translation: fallback.replyEn,
          replyEn: fallback.replyEn,
          feedback: fallback.tip,
          corrections: null,
          grammarTip: fallback.tip,
        });
      }

      // Build context for Sofía
      const systemInstruction = `You are Sofía, an engaging, warm, encouraging native Spanish conversation coach in an iOS app called "Aprende: 30-Day Spanish".
The user is learning Spanish in a 30-day curriculum. Currently on Day ${currentDay || 1}: ${dayTitle || 'Spanish Essentials'}.

Your goals:
1. Reply in natural, conversational, clear Spanish suitable for a beginner/intermediate learner.
2. Provide an accurate English translation of your Spanish reply.
3. If the user's Spanish input had any grammar, spelling, or vocabulary mistakes, provide a gentle, polite correction and explanation.
4. Provide a mini practical tip or follow-up question to keep the conversation flowing.

You MUST respond strictly with a valid JSON object matching this schema:
{
  "replyEs": "Your response in Spanish (1 to 3 conversational sentences)",
  "replyEn": "English translation of your reply",
  "corrections": "Gentle correction of user's sentence if needed, or null if their Spanish was great or in English",
  "grammarTip": "A 1-sentence helpful cultural or grammar nugget related to their message"
}`;

      // Prepare conversation history
      const historyContents = (effectiveHistory || []).slice(-6).map((m: any) => ({
        role: (m.role === 'model' || m.role === 'assistant' || m.sender === 'tutor') ? 'model' : 'user',
        parts: [{ text: m.content || m.text || m.textEs || '' }],
      }));

      // Add user's latest message
      historyContents.push({
        role: 'user',
        parts: [{ text: effectiveUserMsg }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: historyContents,
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      });

      const text = response.text || '{}';
      try {
        const parsed = JSON.parse(text);
        const replyEs = parsed.replyEs || "¡Hola! Estoy muy feliz de conversar contigo.";
        const replyEn = parsed.replyEn || "Hello! I am very happy to talk with you.";
        const feedback = parsed.corrections || parsed.grammarTip || null;

        return res.json({
          reply: replyEs,
          replyEs,
          translation: replyEn,
          replyEn,
          feedback,
          corrections: parsed.corrections || null,
          grammarTip: parsed.grammarTip || null,
        });
      } catch (parseError) {
        const clean = text.replace(/[{}"]/g, '').trim();
        return res.json({
          reply: clean,
          replyEs: clean,
          translation: "I'm practicing Spanish with you!",
          replyEn: "I'm practicing Spanish with you!",
          feedback: null,
          corrections: null,
          grammarTip: null,
        });
      }
    } catch (err: any) {
      console.error('Gemini tutor error:', err);
      return res.status(500).json({
        error: 'Error generating tutor response',
        reply: '¡Hola! Te entendí perfectamente. Continuemos practicando.',
        replyEs: '¡Hola! Te entendí perfectamente. Continuemos practicando.',
        translation: 'Hello! I understood you perfectly. Let us keep practicing.',
        replyEn: "Hello! I understood you perfectly. Let us keep practicing.",
      });
    }
  });

  // Vite dev middleware or static production serving
  const distPath = path.join(process.cwd(), 'dist');
  const isProduction = process.env.NODE_ENV === 'production' || fs.existsSync(path.join(distPath, 'index.html'));

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
