import speak from "@/constants/speak"
import { useEffect, useState } from "react"

interface ShowInfoProps {
    description: string
}

const ShowInfo = ({description}: ShowInfoProps) => {
    const [show, setShow] = useState(false)
    useEffect(() => {
        if(show){
            speak(description)
        }
        setTimeout(() => {
            setShow(false)
        }, 4000)
    }, [show])
    return (
        <div className="absolute bottom-[10px] right-[10px] z-50">
          {show && (
            <div className="relative mb-[5px] p-4 text-sm bg-yellow-200 rounded-lg" role="alert">
                <span>{description}</span>
            </div>
          )}
          <button className="relative float-end btn bg-white size-[35px] rounded-full flex justify-center items-center" onClick={() => !show ? setShow(true) : setShow(false)}>
            <img src={'/speaker.svg'} alt="add" width={30} />
          </button>
        </div>
    )
}

export default ShowInfo;