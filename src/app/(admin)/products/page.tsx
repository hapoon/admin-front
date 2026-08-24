"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { MoreHorizontal, Plus, Search } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useProducts } from "@/hooks/use-products";
import { formatCurrency, formatDate } from "@/lib/format";
import { productStatusLabel, productStatusVariant } from "@/lib/labels";

export default function ProductsPage() {
  const { items: products, isLoaded, remove } = useProducts();
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q),
    );
  }, [products, query]);

  function handleDelete(id: string, name: string) {
    remove(id);
    toast.success(`${name} を削除しました`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">商品管理</h1>
          <p className="text-sm text-muted-foreground">
            {isLoaded ? `${products.length} 件の商品` : "読み込み中..."}
          </p>
        </div>
        <Button nativeButton={false} render={<Link href="/products/new" />}>
          <Plus />
          新規商品
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">一覧</CardTitle>
          <div className="relative mt-2 max-w-sm">
            <Search className="pointer-events-none absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
            <Input
              placeholder="商品名・SKU・カテゴリで検索"
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
                <TableHead>商品名</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>カテゴリ</TableHead>
                <TableHead>価格</TableHead>
                <TableHead>在庫</TableHead>
                <TableHead>ステータス</TableHead>
                <TableHead>更新日</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <Link href={`/products/${product.id}`} className="hover:underline">
                      {product.name}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{formatCurrency(product.price)}</TableCell>
                  <TableCell>
                    {product.stock === 0 ? (
                      <span className="text-destructive">在庫切れ</span>
                    ) : (
                      product.stock
                    )}
                  </TableCell>
                  <TableCell>
                    <Badge variant={productStatusVariant[product.status]}>
                      {productStatusLabel[product.status]}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(product.updatedAt)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={<Button variant="ghost" size="icon" className="size-8" />}
                      >
                        <MoreHorizontal />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLinkItem render={<Link href={`/products/${product.id}`} />}>
                          詳細
                        </DropdownMenuLinkItem>
                        <DropdownMenuLinkItem
                          render={<Link href={`/products/${product.id}/edit`} />}
                        >
                          編集
                        </DropdownMenuLinkItem>
                        <DropdownMenuItem
                          variant="destructive"
                          onClick={() => handleDelete(product.id, product.name)}
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
                  <TableCell colSpan={8} className="h-24 text-center text-muted-foreground">
                    該当する商品が見つかりません
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
