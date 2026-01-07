// YokilaUhSalah.tsx
import { useAppDispatch } from "@/app/hooks";
import getCachedMediaUrl from "@/constants/get_cache_media";
import { setPlayVideoUhSalah } from "@/features/generalSlice";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useRef } from "react";
import isIOS from "@/constants/isIos";
import { unlockAudioContext } from "@/constants/audioContext";
import UseAudioUnlock from "@/constants/UseAudioUnlock";

export default function YokilaUhSalah({ play }: any) {
  const dispatch = useAppDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { unlocked, unlock } = UseAudioUnlock();
  const isiOS = isIOS()

  useEffect(() => {
    if (!play) return;
    if (isiOS && !unlocked) return;

    async function run() {
      const url = isiOS
        ? "/uh-salah-audio-fixed.mp3"
        : await getCachedMediaUrl("/uh-salah-audio-fixed.mp3");

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const audio = new Audio(url);
      audioRef.current = audio;

      audio.onended = () => dispatch(setPlayVideoUhSalah(false));

      try {
        if(isiOS){
          await new Promise((resolve) => setTimeout(resolve, 800));
        }else{
          await new Promise((resolve) => setTimeout(resolve, 300));
        }
        await audio.play();
      } catch (e) {
        console.warn("play blocked", e);
      }
    }

    run();
  }, [play, unlocked]);

  if (isiOS && !unlocked)
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
        <button
          className="bg-white px-6 py-3 rounded shadow text-lg font-bold"
          onClick={async () => {
            await unlock();               // 🔓 penting!
            await unlockAudioContext();   // optional (lebih cepat respons)
            dispatch(setPlayVideoUhSalah(true));
          }}
        >
          <p className="text-sky-600">Yah Salah</p>
          <p className="text-pink-600">Ayo Coba Lagi ....</p>
        </button>
      </div>
    );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
      <Player
        src="/uh-salah.json"
        autoplay
        loop={false}
        style={{ height: '250px' }}
        onEvent={(e) => {
          if(e === 'complete'){
            dispatch(setPlayVideoUhSalah(false));
          }
        }}
      />
    </div>
  );
}
