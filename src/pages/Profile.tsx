import { useLoaderData } from "react-router";
import { UserType, TaskType } from "../../backend/src/models/";
import { ListItem, TaskMenu } from "../components";
import { useStore } from "../context";
import { useEffect } from "react";

type LoaderDataType = {
  userProfile: UserType;
  tasks: TaskType;
};
const Profile = () => {
  const loaderData = useLoaderData() as LoaderDataType;
  const { userProfile, tasks } = loaderData;
  const { user, setUser } = useStore();

  useEffect(() => {
    if (userProfile) {
      setUser(userProfile);
    }
  }, [setUser, userProfile]);

  console.log(userProfile, user, tasks);
  return (
    <div className="flex h-full w-full justify-center items-center p-8 overflow-x-hidden">
      <TaskMenu />
      <ListItem />
    </div>
  );
};

export { Profile };
