"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLinkItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUsers } from "@/hooks/use-users";
import { formatDate } from "@/lib/format";
import { userRoleLabel, userStatusLabel, userStatusVariant } from "@/lib/labels";

export default function UsersPage() {
  const { items: users, isLoaded, remove } = useUsers();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.department.toLowerCase().includes(q),
    );
  }, [users, query]);

  function handleDelete(id: string, name: string) {
    remove(id);
    toast.success(`${name} を削除しました`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">ユーザー管理</h1>
          <p className="text-sm text-muted-foreground">
            {isLoaded ? `${users.length} 件のユーザー` : "読み込み中..."}
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/users/new" />}>
          <Plus />
          新規ユーザー
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">一覧</CardTitle>
          <div className="relative mt-2 max-w-sm">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="名前・メール・部署で検索"
              className="pl-8"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>メールアドレス</TableHead>
                <TableHead>部署</TableHead>
                <TableHead>役割</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>登録日</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <Link href={`/users/${user.id}`} className="hover:underline">
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{userRoleLabel[user.role]}</TableCell>
                  <TableCell>
                    <Badge variant={userStatusVariant[user.status]}>
                      {userStatusLabel[user.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button variant="ghost" size="icon" className="size-8" />}
                      >
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLinkItem render={<Link href={`/users/${user.id}`} />}>
                          詳細
                        </DropdownMenuLinkItem>
                        <DropdownMenuLinkItem render={<Link href={`/users/${user.id}/edit`} />}>
                          編集
                        </DropdownMenuLinkItem>
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleDelete(user.id, user.name)}
                        >
                          削除
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {isLoaded && filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center text-muted-foreground">
                    該当するユーザーが見つかりません
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
