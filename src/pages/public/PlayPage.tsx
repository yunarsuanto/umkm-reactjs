import PublicLayout from '@/components/public/PublicLayout';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState, useRef } from 'react';
import { useCategoryLessonsPublic } from '@/hooks/useCategoryLessonsPublic';
import randomColor from '@/constants/color';
import { setLoadedImages, setLoading } from '@/features/generalSlice';
import getCachedMediaUrl from '@/constants/get_cache_media';
import { GetCategoryLessonPublicDataResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";

interface PlayPageProps {
  setMode: () => void
}

const PlayPage = ({ setMode }: PlayPageProps) => {
  const navigate = useNavigate()
  // const limit = 20
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
    enabled: true,
  }), [pagination.page]);
  const { data } = useCategoryLessonsPublic(pagination, {}, queryOptions)
  const [dataShow, setDataShow] = useState<GetCategoryLessonPublicDataResponse[]>([])
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const dispatch = useAppDispatch()
  const { loadedImages } = useAppSelector((state) => state.general)

  useEffect(() => {
    async function load() {
      if (data && data.data && data.data.length > 0) {
        const updatedData = await Promise.all(
          data.data.map(async (element) => {
            try {
              const url = await getCachedMediaUrl(`${import.meta.env.VITE_API_IMAGE_URL}${element.media}`);
              return {
                ...element,
                mediaShow: url
              } as GetCategoryLessonPublicDataResponse;
            } catch (e) {
              console.warn("Gagal cache media:", e);
              return {
                ...element,
                mediaShow: ''
              } as GetCategoryLessonPublicDataResponse;
            }
          })
        );
        setDataShow(updatedData);
      }
    }
    load();
  }, [data])

  useEffect(() => {
    dispatch(setLoading(true))
    if (data && data.data && data.data.length > 0) {
      dispatch(setLoading(true));
      dispatch(setLoadedImages(new Array(data.data.length).fill(false)));
    }
  }, [])

  useEffect(() => {
    // Check if images are already loaded (cached)
    if (dataShow.length > 0 && imgRefs.current.length > 0) {
      const newLoaded = [...loadedImages];
      imgRefs.current.forEach((img, index) => {
        if (img?.complete) {
          newLoaded[index] = true;
        }
      });
      dispatch(setLoadedImages(newLoaded));
    }
  }, [dataShow]);

  useEffect(() => {
    if (loadedImages.length > 0 && loadedImages.every(Boolean)) {
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    }
  }, [loadedImages]);

  return (
    <PublicLayout setMode={setMode}>
      <div className='flex flex-col p-2 gap-2 mt-[60px] pb-[60px] overflow-y-auto'>
        {dataShow && dataShow.length > 0 && dataShow.map((item, index) => {
          return (
            <a onClick={() => navigate(`/play/${item.id}`, { state: item })}
              className="flex flex-col items-center p-2 border border-default rounded-lg shadow-xs" style={{ backgroundColor: randomColor.randomLightColor() }} key={index}>
              <img
                ref={(el: any) => (imgRefs.current[index] = el)}
                className='rounded-md'
                src={`${item.mediaShow}`}
                alt={item.title}
                onLoad={() => {
                  const newLoaded = [...loadedImages];
                  newLoaded[index] = true;
                  dispatch(setLoadedImages(newLoaded));
                }}
              />
              <div className='flex flex-col'>
                <span className='text-[14px] text-center'>{item.description}</span>
                <h1 className='text-[24px] text-center' style={{ color: randomColor.randomBoldColor() }}>{item.title}</h1>
              </div>
            </a>
          )
        })}
      </div>
    </PublicLayout>
  );
};

export default PlayPage;