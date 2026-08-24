"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProducts } from "@/hooks/use-products";
import { formatCurrency, formatDate } from "@/lib/format";
import { productStatusLabel, productStatusVariant } from "@/lib/labels";

export default function ProductDetailPage() {
  const params = useParams<{ id: string }>();
  const { getById, isLoaded } = useProducts();

  if (!isLoaded) {
    return <p className="text-sm text-muted-foreground">読み込み中...</p>;
  }

  const product = getById(params.id);
  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            nativeButton={false}
            render={<Link href="/products" />}
          >
            <ArrowLeft />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">{product.name}</h1>
            <p className="text-sm text-muted-foreground">{product.sku}</p>
          </div>
        </div>
        <Button nativeButton={false} render={<Link href={`/products/${product.id}/edit`} />}>
          <Pencil />
          編集
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardContent className="flex flex-col items-center gap-3 pt-6">
            <div className="text-3xl font-bold">{formatCurrency(product.price)}</div>
            <Badge variant={productStatusVariant[product.status]}>
              {productStatusLabel[product.status]}
            </Badge>
            <p className="text-sm text-muted-foreground">
              在庫: {product.stock === 0 ? "在庫切れ" : `${product.stock} 点`}
            </p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-base font-medium">商品情報</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <DetailRow label="商品ID" value={product.id} />
            <Separator />
            <DetailRow label="SKU" value={product.sku} />
            <Separator />
            <DetailRow label="カテゴリ" value={product.category} />
            <Separator />
            <DetailRow label="更新日" value={formatDate(product.updatedAt)} />
            {product.description && (
              <>
                <Separator />
                <DetailRow label="説明" value={product.description} />
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
