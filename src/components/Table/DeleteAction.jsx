import { BsTrash } from "react-icons/bs";
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import { useState } from "react";

export default function DeleteAction({ isLoading = false, onDelete, type }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover placement="right" isOpen={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger>
        <Button
          variant="ghost"
          size="sm"
          isDisabled={isLoading}
          className="!min-w-8 !w-8 !h-8 text-danger !p-0"
        >
          <BsTrash />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="px-1 py-2">
          <div className="text-small font-bold">
            Do you really want to delete this {type}
          </div>
          <div className="w-[340px] text-tiny flex flex-col gap-2">
            This action cannot be done and the deleted {type} and the details in
            this {type} will be deleted permanently.
            <div className="ml-auto flex gap-2">
              <Button
                size="sm"
                variant="shadow"
                onClick={() => setIsOpen(false)}
              >
                No
              </Button>
              <Button
                size="sm"
                variant="shadow"
                className="bg-blue-700 text-white"
                onClick={() => onDelete?.()}
              >
                Yes
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
