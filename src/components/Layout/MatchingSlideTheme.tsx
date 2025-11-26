import { useAppDispatch } from "@/app/hooks";
import { setPlayVideoKamuHebat, setPlayVideoUhSalah } from "@/features/generalSlice";
import { BackgroundImage, Box, Grid, Image } from "@mantine/core";
import {
  DndContext,
  useDraggable,
  useDroppable,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core";
import { useDeviceMode } from "@/constants/dimension";
import { useState, useEffect } from "react";

interface MatchingSlideThemeProps {
  r: any;
  options: any[]; 
  onCorrectAnswer: () => void;
  onDragStart: () => void;
  onDragEnd: () => void;
}

const MatchingSlideTheme = ({ r, options, onCorrectAnswer, onDragStart: onDragStartParent, onDragEnd: onDragEndParent }: MatchingSlideThemeProps) => {
  const dispatch = useAppDispatch();
  const { device, orientation } = useDeviceMode();
  const [activeItem, setActiveItem] = useState<any>(null);

  useEffect(() => {
    setActiveItem(null);
  }, [r]);

  const HEADER_STYLE: any = {
    "mobile-small": { font: 15, height: 180 },
    "mobile-medium": { font: 16, height: 200 },
    "mobile-medium-plus": { font: 17, height: 250 },
    "mobile-large": { font: 18, height: 250 },

    "tablet": { font: 20, height: 350 },
    "tablet-large": { font: 20, height: 400 },
    "tablet-extra-large": { font: 20, height: 450 },

    "laptop": { font: 22, height: 500 },
    "laptop-standart": { font: 22, height: 500 },
    "laptop-large": { font: 22, height: 500 },
    "laptop-extra-large": { font: 22, height: 500 },

    "desktop": { font: 80, height: 1000 },
    "desktop-large": { font: 80, height: 500 },

    "4k": { font: 100, height: 1000 },
  };

  const ORIENTATION_STYLE: any = {
    portrait: { fontMultiplier: 1, heightMultiplier: 1 },
    landscape: { fontMultiplier: 1.1, heightMultiplier: 0.9 },
  };

  const headerBase = HEADER_STYLE[device];
  const orient = ORIENTATION_STYLE[orientation];

  const headerStyle = {
    font: headerBase.font * orient.fontMultiplier,
    height: headerBase.height * orient.heightMultiplier,
  };

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 8,
      },
    })
  );

  const DraggableItem = ({ id, children, isDragging }: any) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });
    return (
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={{
          border: isDragging ? '2px solid #1976d2' : '2px solid #4caf50',
          background: isDragging ? '#e3f2fd' : '#f1f8e9',
          touchAction: "none",
          cursor: "grab",
          pointerEvents: "auto",
          opacity: isDragging ? 0 : 1,
          borderRadius: 12,
          width: '100%',
          maxWidth: 220,
          margin: '0 auto',
          boxSizing: 'border-box',
          transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined,
        }}
      >
        {children}
      </div>
    );
  };

  const DroppableItem = ({ id, children }: any) => {
    const { setNodeRef, isOver } = useDroppable({ id });
    return (
      <div
        ref={setNodeRef}
        style={{
          border: isOver ? '2px dashed #1976d2' : '2px dashed #aaa',
          background: isOver ? '#e3f2fd' : '#fff',
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: 120,
          borderRadius: 12,
          marginBottom: 8,
        }}
      >
        {children}
      </div>
    );
  };

  const handleDragStart = (event: any) => {
    if (event.active.id === r.id) {
      setActiveItem(r);
      onDragStartParent?.();
    }
  };

  const handleDragEnd = ({ active, over }: any) => {
    setActiveItem(null);
    onDragEndParent?.();
    if (!over) return;
    if (active.id === over.id) {
      // dispatch(setPlayVideoKamuHebat(true));
      onCorrectAnswer()
      // setTimeout(onCorrectAnswer, 2000);
    } else {
      dispatch(setPlayVideoUhSalah(true));
    }
  };

  if (!r || !options || options.length === 0) {
    return (
      <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
        <p style={{ color: '#888', fontSize: 18, marginTop: 40 }}>Data tidak ditemukan</p>
      </div>
    );
  }

  return (
    <Grid justify={'center'} align={'center'} style={{textAlign: 'center'}}>
      <DndContext
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        collisionDetection={closestCenter}
        modifiers={[]}
      >
        {options.map((opt: any, idx: number) => (
          <Grid.Col span={orientation === 'portrait' ? 6 : 3} key={idx} style={{display: 'flex', justifyContent: 'center'}}>
            <div
              style={{
                maxHeight: headerStyle.height + 60,
                maxWidth: "100%",
              }}
            >
              <DroppableItem id={opt.id}>
                <BackgroundImage
                  src={'./gradient-14.jpeg'}
                  style={{
                    border: '0px',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                >
                  <video
                    src={`${import.meta.env.VITE_API_IMAGE_URL}${opt.media}`}
                    autoPlay
                    muted
                    loop
                    playsInline
                    style={{
                      maxHeight: headerStyle.height,
                      filter: "brightness(0)",
                      pointerEvents: "none",
                      width: '100%',
                      borderRadius: 12,
                    }}
                    onError={() => {
                      console.error('VIDEO ERROR:', opt.media);
                    }}
                  />
                </BackgroundImage>
              </DroppableItem>
            </div>
          </Grid.Col>
        ))}
        <Grid.Col span={orientation === 'portrait' ? 6 : 3} key={options.length+1} style={{display: 'flex', justifyContent: 'center'}}>
            <div
              style={{
                maxHeight: headerStyle.height + 60,
                maxWidth: "100%",
              }}
            >
              <DraggableItem
                id={r.id}
                isDragging={activeItem?.id === r.id}
              >
                <video
                  src={`${import.meta.env.VITE_API_IMAGE_URL}${r.media}`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{
                    maxHeight: headerStyle.height,
                    touchAction: "none",
                    pointerEvents: "none",
                    width: '100%',
                    borderRadius: 12,
                  }}
                  onError={() => {
                    console.error('VIDEO ERROR:', r.media);
                  }}
                />
              </DraggableItem>
            </div>
          </Grid.Col>
        <DragOverlay>
          {activeItem ? (
            <div style={{ maxHeight: headerStyle.height + 60, maxWidth: "100%", margin: '0 auto', pointerEvents: 'none' }}>
              <video
                src={`${import.meta.env.VITE_API_IMAGE_URL}${activeItem.media}`}
                autoPlay
                muted
                loop
                playsInline
                style={{
                  maxHeight: headerStyle.height,
                  width: '100%',
                  borderRadius: 12,
                  boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
                }}
                onError={() => {
                  console.error('VIDEO ERROR:', activeItem.media);
                }}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </Grid>
  );
};

export default MatchingSlideTheme;
