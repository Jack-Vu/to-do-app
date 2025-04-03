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
  const { user, setUser, tasks, setTasks, displayedTasks, setDisplayedTasks } =
    useStore();

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    }
    if (userTasks) {
      setTasks(userTasks);
      if (!displayedTasks) {
        setDisplayedTasks(userTasks.filter((task) => task.myDay));
      }
    }
  }, [displayedTasks, setDisplayedTasks, setTasks, setUser, userProfile, userTasks]);

  console.log(userProfile, user, tasks);
  return (
    <div className="flex h-full w-full justify-center items-center p-8 overflow-x-hidden">
      <TaskMenu />
      <ListItem />
    </div>
  );
};

export { Profile };
