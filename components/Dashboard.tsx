"use client"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

/* =======================
   TYPES
======================= */

type ParticipantType = {
  id: number
  userId: number
  billId: number
  totalShare: number
  isPaid: boolean
}

type ActiveBillType = {
  id: number
  title: string
  participants: ParticipantType[]
} | null

type ActiveSummaryType = {
  totalAmount: number
  isPaid: boolean
} | null

type RecentBillType = {
  id: number
  title: string
  total: number
  date: Date
  status: string
  participantsCount: number
}

type UserType = {
  name: string
  balance: number
}

type DashboardProps = {
  user: UserType
  activeBill: ActiveBillType
  activeSummary: ActiveSummaryType
  recentBills: RecentBillType[]
}

/* =======================
   COMPONENT
======================= */

export default function Dashboard({
  user,
  activeBill,
  activeSummary,
  recentBills,
}: DashboardProps) {
  return (
    <div className="relative p-4 md:p-10 max-w-7xl mx-auto space-y-10 overflow-hidden">

      {/* 🔥 BACKGROUND GLOW */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-primary/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-120px] left-[-100px] w-[250px] h-[250px] bg-secondary/10 blur-[120px] rounded-full" />

      {/* HEADER */}
      <section className="relative z-10 flex flex-col md:flex-row md:justify-between md:items-end gap-3">
        <div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight">
            Halo, {user.name} 👋
          </h2>
          <p className="text-gray-500 mt-1">
            Kelola dan selesaikan tagihanmu dengan mudah
          </p>
        </div>
      </section>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">

        {/* ACTIVE BILL */}
        {activeBill && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-gradient-to-br from-primary to-primary-container rounded-2xl p-6 md:p-8 text-white shadow-2xl"
          >
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
              Tagihan Aktif
            </span>

            <h3 className="text-2xl md:text-3xl font-black mt-4">
              {activeBill.title}
            </h3>

            <p className="text-white/80 mt-1">
              {activeBill.participants.length} orang ikut
            </p>

            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 mt-10">
              <div>
                <p className="text-sm opacity-80">
                  Total Tagihan Kamu
                </p>
                <h2 className="text-4xl md:text-5xl font-black">
                  Rp {activeSummary?.totalAmount.toLocaleString() ?? 0}
                </h2>
              </div>

              <button className="flex items-center justify-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold w-full md:w-auto hover:scale-105 transition">
                Bayar Sekarang
                <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {/* SALDO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="lg:col-span-4 bg-white rounded-2xl p-6 shadow-lg border"
        >
          <p className="text-gray-500 text-sm">
            Total Tagihan Kamu
          </p>
          <h3 className="text-3xl font-black mt-2">
            Rp {user.balance.toLocaleString()}
          </h3>

          <div className="mt-6 text-xs text-gray-400">
            Update otomatis dari semua bill kamu
          </div>
        </motion.div>

      </div>

      {/* HISTORY */}
      <section className="relative z-10 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl md:text-3xl font-black tracking-tight">
            Riwayat Split
          </h3>
        </div>

        <div className="bg-white rounded-2xl p-3 md:p-4 shadow-lg space-y-3">

          {recentBills.map((bill, index) => (
            <motion.div
              key={bill.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col md:grid md:grid-cols-12 gap-3 md:gap-4 items-center bg-gradient-to-br from-white to-gray-50 px-4 md:px-6 py-4 rounded-xl hover:shadow-md transition"
            >
              {/* TITLE */}
              <div className="md:col-span-5 w-full">
                <h4 className="font-bold text-lg">
                  {bill.title}
                </h4>
                <p className="text-xs text-gray-500">
                  {bill.participantsCount} orang
                </p>
              </div>

              {/* DATE */}
              <div className="md:col-span-3 text-sm text-gray-500 md:text-center w-full">
                {new Date(bill.date).toLocaleDateString()}
              </div>

              {/* TOTAL */}
              <div className="md:col-span-2 font-bold md:text-right w-full">
                Rp {bill.total.toLocaleString()}
              </div>

              {/* STATUS */}
              <div className="md:col-span-2 md:text-right w-full">
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

        </div>
      </section>
    </div>
  )
}