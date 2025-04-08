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
  secondaryUrl: string;
  icon: JSX.Element;
  textColor: string;
};

const LIST_CONSTANT = [
  {
    title: "My Day",
    url: "bg-[url('/images/MyDay.png')]",
    secondaryUrl: "bg-[url('/images/MyDay.png')]",
    icon: <SunIcon className="w-full h-full text-inherit" />,
    textColor: "text-gray-400",
  },
  {
    title: "Important",
    url: "bg-[url('/images/Important.png')]",
    secondaryUrl: "bg-[url('/images/ImportantSecondary.png')]",
    icon: <StarIcon className="w-full h-full text-inherit" />,
    textColor: "text-pink-800",
  },
  {
    title: "Planned",
    url: "bg-[url('/images/Planned.png')]",
    secondaryUrl: "bg-[url('/images/PlannedSecondary.png')]",
    icon: <BookOpenIcon className="w-full h-full text-inherit" />,
    textColor: "text-green-800",
  },
  {
    title: "Assigned to me",
    url: "bg-[url('/images/Assigned.png')]",
    secondaryUrl: "bg-[url('/images/AssignedSecondary.png')]",
    icon: <UserIcon className="w-full h-full text-inherit" />,
    textColor: "text-green-700",
  },
  {
    title: "Tasks",
    url: "bg-[url('/images/Tasks.png')]",
    secondaryUrl: "bg-[url('/images/TasksSecondary.png')]",
    icon: <HomeIcon className="w-full h-full text-inherit" />,
    textColor: "text-blue-300",
  },
];

export { LIST_CONSTANT };
