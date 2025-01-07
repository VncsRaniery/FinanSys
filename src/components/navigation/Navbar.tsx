import { Container } from "@/components";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Navbar = async () => {
  return (
    <header className="px-4 h-14 sticky top-0 inset-x-0 w-full bg-background/40 backdrop-blur-lg border-b border-border z-50">
      <Container reverse>
        <div className="flex items-center justify-between h-full mx-auto md:max-w-screen-xl">
          <div className="flex items-start">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/icons/Logotipo.svg"
                alt="Logo"
                width={40}
                height={40}
              />
              <span className="text-lg font-medium">FinanSys</span>
            </Link>
          </div>
          <nav className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <ul className="flex items-center justify-center gap-8">
              <Link href="#" className="hover:text-foreground/80 text-sm">
                Início
              </Link>
              <Link href="#sobre" className="hover:text-foreground/80 text-sm">
                Sobre
              </Link>
              <Link
                href="#recursos"
                className="hover:text-foreground/80 text-sm"
              >
                Recursos
              </Link>
            </ul>
          </nav>
          <div className="flex items-center gap-4">
            <>
              <Link
                href="/sign-in"
                className={buttonVariants({ size: "sm", variant: "ghost" })}
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className={buttonVariants({
                  size: "sm",
                  className: "hidden md:flex",
                })}
              >
                Registrar
              </Link>
            </>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
