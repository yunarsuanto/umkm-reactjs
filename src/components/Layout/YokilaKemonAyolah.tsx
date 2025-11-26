import { useAppDispatch } from "@/app/hooks";
import getCachedMediaUrl from "@/constants/get_cache_media";
import { setPlayVideoKemon } from "@/features/generalSlice";
import { Box } from "@mantine/core";
import { useEffect, useRef } from "react";

interface YokilaKemonAyolahProps {
  play: boolean;
}

const YokilaKemonAyolah = ({ play = true }: YokilaKemonAyolahProps) => {
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function run() {
      const video = videoRef.current;
      if (!video) return;

      const cleanup = () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        video.pause();
        video.currentTime = 0;
      };

      if (play) {
        // cache audio
        const audioUrl = await getCachedMediaUrl("/kemon-ayolah-audio.m4a");
        const audio = new Audio(audioUrl);
        audioRef.current = audio;

        // cache video
        const videoUrl = await getCachedMediaUrl("/kemon-ayolah-video.webm");
        video.src = videoUrl;

        const playMedia = async () => {
          try {
            video.muted = false;
            await video.play().catch(() => {});
            if (isMounted) await audio.play().catch(() => {});
          } catch (err) {
            console.warn("Autoplay diblokir oleh browser:", err);
          }
        };

        const timeout = setTimeout(playMedia, 300);

        const handleEnded = () => {
          cleanup();
          dispatch(setPlayVideoKemon(false));
        };

        video.addEventListener("ended", handleEnded);

        return () => {
          isMounted = false;
          clearTimeout(timeout);
          video.removeEventListener("ended", handleEnded);
          cleanup();
        };
      }
    }

    run();
  }, [play, dispatch]);

  return (
    <Box>
      <video
        ref={videoRef}
        src="/kemon-ayolah-video.webm"
        muted
        playsInline
        style={{
          width: 150,
          position: "fixed",
          top: "calc(50% - 150px)",
          left: "calc(50% - 75px)",
          zIndex: 999,
        }}
      />
    </Box>
  );
};

export default YokilaKemonAyolah;
