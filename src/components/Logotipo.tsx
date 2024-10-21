"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export const HeaderLogo = () => {

  return (
      <div className="items-center hidden lg:flex">
        <Image
         src= "/icons/Logotipo.svg"
          alt="Logo"
          width={40}
          height={40}
        />
        <p className="font-semibold text-foreground text-2xl ml-2.5">
          FinanSys
        </p>
      </div>
  );
};
