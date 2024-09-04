import { MenuItemPropsInterface } from "./interfaces";

const MenuItem = ({ onClick, children }: MenuItemPropsInterface) => {
  return (
    <li
      onClick={() => onClick()}
      className="flex items-center gap-2 px-2 py-2 text-white cursor-pointer select-none hover:bg-gray-700"
    >
      {children}
    </li>
  );
};

export default MenuItem;
