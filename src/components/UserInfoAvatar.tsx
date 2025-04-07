import { useStore } from "../context";
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router";
import { useShallow } from "zustand/shallow";

const UserInfoAvatar = () => {
  const { user } = useStore(
    useShallow((state) => ({
      user: state.user,
    }))
  );
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex w-full gap-2 items-center p-2 pl-4">
      <div className="avatar avatar-placeholder">
        <div className="bg-blue-400 text-neutral-content w-12 rounded-full">
          <span className=" text-white">{`${user?.firstName[0]}${user?.lastName[0]}`}</span>
        </div>
      </div>
      <div className="w-full">
        <button
          className="flex flex-col cursor-default"
          popoverTarget="logout-popover"
          style={{ anchorName: "--anchor-2" } as React.CSSProperties}
        >
          {user?.username}
          <div className="flex items-center text-center text-gray-400">
            <p className="text-xs">{user?.email}</p>
            <ChevronUpDownIcon className="w-3 h-3 mt-0.5" />
          </div>

          <div
            id="logout-popover"
            popover="auto"
            className="dropdown text-gray-400 border bg-white p-4"
            style={{ positionAnchor: "--anchor-2" } as React.CSSProperties}
          >
            <button onClick={handleLogout}>Logout</button>
          </div>
        </button>
      </div>
    </div>
  );
};

export { UserInfoAvatar };
