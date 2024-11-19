import { useDraggable } from '@dnd-kit/core';

export function Draggable({ id, children }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
  });

  return (
    <div
      className='draggable'
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: isDragging ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
        opacity: isDragging ? 0.5 : 1, 
      }}
    >
      {children}
    </div>
  );
}
