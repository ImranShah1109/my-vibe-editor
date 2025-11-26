"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowDown } from "lucide-react";
import { useState } from "react";

interface AddRepoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (githubUrl: string) => void;
}

const AddRepoModal = ({ isOpen, onClose, onSubmit }: AddRepoModalProps) => {
  const [githubUrl, setGithubUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(githubUrl);
    } catch (error) {
      console.error("Error submitting GitHub URL: ", error);
    } finally {
      setIsSubmitting(false);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#4F07D1] flex items-center gap-2">
            <ArrowDown size={20} className="text-[#4F07D1]" />
            Add Github Project
          </DialogTitle>
          <DialogDescription>
            Enter your github repository details below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">GitHub Repo URL</Label>
              <Input
                id="name-1"
                name="name"
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="GitHub Repo URL"
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#4F07D1] hover:bg-[#3c05a1] text-white cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <span className="loader w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Loading...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddRepoModal;
