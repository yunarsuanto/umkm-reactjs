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
        <div className="absolute top-[10px] left-[10px] w-[88dvw] z-50">
          <button className="relative btn bg-white size-[25px] rounded-full flex justify-center items-center" onClick={() => !show ? setShow(true) : setShow(false)}>
            <img src={'/info.svg'} alt="add" width={20} />
          </button>
          {show && (
            <div className="relative mt-[5px] p-4 text-sm bg-yellow-200 rounded-lg" role="alert">
                <span>{description}</span>
            </div>
          )}
        </div>
    )
}

export default ShowInfo;