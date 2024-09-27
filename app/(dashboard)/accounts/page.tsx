"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import { Plus } from "lucide-react";
import { columns, Payment } from "./columns";
import { DataTable } from "@/components/DataTable";

  const data: Payment[] = [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ]

const AccountsPage = () => {
    const newAccount = useNewAccount();
  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
            <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                <CardTitle className="text-xl line-clamp-1">
                    Página de contas
                </CardTitle>
                <Button onClick={newAccount.onOpen} size="sm">
                    <Plus className="size-4 mr-2" />
                    Adicionar
                </Button>
            </CardHeader>
            <CardContent>
                <DataTable 
                filterKey="email"
                columns={columns} 
                data={data}
                onDelete={() => {}}
                disabled={false}
                />
            </CardContent>
        </Card>
    </div>
  )
}

export default AccountsPage;