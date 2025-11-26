const getIndoVoice = (): Promise<SpeechSynthesisVoice> => {
  return new Promise((resolve) => {
    const voices = speechSynthesis.getVoices();
    if (voices.length) {
      const voice = voices.find(v => v.lang === "id-ID") || voices[0];
      resolve(voice);
    } else {
      speechSynthesis.onvoiceschanged = () => {
        const voices = speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang === "id-ID") || voices[0];
        resolve(voice);
      };
    }
  });
};

const speak = async (text: string) => {
  if (!text) return;
  speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "id-ID";
  utterance.rate = 1.0;
  utterance.pitch = 1.1;
  utterance.volume = 1.0;

  const voice = await getIndoVoice();
  utterance.voice = voice;

  speechSynthesis.speak(utterance);
};

export default speak;