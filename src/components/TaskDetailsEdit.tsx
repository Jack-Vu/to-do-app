import React, { useEffect, useRef, useState } from "react";
import { useStore } from "../context";
import {
  CheckIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import { MyDay } from "./MyDay";
import { ImportantStar } from "./ImportantStar";
import { DueDate } from "./DueDate";
import { TaskType } from "../../backend/src/models";

const TaskDetailsEdit = () => {
  const {
    taskSelected,
    setTaskDetailsOpen,
    setTaskSelected,
    setTasks,
    user,
    updateDisplayTasks,
  } = useStore();
  const [editing, setEditing] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [text, setText] = useState<string>(taskSelected?.task || "");
  const [note, setNote] = useState<string>(taskSelected?.note || "");

  useEffect(() => {
    setText(taskSelected?.task || "");
    setNote(taskSelected?.note || "");
  }, [taskSelected, setTaskSelected]);

  const createdAt = taskSelected
    ? new Date(taskSelected.createdAt.toString()).toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })
    : undefined;

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

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [text, editing]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNote(e.target.value);
  };
  const handleUpdate = async (field: string) => {
    let input;

    if (field === "note") {
      if (taskSelected?.note && taskSelected?.note.trim() === note?.trim()) {
        setNote(note?.trim());
        return;
      }
      input = note?.trim();
    }
    if (field === "task") {
      if (taskSelected?.task.trim() === text?.trim() || text?.trim() === "") {
        setText(text?.trim());
        return;
      }
      input = text?.trim();
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/auth/editTask`,
        {
          taskId: taskSelected?._id,
          edit:
            field === "task"
              ? {
                  task: input,
                }
              : field === "note"
              ? {
                  note: input,
                }
              : {
                  complete: !taskSelected?.completed,
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
      setTaskSelected(
        tasks.filter((task: TaskType) => task._id === taskSelected?._id)[0]
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleCompleted = async () => {
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
            completed: !taskSelected?.completed,
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
      setTaskSelected(
        tasks.filter((task: TaskType) => task._id === taskSelected?._id)[0]
      );
    } catch (error) {
      console.error(error);
    }
  };

  const extraSteps = [1, 2, 3];
  return (
    <div className="w-[20%] h-full overflow-auto rounded-3xl rounded-l-none border border-l-0 flex flex-col  scroll-pr-2">
      <div className="flex my-2 mt-6 justify-end mx-10">
        <XMarkIcon
          className="w-5 h-5 hover:border hover:border-gray-500 hover:rounded"
          onClick={() => {
            setEditing(false);
            setTaskDetailsOpen(false);
            setTaskSelected(null);
          }}
        />
      </div>
      <div className="border p-4 mx-10 mt-2 rounded-sm border-gray-200 flex flex-col">
        <div className="flex">
          <button
            className={`btn btn-circle w-5 h-5 border-black !outline-none mr-2 mt-0.5 flex items-center justify-center cursor-default ${
              taskSelected?.completed ? "border-gray-500 bg-gray-600" : ""
            }`}
            onClick={handleCompleted}
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
              onChange={handleTextChange}
              className={`w-[85%] h-auto border-none outline-none text-wrap resize-none break-words font-semibold text-xl ${
                taskSelected?.completed ? "line-through text-gray-500" : ""
              }`}
              value={text}
              maxLength={300}
              onBlur={() => handleUpdate("task")}
            />
          ) : (
            <div
              className={`w-[80%] h-fit text-wrap break-words font-semibold text-xl ${
                taskSelected?.completed ? "line-through text-gray-500" : ""
              }`}
              onClick={() => setEditing(true)}
            >
              {taskSelected?.task}
            </div>
          )}

          <ImportantStar task={taskSelected} dimensions="w-5 h-5" />
        </div>

        {extraSteps.map(() => {
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
      <MyDay />
      <div className="border mt-2 mx-10 rounded-sm border-gray-200 flex flex-col">
        <div className="pb-4">
          <DueDate />
        </div>
        <div className="pb-4 ml-4">Repeat</div>
      </div>
      <div className="border p-4 mt-2 rounded-sm border-gray-200 flex flex-col mx-10 mb-5">
        <textarea
          onChange={handleNotesChange}
          className={`w-[85%] h-auto border-none outline-none text-wrap resize-none break-words font-semibold text-sm ${
            taskSelected?.completed ? "line-through text-gray-500" : ""
          }`}
          value={note}
          placeholder="Notes"
          maxLength={300}
          onBlur={() => handleUpdate("note")}
        />
      </div>

      <div className="border-t-1 mt-auto border-gray-200 flex flex-row justify-between items-center text-gray-500">
        <div className="w-full text-center py-4 ">Created on {createdAt}</div>
        <div className="w-[15%] h-full rounded-br-3xl flex justify-center items-center : hover:bg-gray-200 ">
          <TrashIcon className="w-5 h-full " onClick={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsEdit;
