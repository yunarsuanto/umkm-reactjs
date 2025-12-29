import { GetCategoryLessonPublicDataLessonItemResponse } from "@/types/admin/category_lesson/GetCategoryLessonPublicTypes";
import ShowInfo from "./Info";
import { useEffect, useRef, useState } from "react";
import speak from "@/constants/speak";
import {
  closestCenter,
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from "@dnd-kit/core";
import { SortableContext, arrayMove, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SequenceSortableItem from "./SequenceShortableItem";

interface Props {
  data: GetCategoryLessonPublicDataLessonItemResponse[]; // urutan benar
  array: GetCategoryLessonPublicDataLessonItemResponse[]; // random
  description: string;
  onCorrectAnswer: () => void;
  onWrongAnswer: () => void;
}

const SequenceSecondTheme = ({ data, array, description, onCorrectAnswer, onWrongAnswer }: Props) => {
  const playerRef = useRef<(HTMLElement | null)[]>([]);
  const [items, setItems] = useState(array);       // untuk sortable
  const [isCorrect, setIsCorrect] = useState(false); // brightness check
  const [correctIndexes, setCorrectIndexes] = useState<boolean[]>([]);
  
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 15 }}),
    useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 }})
  );

  const checkCorrectOrder = (arr: GetCategoryLessonPublicDataLessonItemResponse[]) => {
    const correctArr = arr.map((item, index) => item.id === data[index].id);
    setCorrectIndexes(correctArr);
    const allCorrect = correctArr.every(Boolean);
    if (allCorrect) {
      onCorrectAnswer();
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = items.findIndex(i => i.id === active.id);
    const newIndex = items.findIndex(i => i.id === over.id);

    const newOrder = arrayMove(items, oldIndex, newIndex);
    setItems(newOrder);
  };

  useEffect(() => {
    checkCorrectOrder(items);
  }, [items]);
  return (
    <div>
      {items.length > 0 && <ShowInfo description={description} />}

      <DndContext
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
      >
        <SortableContext items={items.map(i => i.id)}>
          <div className="h-[100%] grid grid-cols-2 gap-y-3 gap-x-5">
            {items.map((item, index) => (
              <SequenceSortableItem key={item.id} item={item}>
                <div onClick={() => speak(item.content)}>
                  <lottie-player
                    ref={(el: any) => (playerRef.current[index] = el)}
                    autoplay
                    loop
                    mode="normal"
                    src={`${import.meta.env.VITE_API_IMAGE_URL}${item.media}`}
                    style={{
                      pointerEvents: "none",
                      touchAction: "none",
                      height: "80%",
                      filter: `brightness(${correctIndexes[index] ? "1" : "0"})`,
                      transition: "filter .3s ease"
                    }}
                  />
                  <div className="text-center text-white">
                    <p className="font-bold" style={{ textShadow: "0px 0px 3px black" }}>
                      {item.order}
                    </p>
                  </div>
                </div>
              </SequenceSortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default SequenceSecondTheme;
