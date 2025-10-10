import Link from "next/link";

import { FacebookIcon, TwitterIcon, Linkedin } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-white dark:bg-black/5 w-full mt-12">
      <div className="flex items-center justify-center w-full flex-col">
        <div
          className={`flex flex-col justify-between
            bg-linear-to-b from-white/90 via-gray-50/90 to-white/90
            dark:from-zinc-900/90 dark:via-zinc-800/90 dark:to-zinc-900/90
            shadow-[0_2px_20px_-2px_rgba(0,0,0,0.1)]
            backdrop-blur-md
            border-x border-t border-[rgba(230,230,230,0.7)] dark:border-[rgba(70,70,70,0.7)]
            w-full sm:min-w-[800px] sm:max-w-[1200px]
            rounded-t-[28px]
            px-4 py-2.5
            relative
            transition-all duration-300 ease-in-out`}
        >
          <div className="w-full flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-6 justify-center">
              <Link href="/" className="flex items-center gap-2 justify-center">
                <Image src={"/logo.svg"} alt="Logo" height={60} width={60} />

                <span className="hidden sm:block font-extrabold text-lg">
                  VibeCode Editor
                </span>
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              {/* <Link href="https://www.facebook.com" target="_blank">
                <FacebookIcon className="h-6 w-6 text-blue-600 hover:text-blue-800" />
              </Link> */}
              <Link href="https://www.twitter.com" target="_blank">
                <TwitterIcon className="h-6 w-6 text-blue-400 hover:text-blue-600" />
              </Link>
              <Link href="https://www.linkedin.com" target="_blank">
                <Linkedin className="h-6 w-6 text-blue-700 hover:text-blue-900" />
              </Link>
            </div>
          </div>
          {/* Footer Bottom Section */}
          <hr />
          <div
            className="w-full text-center py-4 text-sm 
       text-zinc-500 dark:text-zinc-400"
          >
            <p>&copy; 2025 VibeCode Editor. All Rights Reserved.</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link
                href="#"
                className="hover:text-zinc-800 dark:hover:text-zinc-100"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:text-zinc-800 dark:hover:text-zinc-100"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
