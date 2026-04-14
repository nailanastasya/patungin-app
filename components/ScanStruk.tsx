"use client";

import {
  CloudUpload,
  Image as ImageIcon,
  Sparkles,
  Info,
  Search as SearchIcon,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState, ChangeEvent } from "react";
import { useRouter, useParams } from "next/navigation";

type Item = {
  name: string;
  price: number;
};

export default function ScanStruk() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ upload
  const handleUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ✅ parser OCR (TIDAK DIUBAH)
  const parseText = (text: string): Item[] => {
    const lines = text.split("\n");
    const items: Item[] = [];

    const blacklist = [
      "subtotal",
      "total",
      "grand",
      "tax",
      "service",
      "charge",
      "cash",
      "change",
      "pos",
      "esb",
      "pbi",
      "pb1",
    ];

    for (const rawLine of lines) {
      const clean = rawLine.trim();
      const lower = clean.toLowerCase();

      if (!clean) continue;
      if (blacklist.some((b) => lower.includes(b))) continue;

const match = clean.match(/^(\d+)\s+(.+)\s+([\d.,]+)$/);
      if (!match) continue;

      const name = match[2].trim();
     const price = parseInt(match[3].replace(/[.,]/g, ""));

      if (isNaN(price)) continue;

      items.push({ name, price });
    }

    return items;
  };

  // ✅ SCAN (logic lama)
  const handleScan = async () => {
    if (!image) {
      alert("Upload gambar dulu");
      return;
    }

    if (!id) {
      alert("Bill ID tidak ditemukan");
      return;
    }

    setLoading(true);

    try {
      const Tesseract = (await import("tesseract.js")).default;

      const result = await Tesseract.recognize(image, "eng");
      const text = result.data.text;

      const items = parseText(text);

      if (items.length === 0) {
        alert("Item tidak terbaca");
        setLoading(false);
        return;
      }

      const res = await fetch("/api/bill/add-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          billId: id,
          items,
        }),
      });

      if (!res.ok) {
        alert("Gagal simpan");
        setLoading(false);
        return;
      }

      router.push(`/bill/${id}/assign`);
    } catch (err) {
      console.error(err);
      alert("Gagal scan");
    }

    setLoading(false);
  };

  return (
    <div className="p-10 max-w-7xl mx-auto">
      <header className="mb-12">
        <h2 className="text-5xl font-extrabold tracking-tight mb-2">
          Scan Receipt
        </h2>
        <p className="text-lg text-outline">
          Upload your receipt and let the AI scan it automatically
        </p>
      </header>

      <div className="grid grid-cols-12 gap-8">
        {/* LEFT */}
        <div className="col-span-12 lg:col-span-7 space-y-8">
          <div className="bg-surface-container-lowest p-8 rounded-3xl shadow relative">

            {/* UPLOAD AREA */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              className={`border-4 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center transition ${
                isDragging
                  ? "border-primary bg-primary/5"
                  : "border-outline-variant/20"
              }`}
            >
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <CloudUpload size={48} className="text-primary" />
              </div>

              <h3 className="text-2xl font-bold mb-3">
                Upload Receipt
              </h3>

              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                className="hidden"
                id="fileUpload"
              />

              <label
                htmlFor="fileUpload"
                className="cursor-pointer bg-primary text-white px-6 py-3 rounded-full"
              >
                Select Image
              </label>
            </div>

            {/* PREVIEW */}
            {image && (
              <div className="mt-6 flex justify-center">
                <img
                  src={image}
                  alt="preview"
                  className="w-64 rounded-xl border"
                />
              </div>
            )}

            {/* BUTTON */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={handleScan}
                disabled={loading}
                className="bg-gradient-to-br from-primary to-primary-container text-on-primary px-10 py-5 rounded-full font-bold flex items-center gap-2"
              >
                {loading ? "Scanning..." : "Scan Now"}
                <Sparkles />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="col-span-12 lg:col-span-5">
          <div className="bg-surface-container p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6">How it works</h3>

            <ol className="space-y-4 text-sm text-outline">
              <li>1. Upload receipt</li>
              <li>2. AI scans items</li>
              <li>3. Assign to a friend</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}