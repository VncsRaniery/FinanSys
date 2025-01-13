<h1 align="start">
  FinanSys - Gerenciamento Financeiro
</h1>

<img width="1280" alt="FinanSys Thumbnail" src="/public/assets/Banner.png">


## Introdução

FinanSys é um site moderno e totalmente responsivo, construído com uma poderosa pilha de tecnologia. Este projeto mostra o uso de Next.js para renderização no lado do servidor, TailwindCSS para um estilo elegante, UI shadcn para componentes elegantes e Clerk para autenticação segura.

## Tecnologias utilizadas

- **Next.js**: Para construir o site baseado em React.
- **TailwindCSS**: Para estilizar com CSS utilitário.
- **Shadcn UI**: Para componentes UI.
- **Magic UI**: Para componentes UI.
- **Clerk**: Para autenticação de usuários.
- **Hono**: Framework para facilitar a criação de APIs performáticas, com uma sintaxe simples e direta.
- **Neon**: Banco de dados Postgres gerenciado na nuvem, com escalabilidade e alta performance.
- **Drizzle**: facilita a interação com o banco de dados SQL de maneira eficiente e com total suporte à tipagem TypeScript, o que aumenta a segurança do código.


## Início rápido

### Prerequisites
Certifique-se de ter instalado
- Node.js
- Git
- npm / yarn / pnpm / bun

1. Clonar este repositório:

   ```bash
   git clone https://github.com/VncsRaniery/FinanSys
   cd FinanSys
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Configurar variáveis de ​ambientes:
   ```bash
   # app
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   
   # clerk
   CLERK_SECRET_KEY=
   CLERK_PUBLISHABLE_KEY=
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL='/onboard'

   # database neon
   DATABASE_URL=
   ```
5. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
6. Abra seu navegador e navegue até http://localhost:3000 para ver o site em ação.
---
