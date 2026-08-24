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
import type { User, UserRole, UserStatus } from "@/lib/types";
import { userRoleLabel, userStatusLabel } from "@/lib/labels";

export type UserFormValues = Omit<User, "id" | "createdAt">;

const ROLE_OPTIONS: UserRole[] = ["admin", "editor", "viewer"];
const STATUS_OPTIONS: UserStatus[] = ["active", "invited", "suspended"];

export function UserForm({
  defaultValues,
  onSubmit,
  submitLabel,
  isSubmitting,
}: {
  defaultValues?: Partial<UserFormValues>;
  onSubmit: (values: UserFormValues) => void;
  submitLabel: string;
  isSubmitting?: boolean;
}) {
  const [name, setName] = useState(defaultValues?.name ?? "");
  const [email, setEmail] = useState(defaultValues?.email ?? "");
  const [department, setDepartment] = useState(defaultValues?.department ?? "");
  const [role, setRole] = useState<UserRole>(defaultValues?.role ?? "viewer");
  const [status, setStatus] = useState<UserStatus>(defaultValues?.status ?? "active");
  const [note, setNote] = useState(defaultValues?.note ?? "");

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    onSubmit({ name, email, department, role, status, note: note || undefined });
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">氏名</Label>
              <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="department">部署</Label>
              <Input
                id="department"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">役割</Label>
              <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
                <SelectTrigger id="role" className="w-full">
                  <SelectValue>{(v: UserRole) => userRoleLabel[v]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {ROLE_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {userRoleLabel[option]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">ステータス</Label>
              <Select value={status} onValueChange={(v) => setStatus(v as UserStatus)}>
                <SelectTrigger id="status" className="w-full">
                  <SelectValue>{(v: UserStatus) => userStatusLabel[v]}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {userStatusLabel[option]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="note">メモ</Label>
            <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} rows={3} />
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
