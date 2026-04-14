"use client";

import { useEffect, useState, useRef, ChangeEvent } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/SideBar";
import { TopBar } from "@/components/TopBar";
import { ChevronRight, Send, QrCode } from "lucide-react";

import * as htmlToImage from "html-to-image";

import QRSection from "@/components/QRSection";
import SettleBanner from "@/components/SettleBanner";
import BillDetails from "@/components/BillDetails";

type FriendSummary = {
  name: string;
  total: number;
};

export default function SummaryPage() {
  const params = useParams();
  const id = params?.id as string;

  const [data, setData] = useState<FriendSummary[]>([]);
  const [selected, setSelected] = useState<FriendSummary | null>(null);
  const [loading, setLoading] = useState(true);

  const [groupQR, setGroupQR] = useState<string | null>(null); // 🔥 NEW

  const exportRef = useRef<HTMLDivElement>(null);

  // 🔥 FETCH DATA
  useEffect(() => {
    if (!id) return;

    const fetchSummary = async () => {
      try {
        const res = await fetch(`/api/bill/${id}/summary`);
        const json = await res.json();

        const formatted: FriendSummary[] = Object.entries(
          json.summary || {}
        ).map(([name, total]) => ({
          name,
          total: Number(total),
        }));

        setData(formatted);
        setSelected(formatted[0] || null);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [id]);

  // 🔥 UPLOAD QR
  const handleQRUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setGroupQR(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // 🔥 EXPORT PNG
  const handleExport = async () => {
    if (!exportRef.current) return;

    try {
      const dataUrl = await htmlToImage.toPng(exportRef.current, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = "bill-summary.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("EXPORT ERROR:", err);
    }
  };

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-6 md:p-10 overflow-y-auto">
          <div ref={exportRef} className="bg-white p-4 rounded-xl">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <nav className="flex items-center space-x-2 text-gray-400 text-sm mb-4">
                  <span>Activity</span>
                  <ChevronRight size={14} />
                  <span>Bill</span>
                  <ChevronRight size={14} />
                  <span className="text-blue-500 font-semibold">
                    Summary
                  </span>
                </nav>

                <h1 className="text-4xl md:text-5xl font-black tracking-tight">
                  Bill Per Person <span className="text-blue-500">Summary</span>
                </h1>

                <p className="text-gray-500 mt-3">
                  Review pembagian biaya tiap orang
                </p>
              </div>

              <div className="flex gap-4">

                {/* 🔥 UPLOAD QR */}
                <label className="px-6 py-3 rounded-full bg-gray-100 font-semibold flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition">
                  <QrCode size={18} />
                  Upload Group QR

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleQRUpload}
                    className="hidden"
                  />
                </label>

                {/* SHARE */}
                <button
                  onClick={handleExport}
                  className="px-6 py-3 rounded-full bg-blue-500 text-white font-semibold flex items-center gap-2"
                >
                  <Send size={18} />
                  Share Bill
                </button>
              </div>
            </div>

            {/* CONTENT */}
            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  
                  {/* LEFT */}
                  <div className="lg:col-span-4 space-y-4">
                    {data.map((friend, index) => {
                      const active = selected?.name === friend.name;

                      return (
                        <button
                          key={index}
                          onClick={() => setSelected(friend)}
                          className={`w-full text-left p-5 rounded-xl transition ${
                            active
                              ? "bg-blue-500 text-white shadow-lg"
                              : "bg-white hover:shadow-md"
                          }`}
                        >
                          <h3 className="font-bold text-lg">
                            {friend.name}
                          </h3>

                          <p className="text-sm opacity-70 mt-1">
                            Rp{" "}
                            {Math.round(friend.total).toLocaleString("id-ID")}
                          </p>
                        </button>
                      );
                    })}
                  </div>

                  {/* RIGHT */}
                  <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {selected && (
                      <BillDetails
                        name={selected.name}
                        items={[
                          {
                            id: "1",
                            name: "Total Items",
                            description: "Gabungan dari semua item",
                            amount: selected.total,
                          },
                        ]}
                        subtotal={selected.total}
                        tax={0}
                      />
                    )}

                    {/* 🔥 QR */}
                    {selected && (
                      <QRSection
                        name={selected.name}
                        amount={selected.total}
                        groupQR={groupQR}
                      />
                    )}
                  </div>
                </div>

                <div className="mt-10">
                  <SettleBanner />
                </div>

                <p className="text-center text-xs text-gray-400 mt-6">
                  Generated by Patungin
                </p>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}