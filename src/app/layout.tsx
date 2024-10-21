/*
import { Footer, Navbar } from "@/components";
import { SITE_CONFIG } from "@/config";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Inter } from "next/font/google";

const font = Inter({ subsets: ["latin"] });

export const metadata = SITE_CONFIG;

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={cn(
                    "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
                    font.className
                )}
            >
                <ClerkProvider appearance={{ baseTheme: dark }}>
                    {children}
                </ClerkProvider>
            </body>
        </html>
    );
};


interface Props {
  children: React.ReactNode;
}

// Layout de Marketing para Landing Pages e similares
export const MarketingLayout = ({ children }: Props) => {
  return (
      <div className="flex flex-col items-center w-full">
          <Navbar />
          <main className="flex flex-col items-center w-full">
              {children}
          </main>
          <Footer />
      </div>
  );
};
*/
/*
import { Footer, Navbar } from "@/components";
import { SITE_CONFIG } from "@/config";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";


import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/ThemeProvider";

const font = Inter({ subsets: ["latin"] });

export const metadata = SITE_CONFIG;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
          font.className
        )}
      >
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              <SheetProvider />
              <Toaster />
              {children}
            </QueryProvider>
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

interface Props {
  children: React.ReactNode;
}

// Layout de Marketing para Landing Pages e similares
export const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />
      <main className="flex flex-col items-center w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};
*/

/*
import { Footer, Navbar } from "@/components";
import { SITE_CONFIG } from "@/config";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";


import { QueryProvider } from "@/providers/query-provider";
import { SheetProvider } from "@/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner";

const font = Inter({ subsets: ["latin"] });

export const metadata = SITE_CONFIG;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
          font.className
        )}
      >
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <QueryProvider>
              <SheetProvider />
              <Toaster />
              {children}
            </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

interface Props {
  children: React.ReactNode;
}

// Layout de Marketing para Landing Pages e similares
export const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar />
      <main className="flex flex-col items-center w-full">
        {children}
      </main>
      <Footer />
    </div>
  );
};
*/

import { Footer, Navbar } from "@/components";
import { SITE_CONFIG } from "@/config";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Inter } from "next/font/google";


import { QueryProvider } from "@/components/providers/query-provider";
import { SheetProvider } from "@/components/providers/sheet-provider";
import { Toaster } from "@/components/ui/sonner";

const font = Inter({ subsets: ["latin"] });

export const metadata = SITE_CONFIG;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background text-foreground antialiased max-w-full overflow-x-hidden",
          font.className
        )}
      >
        <ClerkProvider appearance={{ baseTheme: dark }}>
            <QueryProvider>
              <SheetProvider />
              <Toaster />
              {children}
            </QueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}

interface Props {
  children: React.ReactNode;
}

// Layout de Marketing para Landing Pages e similares
export const MarketingLayout = ({ children }: Props) => {
  return (
    <div className="flex flex-col items-center w-full">
      <Navbar /> {/* Navbar presente em páginas de marketing */}
      <main className="flex flex-col items-center w-full">
        {children} {/* O conteúdo da página */}
      </main>
      <Footer /> {/* Footer presente em páginas de marketing */}
    </div>
  );
};