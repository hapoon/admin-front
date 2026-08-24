"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product, ProductStatus } from "@/lib/types";
import { productStatusLabel } from "@/lib/labels";

export type ProductFormValues = Omit<Product, "id" | "updatedAt">;

const STATUS_OPTIONS: ProductStatus[] = ["published", "draft", "archived"];

export function ProductForm({
  defaultValues,
  onSubmit,
  submitLabel,
  isSubmitting,
}: {
  defaultValues?: Partial<ProductFormValues>;
  onSubmit: (values: ProductFormValues) => void;
  submitLabel: string;
  isSubmitting?: boolean;
}) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [sku, setSku] = useState(defaultValues?.sku ?? "");
  const [category, setCategory] = useState(defaultValues?.category ?? "");
  const [price, setPrice] = useState(String(defaultValues?.price ?? 0));
  const [stock, setStock] = useState(String(defaultValues?.stock ?? 0));
  const [status, setStatus] = useState<ProductStatus>(defaultValues?.status ?? "draft");
  const [description, setDescription] = useState(defaultValues?.description ?? "");

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    onSubmit({
      name,
      sku,
      category,
      price: Number(price) || 0,
      stock: Number(stock) || 0,
      status,
      description: description || undefined,
    });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">商品名</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sku">SKU</Label>
              <Input id="sku" required value={sku} onChange={(e) => setSku(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">カテゴリ</Label>
              <Input
                id="category"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">ステータス</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as ProductStatus)}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue>{(v: ProductStatus) => productStatusLabel[v]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {productStatusLabel[option]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">価格(円)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="stock">在庫数</Label>
              <Input
                id="stock"
                type="number"
                min={0}
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">説明</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
