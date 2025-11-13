import { useAppDispatch } from "@/app/hooks";
import { setPlayVideo } from "@/features/generalSlice";
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
        const audio = new Audio("/selamat-gabung-audio.m4a");
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
            dispatch(setPlayVideo(false));
        };

        video.addEventListener("ended", handleEnded);

        return () => {
            isMounted = false;
            clearTimeout(timeout);
            video.removeEventListener("ended", handleEnded);
            cleanup();
        };
    }
  }, [play, dispatch]);

  return (
    <Box>
        <video
            ref={videoRef}
            src="/selamat-gabung-video.webm"
            muted
            playsInline
            style={{
              width: 150,
              position: "fixed",
              top: "calc(50% - 150px)",
              left: "calc(50% - 75px)",
              zIndex: 2,
            }}
        />
    </Box>
  );
};

export default YokilaSelamatGabung;
