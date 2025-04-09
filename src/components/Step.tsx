import { ChangeEvent, useState } from "react";
import { StepType } from "../../backend/src/models/Step";
import { CheckIcon, EllipsisVerticalIcon } from "@heroicons/react/24/outline";
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

        <EllipsisVerticalIcon className="w-5 h-5" />
      </div>
    </div>
  );
};

export { Step };
