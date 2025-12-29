import { setShowMediaModal } from "../../../features/categoryLessonSlice";
import { useAppDispatch } from "../../../app/hooks";

interface ShowImageModalProps {
  open: boolean;
  source: string;
  title: string;
  content: string;
  latitude?: number;
  longitude?: number;
}

const ShowImageModal = ({open, source, title, content, latitude, longitude} : ShowImageModalProps) => {
    const dispatch = useAppDispatch()
    const handleClose = () => {
        dispatch(setShowMediaModal(false));
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
                {/* Header */}
                <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>

                {/* Image Section */}
                <div className="bg-gray-100 rounded-lg overflow-hidden mb-4">
                    <img
                        src={source}
                        alt={title}
                        className="w-full h-auto max-h-96 object-contain"
                    />
                </div>

                {/* Content Badge */}
                <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-pink-100 text-pink-700 text-sm font-medium rounded-full">
                        {content}
                    </span>
                </div>

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
                >
                    Close
                </button>
            </div>
        </div>
    )
}

export default ShowImageModal;