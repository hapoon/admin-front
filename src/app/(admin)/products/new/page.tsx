"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductForm, type ProductFormValues } from "@/components/product-form";
import { useProducts } from "@/hooks/use-products";
import { generateId } from "@/lib/format";

export default function NewProductPage() {
  const router = useRouter();
  const { add } = useProducts();

  function handleSubmit(values: ProductFormValues) {
    const id = generateId("p");
    add({ id, updatedAt: new Date().toISOString().slice(0, 10), ...values });
    toast.success("商品を作成しました");
    router.push(`/products/${id}`);
  }

  return (
    <div className="flex flex-col gap-6">
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
          <h1 className="text-2xl font-semibold tracking-tight">新規商品登録</h1>
          <p className="text-sm text-muted-foreground">サンプルデータとして保存されます</p>
        </div>
      </div>

      <ProductForm onSubmit={handleSubmit} submitLabel="作成する" />
    </div>
  );
}
