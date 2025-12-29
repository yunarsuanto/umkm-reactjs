// YokilaJagonyaKamuHebat.tsx
import { useAppDispatch } from "@/app/hooks";
import getCachedMediaUrl from "@/constants/get_cache_media";
import { setPlayVideoKamuHebat } from "@/features/generalSlice";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useRef } from "react";
import isIOS from "@/constants/isIos";
import UseAudioUnlock from "@/constants/UseAudioUnlock";

export default function YokilaJagonyaKamuHebat({ play }: any) {
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { unlocked, unlock } = UseAudioUnlock();

  useEffect(() => {
    if (!play) return;
    if (isIOS && !unlocked) return;

    async function run() {
      const url = isIOS
        ? "/jagonya-kamu-hebat-audio-fixed.mp3"
        : await getCachedMediaUrl("/jagonya-kamu-hebat-audio-fixed.mp3");

      if (audioRef.current instanceof HTMLAudioElement) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => dispatch(setPlayVideoKamuHebat(false));

      try {
        await new Promise((resolve) => setTimeout(resolve, 200));
        await audio.play();
      } catch (e) {
        console.warn("play blocked", e);
      }
    }

    run();
  }, [play, unlocked]);

  if (isIOS && !unlocked)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <button
          className="bg-white px-6 py-3 rounded shadow text-lg font-bold"
          onClick={() => unlock(() => dispatch(setPlayVideoKamuHebat(true)))}
        >
          Aktifkan Suara 🔊
        </button>
      </div>
    );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      {play && (
        <Player src="/jagonya-kamu-hebat.json" autoplay loop={false} style={{ width: "100%", height: 300 }} onEvent={(e) => {
          if(e === 'complete'){
            dispatch(setPlayVideoKamuHebat(false))
          }
        }} />
      )}
    </div>
  );
}
