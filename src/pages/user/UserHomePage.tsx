import UserLayout from "@/components/user/UserLayout"
import { Player } from "@lottiefiles/react-lottie-player";
import { isMobile } from 'react-device-detect';
import randomColor from '@/constants/color';
import { useRef } from "react";
import { GetCategoryLessonDataResponse } from "@/types/admin/category_lesson/GetCategoryLessonTypes";
import { useNavigate } from "react-router-dom";

const UserHomePage = () => {
    const navigate = useNavigate()
    const data = [
        {id: 'basic', title: 'Materi Dasar', description: 'Pengenalan Bentuk Simbol dan Pola Ruang', category_lesson_type: '', media: '/bgcontent-1.jpeg', mediaShow: ''},
        {id: 'read', title: 'Materi Baca', description: 'Pengenalan 2 Suku Kata Sampai Menjadi Kata atau Kalimat', category_lesson_type: '', media: '/bgcontent-2.jpeg', mediaShow: ''},
        {id: 'write', title: 'Materi Tulis', description: 'Pengenalan Menulis Simbol dan Pola Ruang', category_lesson_type: '', media: '/bgcontent-3.jpeg', mediaShow: ''},
        {id: 'counting', title: 'Materi Hitung', description: 'Pengenalan Menghitung Sampai Perkalian', category_lesson_type: '', media: '/bgcontent-4.jpeg', mediaShow: ''},
        {id: 'story', title: 'Cerita', description: 'Cerita Pendek Baik Untuk Dibaca atau Dibacakan', category_lesson_type: '', media: '/bgcontent-5.jpeg', mediaShow: ''},
    ] as GetCategoryLessonDataResponse[]
    return(
        <UserLayout>
            {isMobile ? (
                <div className='flex flex-col p-2 mt-[60px] h-[calc(100dvh-60px)]'>
                    <div className={`relative bg-[url('/bg-peringkat.png')] w-full bg-cover bg-no-repeat h-[30dvh]`}>
                        <div className="absolute inset-0 flex justify-center gap-x-[21px] top-[23dvh] z-10">
                            <div className="w-[80px] text-center text-white text-xl drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                                Madjid
                            </div>
                            <div className="w-[80px] text-center text-white text-xl drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                                Aswal
                            </div>
                            <div className="w-[80px] text-center text-white text-xl drop-shadow-[0_1px_2px_rgba(0,0,0,1)]">
                                Cecep
                            </div>
                        </div>
                        <Player
                            src="/peringkat.json"
                            autoplay
                            loop
                            style={{ height: '25dvh', pointerEvents: 'none', marginTop: '5dvh' }}
                        />
                        <div className="border-b-2 border-b-gray-300 mt-2"></div>
                    </div>
                    <div className="flex-1 overflow-y-auto mt-4">
                        <div className='flex flex-col gap-y-1'>
                            {data && data.map((item, index) => {
                                return(
                                    <div key={index} style={{paddingBottom: `${index === (data.length - 1) ? '60px' : '0px'}`}}>
                                        <a onClick={() => navigate(`/user/lesson`, { state: item })}
                                        className="flex flex-col items-center p-4 border border-default rounded-lg shadow-xs" style={{ backgroundColor: randomColor.randomLightColor() }}>
                                            <p className="text-lg p-2 rounded-lg" style={{color: randomColor.randomBoldColor()}}>
                                                {item.title}
                                            </p>
                                            <img className='rounded-md' src={`${item.media}`} alt={item.title} />
                                            <p className="text-center" style={{color: randomColor.randomBoldColor()}}>{item.description}</p>
                                        </a>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </UserLayout>
    )
}

export default UserHomePage