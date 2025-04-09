import { ChangeEvent, useEffect, useState } from "react";
import { StepType } from "../../backend/src/models/Step";
import {
  CheckIcon,
  EllipsisVerticalIcon,
  PlusIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useStore } from "../context";
import axios from "axios";
import { TaskType } from "../../backend/src/models";
import { useShallow } from "zustand/shallow";

type StepCompType = {
  step: StepType;
};
const Step = ({ step }: StepCompType) => {
  const { taskSelected, user, setTasks, setTaskSelected, updateDisplayTasks } =
    useStore(
      useShallow((state) => ({
        taskSelected: state.taskSelected,
        setTasks: state.setTasks,
        user: state.user,
        setTaskSelected: state.setTaskSelected,
        updateDisplayTasks: state.updateDisplayTasks,
      }))
    );
  console.log("Stepp", taskSelected);
  const [stepText, setStepText] = useState(step.description);
  const [open, setOpen] = useState(false);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStepText(e.target.value);
  };

  const handleEditStep = async (field: "completed" | "description") => {
    if (field === "description") {
      if (stepText.trim() === "" || stepText.trim() === step.description) {
        setStepText(step.description);
        return;
      }
    }

    if (taskSelected?.creatorId !== user?._id) {
      throw new Error("Unauthorized");
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/auth/editStep`,
        {
          taskId: taskSelected?._id,
          stepId: step._id,
          editType: field,
          description: stepText.trim(),
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

  const handlePromote = async () => {
    if (taskSelected?.creatorId !== user?._id) {
      throw new Error("Unauthorized");
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/auth/promoteStep`,
        {
          taskId: taskSelected?._id,
          stepId: step._id,
          description: stepText.trim(),
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

  const handleDelete = async () => {
    if (taskSelected?.creatorId !== user?._id) {
      throw new Error("Unauthorized");
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `http://localhost:4000/auth/deleteStep`,
        {
          taskId: taskSelected?._id,
          stepId: step._id,
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

  useEffect(() => {
    setStepText(step.description);
  }, [step.description]);

  return (
    <div className="flex flex-col justify-center">
      <div className="border-b-1 p-2 border-gray-200 flex items-center">
        <button
          className={`btn btn-circle w-4 h-4 border-black !outline-none mr-2 mt-0.5 flex items-center justify-center cursor-default ${
            step?.completed ? "border-gray-500 bg-gray-600" : ""
          }`}
          onClick={() => handleEditStep("completed")}
        >
          <CheckIcon
            className={`opacity-0 hover:opacity-100 transition-opacity w-full h-full font-extrabold ${
              step?.completed ? "opacity-100 text-white" : ""
            }`}
          />
        </button>
        <input
          className={`w-[85%] h-fit text-wrap break-words outline-none ${
            step?.completed ? "line-through text-gray-500" : ""
          }`}
          onChange={handleChange}
          value={stepText}
          onBlur={() => handleEditStep("description")}
        />
        <button
          popoverTarget="rdp-popover"
          className={`outline-none border-none cursor-default flex items-center `}
          style={{ anchorName: "--anchor-4" } as React.CSSProperties}
          onClick={() => setOpen(true)}
        >
          <EllipsisVerticalIcon className="w-5 h-5" />
        </button>
        {open && (
          <div
            popover="auto"
            id="rdp-popover"
            className="dropdown w-fit border bg-white flex flex-col"
            style={
              {
                positionAnchor: "--anchor-4",
                transform: "translateX(-100px)",
              } as React.CSSProperties
            }
          >
            <button
              className="w-[200px] hover:bg-gray-100 h-[50px] flex items-center"
              onClick={() => {
                handleEditStep("completed");
                setOpen(false);
              }}
            >
              {step?.completed ? (
                <>
                  <div className="w-4 h-4 border rounded-full border-gray-500 bg-gray-600 !outline-none mx-2 mt-0.5 flex items-center cursor-default">
                    <CheckIcon className="w-full h-full font-extrabold text-white" />
                  </div>
                  Marked Uncompleted
                </>
              ) : (
                <>
                  <div className="w-4 h-4 border rounded-full !outline-none mx-2 mt-0.5 flex items-center cursor-default" />
                  Marked As Completed
                </>
              )}
            </button>
            {!step?.completed && (
              <button
                className="w-[200px] border-t-1 border-gray-300 hover:bg-gray-100 h-[50px] flex items-center"
                onClick={() => {
                  handlePromote();
                  setOpen(false);
                }}
              >
                <div className="flex">
                  <PlusIcon className="w-5 h-5 mx-2" />
                  Promote to Task
                </div>
              </button>
            )}
            <button
              className="w-[200px] border-t-1 border-gray-300 hover:bg-gray-100 h-[50px] flex items-center"
              onClick={() => {
                handleDelete();
                setOpen(false);
              }}
            >
              <div className="flex text-red-500">
                <TrashIcon className="w-5 h-5 mx-2" />
                Delete
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export { Step };
