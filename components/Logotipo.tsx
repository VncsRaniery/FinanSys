"use client";

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export const HeaderLogo = () => {
  const { theme } = useTheme();

  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image
          src={theme === "dark" ? "/logoDark.svg" : "/logo.svg"}
          alt="Logo"
          width={40}
          height={40}
        />
        <p className="font-semibold text-foreground text-2xl ml-2.5">
          Finance Management
        </p>
      </div>
    </Link>
  );
};

