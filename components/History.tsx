"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

type Bill = {
  id: string
  title: string
  total: number
  date: string
  participantsCount: number
  status: string
}

export default function History() {
  const [data, setData] = useState<Bill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/bill/history")
        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-3xl md:text-4xl font-black">
          History Patungin
        </h1>
        <p className="text-gray-500">
          Semua riwayat split bill kamu
        </p>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        {data.map((bill, index) => (
          <motion.div
            key={bill.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl p-5 shadow-sm border flex flex-col md:flex-row md:items-center justify-between gap-4 hover:shadow-md transition"
          >
            {/* LEFT */}
            <div>
              <h3 className="font-bold text-lg">
                {bill.title}
              </h3>
              <p className="text-sm text-gray-500">
                {bill.participantsCount} orang •{" "}
                {new Date(bill.date).toLocaleDateString("id-ID")}
              </p>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="font-bold">
                  Rp {bill.total.toLocaleString("id-ID")}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  bill.status === "LUNAS"
                    ? "bg-green-100 text-green-600"
                    : "bg-red-100 text-red-600"
                }`}
              >
                {bill.status}
              </span>
            </div>
          </motion.div>
        ))}

        {data.length === 0 && (
          <p className="text-center text-gray-400 mt-10">
            Belum ada history 😢
          </p>
        )}
      </div>
    </div>
  )
}