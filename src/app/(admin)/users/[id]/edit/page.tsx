"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserForm, type UserFormValues } from "@/components/user-form";
import { useUsers } from "@/hooks/use-users";

export default function EditUserPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getById, update, isLoaded } = useUsers();

  if (!isLoaded) {
    return <p className="text-sm text-muted-foreground">読み込み中...</p>;
  }

  const user = getById(params.id);
  if (!user) {
    notFound();
  }

  function handleSubmit(values: UserFormValues) {
    update(user!.id, values);
    toast.success("ユーザー情報を更新しました");
    router.push(`/users/${user!.id}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          nativeButton={false}
          render={<Link href={`/users/${user.id}`} />}
        >
          <ArrowLeft />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">ユーザーを編集</h1>
          <p className="text-sm text-muted-foreground">{user.name}</p>
        </div>
      </div>

      <UserForm defaultValues={user} onSubmit={handleSubmit} submitLabel="更新する" />
    </div>
  );
}
