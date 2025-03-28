import React from "react";
import { useStore } from "../context";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";

const UserInfoAvatar = () => {
  const { user } = useStore();
  return (
    <div className="flex w-full gap-2 items-center p-2 pl-4">
      <div className="avatar avatar-placeholder">
        <div className="bg-blue-400 text-neutral-content w-12 rounded-full">
          <span className=" text-white">{`${user?.firstName[0]}${user?.lastName[0]}`}</span>
        </div>
      </div>
      <div className="grow flex flex-col cursor-default">
        <p>{user?.username}</p>
        <div className="flex items-center text-center text-gray-400">
          <p className="text-xs">{user?.email}</p>
          <ChevronUpDownIcon className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};

export { UserInfoAvatar };
