import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { HeaderLogo } from "./HeaderLogo";
import Navigation from "./Navigation";
import { Loader2 } from "lucide-react";
import { WelcomeMsg } from "./MensagemBemVindo";
import { Filters } from "./Filters";
import { ModeToggle } from "./AlterarModo";

export const Header = () => {
  return (
    <header className=" px-4 py-8 lg:px-14 pb-36">
      <div className="max-w-screen-2xl mx-auto">
        <div className="w-full flex items-center justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <ClerkLoaded>
              <UserButton afterSignOutUrl="/" />
            </ClerkLoaded>
            <ClerkLoading>
              <Loader2 className="size-8 animate-spin text-slate-400" />
            </ClerkLoading>
          </div>
        </div>
        <WelcomeMsg />
        <Filters />
      </div>
    </header>
  );
};
