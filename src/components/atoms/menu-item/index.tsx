import { MenuItemPropsInterface } from "./interfaces";

const MenuItem = ({ onClick, children }: MenuItemPropsInterface) => {
  return (
    <li
      onClick={() => onClick()}
      className="flex items-center gap-2 px-2 py-2 cursor-pointer select-none hover:bg-zinc-900"
    >
      {children}
    </li>
  );
};

export default MenuItem;
