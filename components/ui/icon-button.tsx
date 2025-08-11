import { cn } from "@/lib/utils";
import { MouseEventHandler } from "react";

interface IconButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  icons: React.ReactElement;
  className?: string;
}

const IconButton: React.FC<IconButtonProps> = ({
  onClick,
  className,
  icons,
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        `rounded-full flex items-center justify-center p-2 bg-white hover:scale-110 shadow-md transition`,
        className
      )}
    >
      {icons}
    </button>
  );
};

export default IconButton;
