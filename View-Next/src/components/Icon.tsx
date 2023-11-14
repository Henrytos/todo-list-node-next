import { ReactNode } from "react";

const Icon = ({
  children,
  color,
  onClick,
}: {
  children: ReactNode;
  color: string;
  onClick?: () => void;
}) => {
  return (
    <span
      onClick={onClick}
      className={`p-1 text-${color}-800  border-${color}-800 border-2 hover:bg-${color}-800  hover:text-white rounded-sm transition-colors cursor-pointer`}
    >
      {children}
    </span>
  );
};
export default Icon;
