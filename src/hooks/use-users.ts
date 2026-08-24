"use client";

import { useCollection } from "@/hooks/use-collection";
import { SEED_USERS } from "@/lib/seed-data";

export function useUsers() {
  return useCollection("admin-front:users", SEED_USERS);
}
