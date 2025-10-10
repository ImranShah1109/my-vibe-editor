import { cn } from "@/lib/utils";
import Footer from "@/modules/home/components/footer";
import Header from "@/modules/home/components/header";
import { Metadata } from "next";
import React from "react";

// #4F07D1

export const metadata: Metadata = {
  title: "VibeCode Editor",
  description: "Code Editor for VibeCoders - Vibecode",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div
        className={cn(
          "fixed inset-0",
          "[background-size: 40px_40px]",
          "[background-image:linear-gradient(to_right,#b99ced_1px,transparent_1px),linear-gradient(to_bottom,#b99ced_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px]"
        )}
        style={{ backgroundSize: "40px 40px", zIndex: -10 }}
      />
      <div
        className="pointer-events-none fixed inset-0 flex items-center justify-center bg-white
            [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"
      />
      <main className="z-20 relative w-full pt-0">{children}</main>
      <Footer />
    </>
  );
}
