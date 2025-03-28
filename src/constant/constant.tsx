import {
  BookOpenIcon,
  HomeIcon,
  StarIcon,
  SunIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { JSX } from "react";

export type listConstantType = {
  title: string;
  url: string;
  icon: JSX.Element;
  textColor: string;
};

const LIST_CONSTANT = [
  {
    title: "My Day",
    url: "bg-[url('/images/MyDay.png')]",
    icon: <SunIcon className="w-full h-full text-inherit" />,
    textColor: "text-gray-400",
  },
  {
    title: "Important",
    url: "bg-[url('/images/Important.png')]",
    icon: <StarIcon className="w-full h-full text-inherit" />,
    textColor: "text-pink-800",
  },
  {
    title: "Planned",
    url: "bg-[url('/images/Planned.jpg')]",
    icon: <BookOpenIcon className="w-full h-full text-inherit" />,
    textColor: "text-green-800",
  },
  {
    title: "Assigned to me",
    url: "bg-[url('/images/Assigned.png')]",
    icon: <UserIcon className="w-full h-full text-inherit" />,
    textColor: "text-green-700",
  },
  {
    title: "Tasks",
    url: "bg-[url('/images/Tasks.jpg')]",
    icon: <HomeIcon className="w-full h-full text-inherit" />,
    textColor: "text-blue-300",
  },
];

export { LIST_CONSTANT };
