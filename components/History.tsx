"use client"

import { useEffect, useState } from "react"
import { ChevronRight, Utensils } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

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
  const router = useRouter()

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
    <div className="max-w-7xl mx-auto space-y-10">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">
            Split <span className="text-primary">History</span>
          </h2>
          <p className="text-outline">
            Review semua riwayat split bill kamu
          </p>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-surface rounded-2xl overflow-hidden shadow-[0px_24px_48px_rgba(0,52,64,0.06)]">

        <table className="w-full border-collapse">

          {/* HEAD */}
          <thead>
            <tr className="bg-surface-variant/10">
              <th className="text-left px-6 py-4 text-xs font-bold text-outline uppercase">
                Bill
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-outline uppercase">
                Date
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-outline uppercase">
                Participants
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-outline uppercase">
                Total
              </th>
              <th className="text-left px-6 py-4 text-xs font-bold text-outline uppercase">
                Status
              </th>
              <th className="text-center px-6 py-4 text-xs font-bold text-outline uppercase">
                Action
              </th>
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {data.map((bill, index) => (
              <motion.tr
                key={bill.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-outline-variant/10 hover:bg-surface-variant/10 transition"
              >

                {/* BILL */}
                <td className="px-6 py-5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                      <Utensils size={20} />
                    </div>

                    <div>
                      <p className="font-bold text-lg">
                        {bill.title}
                      </p>
                      <p className="text-xs text-outline">
                        Split bill
                      </p>
                    </div>
                  </div>
                </td>

                {/* DATE */}
                <td className="px-6 py-5">
                  {new Date(bill.date).toLocaleDateString("id-ID")}
                </td>

                {/* PARTICIPANTS */}
                <td className="px-6 py-5">
                  {bill.participantsCount} orang
                </td>

                {/* TOTAL */}
                <td className="px-6 py-5 font-bold">
                  Rp {bill.total.toLocaleString("id-ID")}
                </td>

                {/* STATUS */}
                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      bill.status === "LUNAS"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {bill.status}
                  </span>
                </td>

                {/* ACTION */}
                <td className="px-6 py-5 text-center">
                  <button
                    onClick={() =>
                      router.push(`/bill/${bill.id}/summary`)
                    }
                    className="p-2 hover:text-primary transition"
                  >
                    <ChevronRight />
                  </button>
                </td>

              </motion.tr>
            ))}
          </tbody>

        </table>

        {/* EMPTY STATE */}
        {data.length === 0 && (
          <div className="p-10 text-center text-gray-400">
            Belum ada history 😢
          </div>
        )}
      </div>

    </div>
  )
}