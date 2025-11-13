const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.9;
    utterance.pitch = 0.9;
    utterance.volume = 1.0;
    speechSynthesis.speak(utterance);
};

export default speak