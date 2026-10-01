// Web Audio API and Speech Synthesis for native iOS-like audio feedback

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// iOS-like subtle haptic sound effects using Web Audio synth
export function playHapticSound(type: 'tap' | 'success' | 'complete' | 'flip' | 'error') {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'tap') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.04);
    } else if (type === 'flip') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.06);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'success') {
      // Pleasant iOS chord C5 -> G5
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.1, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } else if (type === 'complete') {
      // Fanfare chord C5 - E5 - G5 - C6
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.15, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.4);
      });
    } else if (type === 'error') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(180, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    }
  } catch (e) {
    // AudioContext might be blocked until user gesture, safely ignore
  }
}

// Speak text with native Web Speech synthesis for Spanish, German, etc.
export function speakText(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    dialect?: string;
    lang?: 'es' | 'de';
    onStart?: () => void;
    onEnd?: () => void;
  }
) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('SpeechSynthesis not supported');
    options?.onEnd?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();

    // Clean punctuation
    const cleanText = text.replace(/¿|¡/g, '').trim();
    if (!cleanText) {
      options?.onEnd?.();
      return;
    }

    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Determine target locale
    const isGerman = options?.lang === 'de' || options?.dialect?.startsWith('de');
    const targetLocale = options?.dialect || (isGerman ? 'de-DE' : 'es-ES');

    utterance.lang = targetLocale;
    utterance.rate = options?.rate ?? 0.9;
    utterance.pitch = options?.pitch ?? 1.0;

    const voices = window.speechSynthesis.getVoices();
    let voice: SpeechSynthesisVoice | undefined;

    if (isGerman) {
      voice =
        voices.find((v) => v.lang === 'de-DE') ||
        voices.find((v) => v.lang.startsWith('de')) ||
        voices.find((v) => v.name.toLowerCase().includes('german') || v.name.toLowerCase().includes('deutsch'));
    } else {
      voice =
        voices.find((v) => v.lang === targetLocale) ||
        voices.find((v) => v.lang.startsWith('es')) ||
        voices.find((v) => v.name.toLowerCase().includes('spanish') || v.name.toLowerCase().includes('español'));
    }

    if (voice) {
      utterance.voice = voice;
    }

    if (options?.onStart) utterance.onstart = options.onStart;
    if (options?.onEnd) utterance.onend = options.onEnd;
    utterance.onerror = () => options?.onEnd?.();

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error('Error in speech synthesis:', err);
    options?.onEnd?.();
  }
}

// Backward compatibility alias
export function speakSpanish(
  text: string,
  options?: {
    rate?: number;
    pitch?: number;
    dialect?: string;
    onStart?: () => void;
    onEnd?: () => void;
  }
) {
  return speakText(text, { ...options, lang: 'es' });
}

