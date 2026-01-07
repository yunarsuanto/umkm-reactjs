import speak from "@/constants/speak";
import { GetCategoryLessonPublicDataLessonItemResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import { Player } from "@lottiefiles/react-lottie-player";

interface ClasificationThirdThemeProps {
    data: GetCategoryLessonPublicDataLessonItemResponse
}

const ClasificationThirdTheme = ({data} : ClasificationThirdThemeProps) => {
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

export default ClasificationThirdTheme;