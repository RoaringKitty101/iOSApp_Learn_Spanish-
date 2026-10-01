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

  // AI Language Tutor Route (supports German & Spanish)
  app.post('/api/tutor/chat', async (req, res) => {
    try {
      const { messages, history, userMessage, message, currentDay, dayTitle, language = 'es' } = req.body;
      const effectiveUserMsg = userMessage || message || (language === 'de' ? 'Hallo Lukas!' : '¡Hola Sofía!');
      const effectiveHistory = history || messages || [];
      const isGerman = language === 'de';

      const ai = getGeminiClient();
      if (!ai) {
        // Contextual fallback when Gemini API key is not yet set
        const lowerMsg = (effectiveUserMsg || '').toLowerCase();
        let fallbackReplyTarget = '';
        let fallbackReplyEn = '';
        let fallbackTip = '';

        if (isGerman) {
          if (lowerMsg.includes('hallo') || lowerMsg.includes('guten tag') || lowerMsg.includes('morgen')) {
            fallbackReplyTarget = "Hallo! Wie geht es dir heute? Bist du bereit, Deutsch zu üben?";
            fallbackReplyEn = "Hello! How are you today? Are you ready to practice German?";
            fallbackTip = "In German, remember that all nouns are capitalized (z.B. der Tag, das Brot, die Zeit).";
          } else if (lowerMsg.includes('danke')) {
            fallbackReplyTarget = "Gern geschehen! Es ist mir ein Vergnügen, dir beim Deutschlernen zu helfen.";
            fallbackReplyEn = "You're welcome! It's my pleasure to help you learn German.";
            fallbackTip = "You can also say 'Bitte sehr!' or 'Nichts zu danken!'.";
          } else if (lowerMsg.includes('restaurant') || lowerMsg.includes('essen') || lowerMsg.includes('bier') || lowerMsg.includes('bestellen')) {
            fallbackReplyTarget = "Ausgezeichnet! Im Restaurant sagst du: 'Die Rechnung, bitte!' oder 'Ich hätte gerne ein Schnitzel'.";
            fallbackReplyEn = "Excellent! In a restaurant you say: 'The bill, please!' or 'I would like a schnitzel'.";
            fallbackTip = "Use 'Ich hätte gerne...' (I would like to have...) to sound very polite in German.";
          } else {
            fallbackReplyTarget = `Sehr gut gesagt! Du hast geübt: "${effectiveUserMsg}". Übe weiter jeden Tag für schnelle Fortschritte.`;
            fallbackReplyEn = `Very well said! You practiced: "${effectiveUserMsg}". Keep practicing every day for rapid progress.`;
            fallbackTip = "Keep in mind the V2 word order rule: the conjugated verb always sits in position 2 in main clauses.";
          }
        } else {
          if (lowerMsg.includes('hola') || lowerMsg.includes('buenos')) {
            fallbackReplyTarget = "¡Hola! ¿Cómo estás hoy? ¿Listo para aprender y practicar?";
            fallbackReplyEn = "Hello! How are you today? Ready to learn and practice?";
            fallbackTip = "In Spanish, '¿Cómo estás?' is casual with friends, and '¿Cómo está usted?' is for formal situations.";
          } else if (lowerMsg.includes('gracias')) {
            fallbackReplyTarget = "¡De nada! Es un placer ayudarte en tu viaje de 30 días con el español.";
            fallbackReplyEn = "You're welcome! It's a pleasure to help you on your 30-day journey with Spanish.";
            fallbackTip = "You can also say '¡Con gusto!' or 'No hay de qué'.";
          } else if (lowerMsg.includes('restaurante') || lowerMsg.includes('tapas') || lowerMsg.includes('comer') || lowerMsg.includes('pedir')) {
            fallbackReplyTarget = "¡Excelente! En un restaurante español puedes decir: 'Por favor, ¿me trae la cuenta?' o 'Quisiera una paella'.";
            fallbackReplyEn = "Excellent! In a Spanish restaurant you can say: 'Please, could you bring me the bill?' or 'I would like a paella'.";
            fallbackTip = "Use 'Quisiera...' to sound very courteous and polite.";
          } else {
            fallbackReplyTarget = `¡Muy bien dicho! Has practicado: "${effectiveUserMsg}". Sigue practicando expresiones como esta todos los días.`;
            fallbackReplyEn = `Well said! You practiced: "${effectiveUserMsg}". Keep practicing expressions like this every day.`;
            fallbackTip = "Try constructing short, clear sentences using subject + verb + predicate.";
          }
        }

        return res.json({
          reply: fallbackReplyTarget,
          replyTarget: fallbackReplyTarget,
          translation: fallbackReplyEn,
          replyEn: fallbackReplyEn,
          feedback: fallbackTip,
          corrections: null,
          grammarTip: fallbackTip,
        });
      }

      // Build context for AI Tutor
      const tutorName = isGerman ? 'Lukas Schmidt' : 'Mateo Álvarez';
      const targetLangName = isGerman ? 'German' : 'Spanish';
      const systemInstruction = `You are ${tutorName}, an engaging, warm, encouraging native ${targetLangName} conversation coach in an iOS app called "Lingua30: 30-Day Language Accelerator".
The user is an English speaker learning ${targetLangName} in a 30-day intensive curriculum. Currently on Day ${currentDay || 1}: ${dayTitle || `${targetLangName} Essentials`}.

Your goals:
1. Reply in natural, conversational, clear ${targetLangName} suitable for an A1-B1 learner.
2. Provide an accurate English translation of your ${targetLangName} reply.
3. If the user's ${targetLangName} input had any grammar, spelling, gender (der/die/das or el/la), case, or word order mistakes, provide a gentle, polite 1-sentence correction and explanation. If their message was in English or error-free, set corrections to null.
4. Provide a mini practical tip or follow-up question in English to keep the conversation flowing.

You MUST respond strictly with a valid JSON object matching this schema:
{
  "replyTarget": "Your response in ${targetLangName} (1 to 3 conversational sentences)",
  "replyEn": "English translation of your reply",
  "corrections": "Gentle correction of user's sentence if needed, or null if their ${targetLangName} was great or in English",
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
        const replyText = parsed.replyTarget || parsed.replyEs || parsed.reply || (isGerman ? "Hallo! Ich freue mich, mit dir zu sprechen." : "¡Hola! Estoy muy feliz de conversar contigo.");
        const replyEn = parsed.replyEn || parsed.translation || (isGerman ? "Hello! I am happy to speak with you." : "Hello! I am very happy to talk with you.");
        const feedback = parsed.corrections || parsed.grammarTip || null;

        return res.json({
          reply: replyText,
          replyTarget: replyText,
          replyEs: replyText,
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
          replyTarget: clean,
          replyEs: clean,
          translation: isGerman ? "Let's keep practicing German!" : "Let's keep practicing Spanish!",
          replyEn: isGerman ? "Let's keep practicing German!" : "Let's keep practicing Spanish!",
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
