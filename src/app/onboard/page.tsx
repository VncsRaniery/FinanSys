import { auth } from "@clerk/nextjs/server";
import { seed } from "@/scripts/seed";
import { redirect } from "next/navigation";

export default async function Page() {
    const { userId } = auth();
    if (!userId)
        redirect('/');

    await seed(userId);
    redirect('/dashboard');
}