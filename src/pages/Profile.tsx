import { useLoaderData } from "react-router";
import { UserType, TaskType } from "../../backend/src/models/";
import { ListItem, TaskMenu } from "../components";
import { useStore } from "../context";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";

type LoaderDataType = {
  userProfile: UserType;
  userTasks: TaskType[];
};
const Profile = () => {
  const loaderData = useLoaderData() as LoaderDataType;
  const { userProfile, userTasks } = loaderData;
  const { setUser, setTasks, displayedTasks, updateDisplayTasks } = useStore(
    useShallow((state) => ({
      setUser: state.setUser,
      setTasks: state.setTasks,
      displayedTasks: state.displayedTasks,
      updateDisplayTasks: state.updateDisplayTasks,
    }))
  );

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    }
    if (userTasks) {
      setTasks([...userTasks]);
      if (!displayedTasks) {
        updateDisplayTasks();
      }
    }
  });

  return (
    <div className="flex h-full w-full justify-center items-center p-8 overflow-x-hidden">
      <TaskMenu />
      <ListItem />
    </div>
  );
};

export { Profile };
