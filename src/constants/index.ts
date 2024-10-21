import { Activity, Cog, FileDown, Fingerprint, FolderCog, MonitorSmartphone, ScanEye, Server, SquareDashedKanban } from "lucide-react";

export const vantagens = [
    {
        icon: Fingerprint,
        title: "Autenticação",
        info: "Crie sua conta gratuita para começar a usar o FinanSys.",
    },
    {
        icon: Cog,
        title: "Gerenciamento",
        info: "Informe suas transferencias de forma fácil e veja detalhadamente para onde vai o seu dinheiro.",
    },
    {
        icon: Activity,
        title: "Separação ideal de gastos",
        info: "Defina limites ideais de gastos conforme seus ganhos mensais.",
    },
];

export const recursos = [
    {
        icon: FileDown,
        title: "Importação Rápida",
        info: "Importe suas transações em minutos com arquivos CSV, tornando o gerenciamento financeiro mais ágil.",
    },
    {
        icon: SquareDashedKanban,
        title: "Gráficos Personalizados",
        info: "Escolha entre diversos tipos de gráficos para visualizar seus gastos e receitas de forma clara e detalhada.",
    },
    {
        icon: ScanEye,
        title: "Análises Avançadas",
        info: "Receba insights poderosos sobre seus hábitos de consumo com relatórios detalhados e fáceis de entender.",
    },
    {
        icon: MonitorSmartphone,
        title: "Acesso em Qualquer Dispositivo",
        info: "Gerencie suas finanças em qualquer lugar, seja no desktop, tablet ou celular, com uma interface responsiva.",
    },
    {
        icon: FolderCog,
        title: "Controle Manual",
        info: "Adicione suas transações manualmente de forma simples e rápida, mantendo seu controle financeiro sempre em dia.",
    },
    {
        icon: Server,
        title: "Segurança de Dados",
        info: "Seus dados financeiros são protegidos com criptografia de ponta, garantindo privacidade e segurança total.",
    },
];


export const pricingCards = [
    {
        title: "Iniciante",
        description: "Perfeito para experimentar o plura",
        price: "Grátis",
        duration: "",
        highlight: "Recursos principais",
        buttonText: "Comece gratuitamente",
        features: ["Projetos limitados", "1 membro da equipe", "Recursos básicos"],
        priceId: "",
    },
    {
        title: "SaaS Ilimitado",
        description: "O kit definitivo para agências",
        price: "$199",
        duration: "mês",
        highlight: "Recursos principais",
        buttonText: "Atualizar para Pro",
        features: ["Projetos ilimitados", "5 membros da equipe", "Ferramentas de design avançadas", "Domínio personalizável"],
        priceId: "price_1OYxkqFj9oKEERu1KfJGWxgN",
    },
    {
        title: "Empresarial",
        description: "Para proprietários de agências sérios",
        price: "$399",
        duration: "mês",
        highlight: "Tudo no Iniciante, além de",
        buttonText: "Atualizar para Empresarial",
        features: ["Projetos ilimitados", "Membros da equipe ilimitados", "Marca personalizada", "Suporte prioritário (24/7)"],
        priceId: "price_1OYxkqFj9oKEERu1NbKUxXxN",
    },
];