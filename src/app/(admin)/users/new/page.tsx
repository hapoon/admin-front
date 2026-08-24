"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserForm, type UserFormValues } from "@/components/user-form";
import { useUsers } from "@/hooks/use-users";
import { generateId } from "@/lib/format";

export default function NewUserPage() {
  const router = useRouter();
  const { add } = useUsers();

  function handleSubmit(values: UserFormValues) {
    const id = generateId("u");
    add({ id, createdAt: new Date().toISOString().slice(0, 10), ...values });
    toast.success("ユーザーを作成しました");
    router.push(`/users/${id}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/users" />}>
          <ArrowLeft />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">新規ユーザー作成</h1>
          <p className="text-sm text-muted-foreground">サンプルデータとして保存されます</p>
        </div>
      </div>

      <UserForm onSubmit={handleSubmit} submitLabel="作成する" />
    </div>
  );
}
