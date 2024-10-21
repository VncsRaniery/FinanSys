"use client";

import { useUser } from "@clerk/nextjs";

export const BemVindoMsg = () => {
  const { user, isLoaded } = useUser();

  return (
    <div className="space-y-2 mb-4">
      <h2 className="text-2xl lg:text-4xl text-foreground font-medium">
        Seja bem vindo{isLoaded ? ", " : " "}
        {user?.firstName} 👋🏻
      </h2>
      <p className="text-sm lg:text-base text-accent-foreground">
        Este é o seu relatório de visão geral financeira
      </p>
    </div>
  );
};
