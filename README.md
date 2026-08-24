# admin-front

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui で構築した管理画面のサンプルです。バックエンド API は未実装で、ログインとデータはすべてモックです。

## 構成

- ログイン画面(`/login`): 入力チェックのみのモック認証。任意の値でログインできます。
- ダッシュボード(`/dashboard`): サンプルデータの集計と最近のユーザー一覧。
- ユーザー管理(`/users`): 一覧・検索・詳細・編集・新規作成・削除。
- 商品管理(`/products`): 一覧・検索・詳細・編集・新規作成・削除。

データはダミーデータを初期値として `localStorage` に保存され、ブラウザ内で疑似的な CRUD として動作します(サーバーには保存されません)。

## セットアップ

```bash
npm install
npm run dev
```

[http://localhost:3000](http://localhost:3000) を開くとログイン画面にリダイレクトされます。

## ビルド

```bash
npm run build
npm run start
```
