"use client";

import { Button } from "@/components/ui/button";
import { StarIcon, StarOffIcon } from "lucide-react";
import React, { forwardRef, useEffect, useState } from "react";
import { toast } from "sonner";
import { toggleStarMarked } from "../actions";

interface MarkedToggleButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  markedForRevision: boolean;
  id: string;
}

const MarkedToggleButton = forwardRef<
  HTMLButtonElement,
  MarkedToggleButtonProps
>(({ markedForRevision, id, onClick, className, children, ...props }, ref) => {
  const [isMarked, setIsMarked] = useState(markedForRevision);

  useEffect(() => {
    setIsMarked(markedForRevision);
  }, [markedForRevision]);

  const handleToggle = async (event: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(event);
    setIsMarked(!isMarked);

    try {
      const res = await toggleStarMarked(id);
      const { success, isMarked, error } = res;
      if (success) {
        isMarked
          ? toast.success("Added to Favourite successfully")
          : toast.success("Remove from Favourite successfully");
      } else {
        toast.error(error);
      }
    } catch (error) {
      console.log("Marked Toggle button error: ", error);
    }
  };

  return (
    <Button
      ref={ref}
      variant={"ghost"}
      className={`flex items-center justify-start w-full px-2 py-1.5 text-sm rounded-md cursor-pointer ${className}`}
      onClick={handleToggle}
      {...props}
    >
      {isMarked ? (
        <StarIcon size={16} className="text-purple-700 mr-2" />
      ) : (
        <StarOffIcon size={16} className="text-gray-500 mr-2" />
      )}
      {children || (isMarked ? "Remove Favourite" : "Add to Favourite")}
    </Button>
  );
});

export default MarkedToggleButton;
