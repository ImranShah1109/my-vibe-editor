"use client";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import AddRepoModal from "./add-repo-modal";
import { toast } from "sonner";
import { importGithubRepo } from "../actions";
import { useRouter } from "next/navigation";

const AddRepo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (githubUrl: string) => {
    if (!githubUrl) toast.error("Please enter GitHub repo URL");
    console.log("GitHub URL submitted: ", githubUrl);

    try {
      const res = await importGithubRepo(githubUrl);
      if (res.success) {
        toast.success("GitHub repo imported successfully");
        router.push(`/playground/${res?.data?.id}`);
      } else {
        toast.error("Failed to import GitHub repo");
      }
    } catch (error) {
      console.error("Error importing GitHub repo: ", error);
      toast.error("Failed to import GitHub repo");
    }
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="group px-6 py-6 flex flex-row justify-between items-center border rounded-lg bg-muted cursor-pointer 
      transition-all duration-300 ease-in-out
      hover:bg-background hover:border-[#4F07D1] hover:scale-[1.02]
      shadow-[0_2px_10px_rgba(0,0,0,0.08)]
      hover:shadow-[0_10px_30px_rgba(107,50,209,0.15)]"
      >
        <div className="flex flex-row justify-center items-start gap-4">
          <Button
            variant={"outline"}
            className="flex justify-center items-center bg-white group-hover:bg-[#fff8f8] group-hover:border-[#4F07D1] group-hover:text-[#4F07D1] transition-colors duration-300"
            size={"icon"}
          >
            <ArrowDown
              size={30}
              className="transition-transform duration-300 group-hover:translate-y-1"
            />
          </Button>
          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-[#4F07D1]">
              Open Github Repository
            </h1>
            <p className="text-sm text-muted-foreground max-w-[220px]">
              Work with your repositories in our editor
            </p>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <Image
            src={"/github.svg"}
            alt="Open GitHub repository"
            width={150}
            height={150}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>
      <AddRepoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default AddRepo;
