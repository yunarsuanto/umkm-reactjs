import speak from "@/constants/speak";
import { GetLessonGroupLessonItemResponse } from "@/types/admin/lesson_item/GetLessonGroupTypes";
import { Player } from "@lottiefiles/react-lottie-player";

interface ClasificationSecondThemeProps {
    data: GetLessonGroupLessonItemResponse
    isActive: boolean
}

const ClasificationSecondTheme = ({data, isActive} : ClasificationSecondThemeProps) => {
    if (!isActive) {
        return (
        <div className="relative aspect-square rounded-xl border border-white/40 bg-white/10 opacity-50">
            <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-6xl">?</p>
            </div>
        </div>
        );
    }

    return (
        <div className="relative aspect-square bg-gradient-to-br from-white/40 to-white/10 rounded-xl overflow-hidden shadow-sm border border-white/40 cursor-pointer hover:scale-105 transition-transform"
            onClick={() => speak(data.content)}>
            <Player
                src={`${import.meta.env.VITE_API_IMAGE_URL}${data.media}`}
                autoplay
                loop
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    pointerEvents: 'none'
                }}
            />
        </div>
    )
} 

export default ClasificationSecondTheme;