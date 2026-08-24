"use client";

import { useCallback, useEffect, useState } from "react";

type WithId = { id: string };

/**
 * ダミーデータをブラウザの localStorage に保存し、疑似的な CRUD を再現するフック。
 * バックエンド API が未実装のため、変更内容はこのブラウザ内のみで保持される。
 */
export function useCollection<T extends WithId>(key: string, seed: T[]) {
  const [items, setItems] = useState<T[]>(seed);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      setItems(raw ? (JSON.parse(raw) as T[]) : seed);
    } catch {
      setItems(seed);
    }
    setIsLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const persist = useCallback(
    (next: T[]) => {
      setItems(next);
      try {
        window.localStorage.setItem(key, JSON.stringify(next));
      } catch {
        // localStorage が利用できない環境では無視する
      }
    },
    [key],
  );

  const add = useCallback(
    (item: T) => {
      persist([item, ...items]);
    },
    [items, persist],
  );

  const update = useCallback(
    (id: string, patch: Partial<T>) => {
      persist(items.map((item) => (item.id === id ? { ...item, ...patch } : item)));
    },
    [items, persist],
  );

  const remove = useCallback(
    (id: string) => {
      persist(items.filter((item) => item.id !== id));
    },
    [items, persist],
  );

  const getById = useCallback((id: string) => items.find((item) => item.id === id), [items]);

  const reset = useCallback(() => {
    persist(seed);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [persist]);

  return { items, isLoaded, add, update, remove, getById, reset };
}
