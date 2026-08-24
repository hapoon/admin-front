"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("yamada.taro@example.com");
  const [password, setPassword] = useState("password");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();
    setIsSubmitting(true);
    // バックエンド API 未実装のため、入力チェックのみ行うモック認証
    window.setTimeout(() => {
      setIsSubmitting(false);
      toast.success("ログインしました(モック)");
      router.push("/dashboard");
    }, 400);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center bg-muted/40 p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-xl">管理画面ログイン</CardTitle>
          <CardDescription>
            これはモック画面です。認証は実装されていません。
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="flex flex-col gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">パスワード</Label>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter className="mt-6 flex-col gap-2">
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "ログイン中..." : "ログイン"}
            </Button>
            <p className="text-center text-xs text-muted-foreground">
              任意の値を入力してログインできます
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
