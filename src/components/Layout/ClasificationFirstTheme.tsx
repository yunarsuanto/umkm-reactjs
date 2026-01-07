import speak from "@/constants/speak";
import { GetLessonGroupLessonItemResponse } from "@/types/admin/lesson_item/GetLessonGroupTypes";
import { Player } from "@lottiefiles/react-lottie-player";

interface ClasificationFirstThemeProps {
    data: GetLessonGroupLessonItemResponse
}

const ClasificationFirstTheme = ({data} : ClasificationFirstThemeProps) => {
    return (
        <div className="relative aspect-square bg-gradient-to-br from-white/40 to-white/10 rounded-xl overflow-hidden shadow-sm border border-white/40 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => speak(data.content)}>
            <Player
                src={`${import.meta.env.VITE_API_IMAGE_URL}${data.media}`}
                autoplay
                loop
                style={{ width: '100%', height: '100%', pointerEvents: 'none' }}
            />
            <div className="absolute bottom-0 w-full bg-black/50 text-white text-center text-sm py-1 font-bold">
                {data.content}
            </div>
        </div>
    )
}

export default ClasificationFirstTheme;