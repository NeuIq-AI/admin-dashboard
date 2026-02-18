import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import UserRow from "./UserRow";
import type { User } from "../types/user";

interface Props {
  users: User[];
  onStatusChange: (id: string) => void;
  onRowClick: (user: any) => void; 
}

export default function DataGrid({ users, onStatusChange,onRowClick }: Props) {
  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: users.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 70,
    overscan: 10,
  });
  

  return (
    <div ref={parentRef} className="h-full overflow-auto">
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map(virtualRow => {
          const user = users[virtualRow.index];

          return (
            <div
              key={virtualRow.key}
              className="absolute top-0 left-0 w-full"
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <UserRow
                user={user}
                onStatusChange={onStatusChange}
                onClick={() => onRowClick(user)}

              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
