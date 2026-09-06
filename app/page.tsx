"use client"

import InputForm from "@/components/InputForm";
import ManageForm from "@/components/ManageForm";
import History from "@/components/History"
import { HistoryItem } from "@/components/History";
import { useState, useEffect } from "react";
import CustomInputForm from "@/components/CustomInputForm";

export default function Home() {
  const [history, setHistory] = useState<HistoryItem[]>([])

  useEffect(() => {
        const saved = JSON.parse(
            localStorage.getItem("history") ?? "[]"
        );

        const historyFinal: HistoryItem[] = saved.map((item) => ({
            name: item.shortUrl,
            link: item.longUrl
        }));

        setHistory(historyFinal);
    }, []);

  return (
    <main className="grid grid-cols-12 grid-rows-6 gap-4 w-screen h-screen p-4">
      <History history={history} className="col-start-1 col-span-2 row-start-1 row-span-6" />
      <InputForm className="col-start-3 col-span-5 row-start-1 row-span-2" />
      <CustomInputForm className="col-start-8 col-span-5 row-start-1 row-span-2" />
      <ManageForm className="col-start-9 col-span-4 row-start-5 row-span-2" />
    </main>
  );
}
