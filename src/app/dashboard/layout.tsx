import { BemVindoMsg } from "@/components/MensagemBemVindo";
import { Filters } from "@/components/Filters";
import { HeaderLogo } from "@/components/Logotipo";
import { Navbar } from "@/components/Navbar";
import { NavbarMobile } from "@/components/NavbarMobile";

import "@/styles/globals.css";

import { DASHBOARD_CONFIG } from "@/config";

export const metadata = DASHBOARD_CONFIG;

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: Props) => {

  return (
    <>
      <Navbar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <NavbarMobile />
        <main className="px-4 py-8 lg:px-14 pb-36">
          <div className="max-w-screen-2xl mx-auto">
            <div className="w-full flex items-center justify-between mb-14">
              <div className="flex items-center lg:gap-x-16">
                <HeaderLogo />
              </div>
            </div>
            <BemVindoMsg />
            <Filters />
          </div>
        </main>
        <div className="px-3 lg:px-14">{children}</div>
      </div>
    </>
  );
};

export default DashboardLayout;