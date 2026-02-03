import { Button } from "@/components/ui/button";

import add from "../assets/images/add.png";

export const AddItemFloatButton = () => {
  return (
    <Button
      className="bg-[#5C33BE] rounded-full w-14 h-14 fixed right-4 bottom-4"
      variant="outline"
      size="icon"
    >
      <img
        src={add}
        max-w="100%"
        max-h="100%"
        className="w-9 h-9 inline-block"
      />
    </Button>
  );
};
