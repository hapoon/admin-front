export type UserRole = "admin" | "editor" | "viewer";
export type UserStatus = "active" | "invited" | "suspended";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  department: string;
  createdAt: string;
  note?: string;
};

export type ProductStatus = "published" | "draft" | "archived";

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  status: ProductStatus;
  updatedAt: string;
  description?: string;
};
