import type { ProductStatus, UserRole, UserStatus } from "@/lib/types";

export const userRoleLabel: Record<UserRole, string> = {
  admin: "管理者",
  editor: "編集者",
  viewer: "閲覧者",
};

export const userStatusLabel: Record<UserStatus, string> = {
  active: "有効",
  invited: "招待中",
  suspended: "停止中",
};

export const userStatusVariant: Record<
  UserStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  active: "default",
  invited: "secondary",
  suspended: "destructive",
};

export const productStatusLabel: Record<ProductStatus, string> = {
  published: "公開中",
  draft: "下書き",
  archived: "アーカイブ",
};

export const productStatusVariant: Record<
  ProductStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  published: "default",
  draft: "secondary",
  archived: "outline",
};
