import { Metadata } from "next";

export const SITE_CONFIG: Metadata = {
    title: {
        default: "FinanSys",
        template: `%s | FinanSys`
    },
    description: "FinanSys é um gerenciador de finanças pessoais que ajuda você a organizar suas finanças de forma rápida e eficiente. Sem necessidade de conhecimentos em contabilidade. Comece grátis!",
    icons: {
        icon: [
            {
                url: "/icons/favicon.ico",
                href: "/icons/favicon.ico",
            }
        ]
    },
    openGraph: {
        type: "website",
        locale: "pt_BR",
        url: "http://localhost:3000",
        title: "FinanSys - Gerenciador Financeiro",
        description: "FinanSys é um gerenciador de finanças pessoais que ajuda você a organizar suas finanças de forma rápida e eficiente. Sem necessidade de conhecimentos em contabilidade. Comece grátis!",
        images: [
            {
                url: "/assets/FinanSys.png",
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        creator: "@VncsRaniery",
        title: "FinanSys - Gerenciador Financeiro",
        description: "FinanSys é um gerenciador de finanças pessoais que ajuda você a organizar suas finanças de forma rápida e eficiente. Sem necessidade de conhecimentos em contabilidade. Comece grátis!",
        images: [
            {
                url: "/assets/FinanSys.png",
                alt: "Imagem do FinanSys",
            }
        ]
    },
    metadataBase: new URL("http://localhost:3000"),
};

export const DASHBOARD_CONFIG: Metadata = {
    title: {
        default: "Dashboard",
        template: `%s | FinanSys`
    },
    description: "FinanSys é um gerenciador de finanças pessoais que ajuda você a organizar suas finanças de forma rápida e eficiente. Sem necessidade de conhecimentos em contabilidade. Comece grátis!",
    icons: {
        icon: [
            {
                url: "/icons/favicon.ico",
                href: "/icons/favicon.ico",
            }
        ]
    },
};
