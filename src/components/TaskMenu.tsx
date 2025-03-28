import { useStore } from "../context";
import { LIST_CONSTANT } from "../constant";
import { TaskSearch } from "./TaskSearch";
import { UserInfoAvatar } from "./UserInfoAvatar";

const TaskMenu = () => {
  const { listType, setListType } = useStore();

  return (
    <div className="flex items-center flex-col w-[25%] h-full gap-1 pl-0 pr-2">
      <UserInfoAvatar />
      <TaskSearch />
      <ul className="menu w-full flex gap-2">
        {LIST_CONSTANT.map((list, index) => {
          return (
            <div
              onClick={() => {
                setListType(LIST_CONSTANT[index]);
                console.log(list);
              }}
              className={`hover:bg-gray-100 flex flex-row gap-2 h-10 items-center ${
                listType.title === list.title ? "bg-gray-100" : ""
              }`}
            >
              <div
                className={`${
                  listType.title === list.title
                    ? "border-l-2 border-blue-600"
                    : ""
                }`}
              >
                <div className="flex gap-1 ml-2">
                  <div className={`w-5 h-5 ${list.textColor}`}>{list.icon}</div>
                  <p>{list.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export { TaskMenu };
