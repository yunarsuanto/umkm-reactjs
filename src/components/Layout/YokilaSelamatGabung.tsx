import { useAppDispatch } from "@/app/hooks";
import getCachedMediaUrl from "@/constants/get_cache_media";
import { setPlayVideoGabung } from "@/features/generalSlice";
import { Box } from "@mantine/core";
import { useEffect, useRef } from "react";

interface YokilaSelamatGabungProps {
  play: boolean;
}

const YokilaSelamatGabung = ({ play = true }: YokilaSelamatGabungProps) => {
  const dispatch = useAppDispatch();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
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
        // ambil cache video & audio
        const cachedVideoUrl = await getCachedMediaUrl("/selamat-gabung-video.webm");
        const cachedAudioUrl = await getCachedMediaUrl("/selamat-gabung-audio.m4a");

        video.src = cachedVideoUrl;

        const audio = new Audio(cachedAudioUrl);
        audioRef.current = audio;

        const playMedia = async () => {
          try {
            video.muted = false;
            await video.play().catch(() => {});
            if (isMounted) await audio.play().catch(() => {});
          } catch (err) {
            console.warn("Autoplay diblokir:", err);
          }
        };

        const timeout = setTimeout(playMedia, 300);

        const handleEnded = () => {
          cleanup();
          dispatch(setPlayVideoGabung(false));
        };

        video.addEventListener("ended", handleEnded);

        return () => {
          isMounted = false;
          clearTimeout(timeout);
          video.removeEventListener("ended", handleEnded);
          cleanup();
        };
      }
    })();
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

export default YokilaSelamatGabung;
