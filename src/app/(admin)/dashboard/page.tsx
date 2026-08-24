"use client";

import Link from "next/link";
import { Package, ShieldAlert, UserCheck, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/use-users";
import { useProducts } from "@/hooks/use-products";
import { formatDate } from "@/lib/format";
import { userRoleLabel, userStatusVariant, userStatusLabel } from "@/lib/labels";

export default function DashboardPage() {
  const { items: users, isLoaded: usersLoaded } = useUsers();
  const { items: products, isLoaded: productsLoaded } = useProducts();

  const activeUsers = users.filter((u) => u.status === "active").length;
  const suspendedUsers = users.filter((u) => u.status === "suspended").length;
  const outOfStock = products.filter((p) => p.stock === 0).length;
  const recentUsers = [...users]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 5);

  const stats = [
    { label: "総ユーザー数", value: users.length, icon: Users },
    { label: "アクティブユーザー", value: activeUsers, icon: UserCheck },
    { label: "登録商品数", value: products.length, icon: Package },
    { label: "利用停止 / 在庫切れ", value: suspendedUsers + outOfStock, icon: ShieldAlert },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">ダッシュボード</h1>
        <p className="text-sm text-muted-foreground">
          サンプルのダミーデータを表示しています。
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {usersLoaded && productsLoaded ? stat.value : "—"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>最近登録されたユーザー</CardTitle>
          <Link href="/users" className="text-sm text-primary hover:underline">
            すべて表示
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>名前</TableHead>
                <TableHead>役割</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>登録日</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link href={`/users/${user.id}`} className="hover:underline">
                      {user.name}
                    </Link>
                  </TableCell>
                  <TableCell>{userRoleLabel[user.role]}</TableCell>
                  <TableCell>
                    <Badge variant={userStatusVariant[user.status]}>
                      {userStatusLabel[user.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(user.createdAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
