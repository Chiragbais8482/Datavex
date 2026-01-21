import React from "react";

type MasonryProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  columns?: number;
  gap?: number;
};

export default function Masonry<T>({
  items,
  renderItem,
  columns = 3,
  gap = 24,
}: MasonryProps<T>) {
  return (
    <div
      style={{
        columnCount: columns,
        columnGap: `${gap}px`,
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            breakInside: "avoid",
            marginBottom: `${gap}px`,
          }}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}
