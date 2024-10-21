import { Container, Wrapper } from "@/components";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { LampContainer } from "@/components/ui/lamp";
import SectionBadge from "@/components/ui/section-badge";
import { recursos, vantagens, pricingCards } from "@/constants";
import { ArrowRight, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MarketingLayout } from "./layout";


const HomePage = () => {
    return (
        <MarketingLayout>
        <section className="w-full relative flex items-center justify-center flex-col px-4 md:px-0 py-8">


            {/* Apresentação */}
            <Wrapper>
                <div className="absolute inset-0 dark:bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] -z-10 h-[150vh]" />

                <Container>
                    <div className="flex flex-col items-center justify-center py-20 h-full">
                        <button className="group relative grid overflow-hidden rounded-full px-4 py-1 shadow-[0_1000px_0_0_hsl(0_0%_20%)_inset] transition-colors duration-200">
                            <span>
                                <span className="spark mask-gradient absolute inset-0 h-[100%] w-[100%] animate-flip overflow-hidden rounded-full [mask:linear-gradient(white,_transparent_50%)] before:absolute before:aspect-square before:w-[200%] before:rotate-[-90deg] before:animate-rotate before:bg-[conic-gradient(from_0deg,transparent_0_340deg,white_360deg)] before:content-[''] before:[inset:0_auto_auto_50%] before:[translate:-50%_-15%]" />
                            </span>
                            <span className="backdrop absolute inset-[1px] rounded-full bg-neutral-950 transition-colors duration-200 group-hover:bg-neutral-900" />
                            <span className="h-full w-full blur-md absolute bottom-0 inset-x-0 bg-gradient-to-tr from-primary/40"></span>
                            <span className="z-10 py-0.5 text-sm text-neutral-100 flex items-center justify-center gap-1.5">
                                <Image src="/icons/sparkles-dark.svg" alt="✨" width={24} height={24} className="w-4 h-4" />
                                Introdução a FinanSys
                                <ChevronRight className="w-4 h-4" />
                            </span>
                        </button>

                        <div className="flex flex-col items-center mt-8 max-w-3xl w-11/12 md:w-full">
                            <h1 className="text-4xl md:text-6xl lg:textxl md:!leading-snug font-semibold text-center bg-clip-text bg-gradient-to-b from-gray-50 to-gray-50 text-transparent">
                                Gerencie suas finanças de forma fácil e prática.
                            </h1>
                            <p className="text-base md:text-lg text-foreground/80 mt-6 text-center">
                                Torne o gerenciamento financeiro fácil, rápido e funcional, enquanto proporciona o melhor desempenho de análises e relatórios da categoria.
                            </p>
                            <div className="hidden md:flex relative items-center justify-center mt-8 md:mt-12 w-full">
                                <Link href="#" className="flex items-center justify-center w-max rounded-full border-t border-foreground/30 bg-white/20 backdrop-blur-lg px-2 py-1 md:py-2 gap-2 md:gap-8 shadow-3xl shadow-background/40 cursor-pointer select-none">
                                    <p className="text-foreground text-sm text-center md:text-base font-medium pl-4 pr-4 lg:pr-0">
                                        ✨ {"  "} Comece a gerencias suas finanças pessoais agora!
                                    </p>
                                    <Button size="sm" className="rounded-full hidden lg:flex border border-foreground/20">
                                        Começar
                                        <ArrowRight className="w-4 h-4 ml-1" />
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        <div className="relative flex items-center py-10 md:py-20 w-full">
                            <div className="absolute top-1/2 left-1/2 -z-10 gradient w-3/4 -translate-x-1/2 h-3/4 -translate-y-1/2 inset-0 blur-[10rem]"></div>
                            <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
                                <Image
                                    src="/assets/FinanSysDashboard.svg"
                                    alt="banner image"
                                    width={1200}
                                    height={1200}
                                    quality={100}
                                    className="rounded-md lg:rounded-xl bg-foreground/10 shadow-2xl ring-1 ring-border"
                                />

                                <BorderBeam size={250} duration={12} delay={9} />
                            </div>
                        </div>
                    </div>
                </Container>
            </Wrapper>

            {/* O processo / Sobre nós */}
            <Wrapper className="flex flex-col items-center justify-center py-12 relative">
                <section id="sobre">
                <Container>
                    <div className="max-w-md mx-auto text-start md:text-center">
                        <SectionBadge title="O Processo" />
                        <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                            Três etapas para vizualizar suas finanças
                        </h2>
                        <p className="text-muted-foreground mt-6">
                            Controle o seu dinheiro em apenas 3 passos simples
                        </p>
                    </div>
                </Container>
                <Container>
                    <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full divide-x-0 md:divide-x divide-y md:divide-y-0 divide-gray-900 first:border-l-2 lg:first:border-none first:border-gray-900">
                            {vantagens.map((vantagens) => (
                                <div key={vantagens.title} className="flex flex-col items-start px-4 md:px-6 lg:px-8 lg:py-6 py-4">
                                    <div className="flex items-center justify-center">
                                        <vantagens.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-medium mt-4">
                                        {vantagens.title}
                                    </h3>
                                    <p className="text-muted-foreground mt-2 text-start lg:text-start">
                                        {vantagens.info}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
                </section>
            </Wrapper>

            {/* Recursos */}
            <Wrapper className="flex flex-col items-center justify-center py-12 relative">
                <section id="recursos">
                <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-emerald-600 rounded-full blur-[10rem] -z-10"></div>
                <div className="hidden md:block absolute bottom-0 -left-1/3 w-72 h-72 bg-emerald-600 rounded-full blur-[10rem] -z-10"></div>

                <Container>
                    <div className="max-w-md mx-auto text-start md:text-center">
                        <SectionBadge title="Recursos" />
                        <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                            Descubra nossos recursos
                        </h2>
                        <p className="text-muted-foreground mt-6">
                            FinanSys oferece uma variedade de recursos para ajudá-lo a gerenciar suas finanças rapidamente
                        </p>
                    </div>
                </Container>
                <Container>
                    <div className="flex flex-col items-center justify-center py-10 md:py-20 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8">
                            {recursos.map((recursos) => (
                                <div key={recursos.title} className="flex flex-col items-start lg:items-start px-0 md:px-0">
                                    <div className="flex items-center justify-center">
                                        <recursos.icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-lg font-medium mt-4">
                                        {recursos.title}
                                    </h3>
                                    <p className="text-muted-foreground mt-2 text-start lg:text-start">
                                        {recursos.info}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
                </section>
            </Wrapper>

            {/* Preços
            <Wrapper className="flex flex-col items-center justify-center py-12 relative">
                <div className="hidden md:block absolute top-0 -right-1/3 w-72 h-72 bg-blue-500 rounded-full blur-[10rem] -z-10"></div>
                <Container>
                    <div className="max-w-md mx-auto text-start md:text-center">
                        <SectionBadge title="Preços" />
                        <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
                            Desbloqueie o plano certo para o seu gerenciamento
                        </h2>
                        <p className="text-muted-foreground mt-6">
                            Escolha o melhor plano para o seu tipo de gerenciamento e comece a vizualizar suas finanças detalhadamente a partir de hoje.
                        </p>
                    </div>
                </Container>
                <Container className="flex items-center justify-center">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full md:gap-8 py-10 md:py-20 flex-wrap max-w-4xl">
                        {pricingCards.map((card) => (
                            <Card
                                key={card.title}
                                className={cn("flex flex-col w-full border-neutral-700",
                                    card.title === "Unlimited Saas" && "border-2 border-primary"
                                )}
                            >
                                <CardHeader className="border-b border-border">
                                    <span>
                                        {card.title}
                                    </span>
                                    <CardTitle className={cn(card.title !== "Unlimited Saas" && "text-muted-foreground")}>
                                        {card.price}
                                    </CardTitle>
                                    <CardDescription>
                                        {card.description}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="pt-6 space-y-3">
                                    {card.features.map((feature) => (
                                        <div key={feature} className="flex items-center gap-2">
                                            <Zap className="w-4 h-4 fill-primary text-primary" />
                                            <p>{feature}</p>
                                        </div>
                                    ))}
                                </CardContent>
                                <CardFooter className="mt-auto">
                                    <Link
                                        href="#"
                                        className={cn(
                                            "w-full text-center text-primary-foreground bg-primary p-2 rounded-md text-sm font-medium",
                                            card.title !== "Unlimited Saas" && "!bg-foreground !text-background"
                                        )}
                                    >
                                        {card.buttonText}
                                    </Link>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </Container>
            </Wrapper>
            */}

            {/* newsletter */}
            <Wrapper className="flex flex-col items-center justify-center relative">
                <Container>
                    <LampContainer>
                        <div className="flex flex-col items-center justify-center relative w-full text-center">
                            <h2 className="text-4xl lg:text-5xl xl:text-6xl lg:!leading-snug font-semibold mt-8">
                                Da Organização ao Controle <br /> Mais Rápido do que Nunca
                            </h2>
                            <p className="text-muted-foreground mt-6 max-w-md mx-auto">
                                Gerencie suas finanças pessoais com facilidade usando nossa interface intuitiva e ferramentas avançadas para acompanhar seus gastos.
                            </p>
                            <Button variant="white" className="mt-6" asChild>
                                <Link href="/sign-in">
                                    Comece agora gratuitamente
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </LampContainer>
                </Container>
            </Wrapper>

        </section>
        </MarketingLayout>
    )
};

export default HomePage
