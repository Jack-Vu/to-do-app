import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../context";
import {
  CheckIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  StarIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";

const TaskDetailsEdit = () => {
  const {
    taskSelected,
    listType,
    setTaskDetailsOpen,
    setTaskSelected,
    setTasks,
    user,
    updateDisplayTasks,
  } = useStore();
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState(taskSelected?.task || "");
  const handleDelete = async () => {
    try {
      if (taskSelected?.creatorId !== user?._id) {
        throw new Error("Unauthorized");
      }
      const token = localStorage.getItem("token");

      const response = await axios.delete(
        `http://localhost:4000/auth/deleteTask`,
        {
          data: {
            taskId: taskSelected?._id,
          },
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const tasks = await response.data.userTasks;
      console.log(tasks);
      setTasks(tasks);
      updateDisplayTasks(tasks);
      setTaskDetailsOpen(false);
      setTaskSelected(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleMyDay = async () => {
    if (taskSelected?.creatorId !== user?._id) {
      throw new Error("Unauthorized");
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/auth/editTask`,
        {
          taskId: taskSelected?._id,
          edit: {
            myDay: !taskSelected?.myDay,
          },
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      const tasks = await response.data.userTasks;
      setTasks(tasks);
      updateDisplayTasks(tasks);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text, editing]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const extraSteps = [1, 2, 3];
  return (
    <div className="w-[20%] h-full rounded-3xl rounded-l-none px-10  border border-l-0 flex flex-col">
      <div className="flex my-2 mt-6 justify-end">
        <XMarkIcon
          className="w-5 h-5 hover:border hover:border-gray-500 hover:rounded"
          onClick={() => {
            setEditing(false);
            setTaskDetailsOpen(false);
            setTaskSelected(null);
          }}
        />
      </div>
      <div className="border p-4 mt-2 rounded-sm border-gray-200 flex flex-col">
        <div className="flex">
          <button
            className={`btn btn-circle w-5 h-5 border-black !outline-none mr-2 mt-0.5 flex items-center justify-center cursor-default ${
              taskSelected?.completed ? "border-gray-500 bg-gray-600" : ""
            }`}
            //   onClick={handleCompleted}
          >
            <CheckIcon
              className={`opacity-0 hover:opacity-100 transition-opacity w-full h-full font-extrabold ${
                taskSelected?.completed ? "opacity-100 text-white" : ""
              }`}
            />
          </button>
          {editing ? (
            <textarea
              ref={textareaRef}
              onChange={handleChange}
              autoFocus
              className={`w-[85%] h-auto border-none outline-none text-wrap resize-none break-words font-semibold text-xl ${
                taskSelected?.completed ? "line-through text-gray-500" : ""
              }`}
              value={text}
              maxLength={300}
            />
          ) : (
            <div
              className={`w-[85%] h-fit text-wrap break-words font-semibold text-xl ${
                taskSelected?.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => setEditing(true)}
            >
              {taskSelected?.task}
            </div>
          )}

          <StarIcon
            className={`w-5 h-5 text-gray-400 hover:text-blue-500 ml-auto ${
              taskSelected?.important
                ? listType
                  ? "fill-pink-800"
                  : ""
                : "fill-blue-500"
            }`}
          />
        </div>

        {extraSteps.map((extra) => {
          return (
            <div className="flex flex-col justify-center">
              <div className="border-b-1 p-2 border-gray-200 flex items-center">
                <button
                  className={`btn btn-circle w-4 h-4 border-black !outline-none mr-2 mt-0.5 flex items-center justify-center cursor-default ${
                    taskSelected?.completed ? "border-gray-500 bg-gray-600" : ""
                  }`}
                  //   onClick={handleCompleted}
                >
                  <CheckIcon
                    className={`opacity-0 hover:opacity-100 transition-opacity w-full h-full font-extrabold ${
                      taskSelected?.completed ? "opacity-100 text-white" : ""
                    }`}
                  />
                </button>
                <input
                  className={`w-[85%] h-fit text-wrap break-words outline-none ${
                    taskSelected?.completed ? "line-through text-gray-500" : ""
                  }`}
                  onClick={() => setEditing(true)}
                  value={taskSelected?.task}
                />

                <EllipsisVerticalIcon className="w-5 h-5" />
              </div>
            </div>
          );
        })}
        <div className="flex grow input mt-2">
          <PlusIcon className="w-5 h-5 mr-2" cursor="default" />
          {"Next Step "}
        </div>
      </div>
      <div className="border p-4 mt-2 rounded-sm border-gray-200 flex flex-col" onClick={handleMyDay}>
        Added to my day
      </div>
      <div className="border p-4 mt-2 rounded-sm border-gray-200 flex flex-col">
        <div className="border-b-1 py-3 border-gray-200">
          {`${taskSelected?.dueDate}`}
        </div>
        <div className="py-3">Repeat</div>
      </div>
      <div className="border p-4 mt-2 rounded-sm border-gray-200 flex flex-col">
        {`${taskSelected?.note ? taskSelected?.note : "notes"}`}
      </div>

      <div className="border-t-1 p-4 mt-auto border-gray-200 flex flex-row justify-between">
        {`${taskSelected?.createdAt}`}
        <TrashIcon className="w-5 h-5" onClick={handleDelete} />
      </div>
    </div>
  );
};

export default TaskDetailsEdit;
