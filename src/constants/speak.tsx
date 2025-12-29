const getIndoVoice = (): Promise<SpeechSynthesisVoice | undefined> => {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length) {
      // Try to find Indonesian voice
      const idVoice = voices.find(v => v.lang.startsWith("id"));
      // If not found, try English
      const enVoice = voices.find(v => v.lang.startsWith("en"));
      // Fallback to first available voice
      const defaultVoice = voices[0];

      const voice = idVoice || enVoice || defaultVoice;
      resolve(voice);
    } else {
      // Handle voices not loaded yet
      speechSynthesis.onvoiceschanged = () => {
        const voices = speechSynthesis.getVoices();
        const idVoice = voices.find(v => v.lang.startsWith("id"));
        const enVoice = voices.find(v => v.lang.startsWith("en"));
        const defaultVoice = voices[0];

        const voice = idVoice || enVoice || defaultVoice;
        resolve(voice);
      };
    }
  });
};

const speak = async (text: string) => {
  if (!text) return;

  try {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "id-ID";
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    utterance.volume = 1.0;

    // Get voice (may be undefined on some Android devices)
    const voice = await getIndoVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // Android workaround: ensure volume is set
    utterance.volume = 1.0;

    // Add error handlers
    utterance.onerror = (event) => {
      // Ignore "canceled" error - it's expected when we call speechSynthesis.cancel()
      if (event.error === 'canceled') {
        return;
      }

      console.error("Speech synthesis error:", event.error);
      if (event.error === 'not-allowed') {
        console.warn('⚠️ Speech was blocked by browser. Make sure speak() is called from a user interaction (click, touch, etc.)');
      }
    };

    // Speak - This MUST be called from a user interaction (onClick, etc.)
    speechSynthesis.speak(utterance);
  } catch (error) {
    console.error("Speech synthesis error:", error);
  }
};

export default speak;