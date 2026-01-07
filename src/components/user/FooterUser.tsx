import { useNavigate } from "react-router-dom";

export function FooterUser() {
  const navigate = useNavigate()
  return (
    <footer className="w-full border-t p-2 bg-green-100 fixed bottom-0">
      <div className="flex justify-center gap-x-10">
        <div onClick={() => navigate('/user/lesson')}>
          <img src="/lesson.svg" alt="" width={40} />
        </div>
        <div onClick={() => navigate('/acievement')}>
          <img src="/acievement.svg" alt="" width={40} />
        </div>
        <div onClick={() => navigate('/user')} className="absolute left-1/2 -translate-x-1/2 bottom-[3dvh] bg-white p-1 rounded-full">
          <img src="/home.svg" alt="" width={50} />
        </div>
        <div></div>
        <div onClick={() => navigate('/article')}>
          <img src="/article.svg" alt="" width={40} />
        </div>
        <div onClick={() => navigate('/profile')}>
          <img src="/profile.svg" alt="" width={40} />
        </div>
      </div>
    </footer>
  );
}
