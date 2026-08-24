"use client";

import Link from "next/link";
import { notFound, useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductForm, type ProductFormValues } from "@/components/product-form";
import { useProducts } from "@/hooks/use-products";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { getById, update, isLoaded } = useProducts();

  if (!isLoaded) {
    return <p className="text-sm text-muted-foreground">読み込み中...</p>;
  }

  const product = getById(params.id);
  if (!product) {
    notFound();
  }

  function handleSubmit(values: ProductFormValues) {
    update(product!.id, { ...values, updatedAt: new Date().toISOString().slice(0, 10) });
    toast.success("商品情報を更新しました");
    router.push(`/products/${product!.id}`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          nativeButton={false}
          render={<Link href={`/products/${product.id}`} />}
        >
          <ArrowLeft />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">商品を編集</h1>
          <p className="text-sm text-muted-foreground">{product.name}</p>
        </div>
      </div>

      <ProductForm defaultValues={product} onSubmit={handleSubmit} submitLabel="更新する" />
    </div>
  );
}
