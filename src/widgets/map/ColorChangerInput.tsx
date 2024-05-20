import * as Popover from "@radix-ui/react-popover";
import { Compact } from "@uiw/react-color";
import { Dispatch, SetStateAction, useState } from "react";

type ColorChangerInputProps = {
  color: string;
  onChange: Dispatch<SetStateAction<string>>;
};

export const ColorChangerInput = ({
  color,
  onChange,
}: ColorChangerInputProps) => {
  const [opened, setOpened] = useState(false);
  console.log(color);

  return (
    <Popover.Root open={opened} onOpenChange={setOpened}>
      <div className="relative w-full h-full">
        <Popover.Trigger asChild>
          <div
            className="w-full h-full rounded border-gray-500 border overflow-hidden "
            style={{ background: color }}
          ></div>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content asChild className="absolute left-0 top-0 z-[2]">
            <Compact
              color={color}
              onChange={(color) => {
                onChange(color.hexa);
              }}
            />
          </Popover.Content>
        </Popover.Portal>
      </div>
    </Popover.Root>
  );
};
