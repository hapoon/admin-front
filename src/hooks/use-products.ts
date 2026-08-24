"use client";

import { useCollection } from "@/hooks/use-collection";
import { SEED_PRODUCTS } from "@/lib/seed-data";

export function useProducts() {
  return useCollection("admin-front:products", SEED_PRODUCTS);
}
