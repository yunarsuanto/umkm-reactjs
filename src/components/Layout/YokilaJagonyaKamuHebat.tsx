import { useAppDispatch } from "@/app/hooks";
import getCachedMediaUrl from "@/constants/get_cache_media";
import { setPlayVideoKamuHebat } from "@/features/generalSlice";
import { Box } from "@mantine/core";
import { useEffect, useRef } from "react";

interface YokilaJagonyaKamuHebatProps {
  play: boolean;
}

const YokilaJagonyaKamuHebat = ({ play = true }: YokilaJagonyaKamuHebatProps) => {
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let isMounted = true;
    let timeout: number | null = null;

    async function run() {
      const video = videoRef.current;
      if (!video || !play) return;

      const cleanup = () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        video.pause();
        video.currentTime = 0;
      };

      // ambil audio dari cache
      const audioUrl = await getCachedMediaUrl("/jagonya-kamu-hebat-audio.m4a");
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      // ambil video dari cache
      const videoUrl = await getCachedMediaUrl("/jagonya-kamu-hebat-video.webm");
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

      timeout = window.setTimeout(playMedia, 300);

      const handleEnded = () => {
        cleanup();
        dispatch(setPlayVideoKamuHebat(false));
      };

      video.addEventListener("ended", handleEnded);

      return () => {
        isMounted = false;
        if (timeout) clearTimeout(timeout);
        video.removeEventListener("ended", handleEnded);
        cleanup();
      };
    }

    run();
  }, [play, dispatch]);

  return (
    <Box>
      <video
        ref={videoRef}
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

export default YokilaJagonyaKamuHebat;
