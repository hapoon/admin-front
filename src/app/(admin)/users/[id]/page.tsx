"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useUsers } from "@/hooks/use-users";
import { formatDate } from "@/lib/format";
import { userRoleLabel, userStatusLabel, userStatusVariant } from "@/lib/labels";

export default function UserDetailPage() {
  const params = useParams<{ id: string }>();
  const { getById, isLoaded } = useUsers();

  if (!isLoaded) {
    return <p className="text-sm text-muted-foreground">読み込み中...</p>;
  }

  const user = getById(params.id);
  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" nativeButton={false} render={<Link href="/users" />}>
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button nativeButton={false} render={<Link href={`/users/${user.id}/edit`} />}>
          <Pencil />
          編集
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center gap-3 pt-6">
            <Avatar className="size-20 text-xl">
              <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <div className="text-center">
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{userRoleLabel[user.role]}</p>
            </div>
            <Badge variant={userStatusVariant[user.status]}>
              {userStatusLabel[user.status]}
            </Badge>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-medium">基本情報</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <DetailRow label="ユーザーID" value={user.id} />
            <Separator />
            <DetailRow label="メールアドレス" value={user.email} />
            <Separator />
            <DetailRow label="部署" value={user.department} />
            <Separator />
            <DetailRow label="役割" value={userRoleLabel[user.role]} />
            <Separator />
            <DetailRow label="登録日" value={formatDate(user.createdAt)} />
            {user.note && (
              <>
                <Separator />
                <DetailRow label="メモ" value={user.note} />
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-3 gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="col-span-2">{value}</span>
    </div>
  );
}
