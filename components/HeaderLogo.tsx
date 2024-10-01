import Link from "next/link";
import Image from "next/image";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex">
        <Image src="/logotipo.svg" alt="Logo" width={40} height={40} />
        <p className="font-semibold text-white text-2xl ml-2.5">
          Finance Management
        </p>
      </div>
    </Link>
  );
};
