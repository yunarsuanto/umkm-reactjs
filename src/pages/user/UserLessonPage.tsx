import { useAppDispatch, useAppSelector } from "@/app/hooks";
import UserLayout from "@/components/user/UserLayout";
import SelectOption from "@/components/user/SelectOption";
import { setDataPagination } from "@/features/paginationSlice";
import { useCategoryLessonsForUser } from "@/hooks/useCategoryLessonsForUser";
import { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { useLocation, useNavigate } from "react-router-dom";
import debounce from "lodash.debounce";
import getCachedMediaUrl from "@/constants/get_cache_media";
import { GetCategoryLessonDataResponse } from "@/types/admin/category_lesson/GetCategoryLessonTypes";
import randomColor from '@/constants/color';
import { setLoadedImages, setLoading } from "@/features/generalSlice";
import { boolean } from "zod";

const UserLessonPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const type = location.state
  const { loadedImages } = useAppSelector((state) => state.general)
  const categoryLessonTypes = [
    { id: '', title: 'Pilih Materi', description: '' },
    { id: 'basic', title: 'Materi Dasar', description: 'Pengenalan Bentuk Simbol dan Pola Ruang' },
    { id: 'read', title: 'Materi Baca', description: 'Pengenalan 2 Suku Kata Sampai Menjadi Kata atau Kalimat' },
    { id: 'write', title: 'Materi Tulis', description: 'Pengenalan Menulis Simbol dan Pola Ruang' },
    { id: 'counting', title: 'Materi Hitung', description: 'Pengenalan Menghitung Sampai Perkalian' },
    { id: 'story', title: 'Cerita', description: 'Cerita Pendek Baik Untuk Dibaca atau Dibacakan' },
  ]

  const [selectedType, setSelectedType] = useState(type?.id || '')
  const dispatch = useAppDispatch()
  const limit = 20
  const pagination = useAppSelector((state) => state.pagination);
  const queryOptions = useMemo(() => ({
    enabled: pagination.page !== 0,
  }), [pagination.page]);
  const { data } = useCategoryLessonsForUser(pagination, {
    category_lesson_type: selectedType || '',
  }, queryOptions)

  const debouncedSearch = useMemo(() =>
    debounce((value: string) => {
      dispatch(
        setDataPagination({
          search: value,
          page: 1,
        })
      );
    }, 500), [dispatch]
  );


  useEffect(() => {
    dispatch(setDataPagination({
      search: '',
      page: 1,
      limit: limit,
      prev: 0,
      next: 0,
      totalPages: 0,
      totalRecords: 0,
    }))
  }, [dispatch, limit])

  useEffect(() => {
    async function load() {
      if (data && data.data && data.data.length > 0) {
        const newLoaded = [...loadedImages]
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          try {
            const url = await getCachedMediaUrl(`${import.meta.env.VITE_API_IMAGE_URL}${element.media}`);
            element.mediaShow = url
          } catch (e) {
            console.warn("Gagal cache media:", e);
          }
        }
        dispatch(setLoadedImages(newLoaded))
      }
    }
    load();
  }, [data])

  useEffect(() => {
    if (loadedImages.length > 0) {
      dispatch(setLoading(false));
      dispatch(setLoadedImages([]));
    }
  }, [loadedImages]);

  useEffect(() => {
    dispatch(setLoading(true))
    async function load() {
      dispatch(setLoading(true));
      if (data && data.data && data.data.length > 0) {
        dispatch(setLoadedImages(new Array(data.data.length).fill(false)));
        const newLoaded = [...loadedImages]
        for (let index = 0; index < data.data.length; index++) {
          const element = data.data[index];
          try {
            const url = await getCachedMediaUrl(`${import.meta.env.VITE_API_IMAGE_URL}${element.media}`);
            element.mediaShow = url
          } catch (e) {
            console.warn("Gagal cache media:", e);
          }
        }
        setLoadedImages(newLoaded)
      }
    }
    load();
  }, [])
  return (
    <UserLayout>
      {isMobile ? (
        <div className='flex flex-col p-2 mt-[60px] h-[calc(100dvh-60px)]'>
          <div>
            <SelectOption
              options={categoryLessonTypes.map(cat => ({
                value: cat.id,
                label: cat.title
              }))}
              value={selectedType}
              placeholder="Pilih Kategori Materi"
              onChange={(value) => {
                const selected = categoryLessonTypes.find(cat => cat.id === value)
                if (selected) {
                  setSelectedType(value)
                  navigate('/user/lesson', {
                    state: {
                      id: selected.id,
                      title: selected.title,
                      description: selected.description
                    }
                  })
                }
              }}
            />
          </div>
          <div className="flex">
            <input type="text" className="p-2 mt-2 w-full rounded-lg" placeholder={`Cari Materi ${type ? type.title : ''}`} 
              onKeyUp={(e: React.KeyboardEvent<HTMLInputElement>) => {
                const value = (e.target as HTMLInputElement).value;
                debouncedSearch(value);
              }}
            />
          </div>
          <div className="flex-1 overflow-y-auto mt-2 mb-[60px]">
            <div className="flex flex-col gap-2">
              {data && data.data && data.data.length > 0 && data.data.map((item, index) => {
                return (
                  <a onClick={() => navigate(`/user/lesson/${item.id}/${item.category_lesson_type}`, { state: item })} className="flex flex-col items-center p-2 border border-default rounded-lg shadow-xs" style={{ backgroundColor: randomColor.randomLightColor() }} key={index}>
                    <img
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
          </div>
        </div>
      ) : (
        <></>
      )}
    </UserLayout>
  );
};

export default UserLessonPage;
