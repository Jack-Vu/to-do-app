import React from "react";
import { useLoaderData } from "react-router";
import { UserType, TaskType } from "../../backend/src/models/";
import {
  BookOpenIcon,
  HomeIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/outline";

type LoaderDataType = {
  user: UserType;
  tasks: TaskType;
};
const Profile = () => {
  const loaderData = useLoaderData() as LoaderDataType;
  const { user, tasks } = loaderData;
  console.log(user, tasks);

  console.log(loaderData);

  return (
    <div className="flex h-[100vh] justify-center items-center p-8">
      <ul className="menu bg-base-100 w-[20%] h-full gap-1">
        <li>
          <a>
            <SunIcon className="w-5 h-5" />
            My Day
          </a>
        </li>
        <li>
          <a>
            <StarIcon className="w-5 h-5" />
            Important
          </a>
        </li>
        <li>
          <a>
            <BookOpenIcon className="w-5 h-5" />
            Planned
          </a>
        </li>
        <li>
          <a>
            <UserIcon className="w-5 h-5" />
            Assigned to me
          </a>
        </li>
        <li>
          <a>
            <HomeIcon className="w-5 h-5" />
            Tasks
          </a>
        </li>
      </ul>
      <div className="w-full h-full border rounded-3xl p-10">Hello</div>
    </div>
  );
};

export { Profile };
