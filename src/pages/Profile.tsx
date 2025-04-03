import { useLoaderData } from "react-router";
import { UserType, TaskType } from "../../backend/src/models/";
import { ListItem, TaskMenu } from "../components";
import { useStore } from "../context";
import { useEffect } from "react";

type LoaderDataType = {
  userProfile: UserType;
  userTasks: TaskType[];
};
const Profile = () => {
  const loaderData = useLoaderData() as LoaderDataType;
  const { userProfile, userTasks } = loaderData;
  const { setUser, setTasks, displayedTasks, setDisplayedTasks } =
    useStore();

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    }
    if (userTasks) {
      setTasks(userTasks);
      if (!displayedTasks) {
        setDisplayedTasks([
          userTasks.filter((task) => task.myDay && !task.completed),
          userTasks.filter((task) => task.myDay && task.completed),
        ]);
      }
    }
  }, [
    displayedTasks,
    setDisplayedTasks,
    setTasks,
    setUser,
    userProfile,
    userTasks,
  ]);
  return (
    <div className="flex h-full w-full justify-center items-center p-8 overflow-x-hidden">
      <TaskMenu />
      <ListItem />
    </div>
  );
};

export { Profile };
