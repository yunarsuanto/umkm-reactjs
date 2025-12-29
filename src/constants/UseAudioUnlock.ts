import { useState } from "react";

export default function UseAudioUnlock() {
  const [unlocked, setUnlocked] = useState(false);

  const unlock = async (afterUnlock?: () => void) => {
    if (unlocked) return;

    // const audio = new Audio("/silence.mp3");
    // audio.volume = 0;

    try {
    //   await audio.play();
      setUnlocked(true);
      console.log("🔓 audio unlocked");

      // ⬇️ panggil callback setelah berhasil unlock
      afterUnlock?.();

    } catch (e) {
      console.warn("unlock failed", e);
    }
  };

  return { unlocked, unlock };
}
