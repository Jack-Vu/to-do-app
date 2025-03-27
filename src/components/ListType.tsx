import { useCallback, useEffect, useRef } from "react";
import { useStore } from "../context";
import { TaskInput } from "./TaskInput";

const ListType = () => {
  const { user, setInputActive } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setInputActive(false);
      }
    },
    [setInputActive]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <div>Hello {user?.username}</div>
      <div ref={containerRef}>
        <TaskInput />
      </div>
    </>
  );
};

export { ListType };
