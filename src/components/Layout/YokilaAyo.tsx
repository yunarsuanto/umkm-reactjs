import { useAppDispatch } from "@/app/hooks";
import getCachedMediaUrl from "@/constants/get_cache_media";
import { setPlayVideoAyo } from "@/features/generalSlice";
import { Box } from "@mantine/core";
import { useEffect, useRef } from "react";

interface YokilaAyoProps {
  play: boolean;
}

const YokilaAyo = ({ play = true }: YokilaAyoProps) => {
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
        // ambil audio + video dari cache
        const audioUrl = await getCachedMediaUrl("/ayo-audio.m4a");
        const videoUrl = await getCachedMediaUrl("/ayo-video.webm");

        video.src = videoUrl;

        const audio = new Audio(audioUrl);
        audioRef.current = audio;

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
          dispatch(setPlayVideoAyo(false));
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
        muted
        playsInline
        style={{
          width: 150,
          objectPosition: "center center",
          position: "fixed",
          right: 100,
          top: 100,
          zIndex: 999,
        }}
      />
    </Box>
  );
};

export default YokilaAyo;