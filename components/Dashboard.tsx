"use client"
import { motion } from "framer-motion"

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
    <div className="p-4 md:p-10 space-y-8 max-w-7xl mx-auto">

      {/* HEADER */}
      <section className="flex flex-col md:flex-row md:justify-between md:items-end gap-2">
        <div>
          <h2 className="text-2xl md:text-4xl font-black">
            Halo, {user.name}!
          </h2>
          <p className="text-gray-500 text-sm md:text-lg">
            Waktunya melunasi tagihan bareng teman-teman.
          </p>
        </div>
      </section>

      {/* GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* ACTIVE BILL */}
        {activeBill && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 bg-gradient-to-br from-primary to-primary-container rounded-xl p-6 md:p-8 text-white shadow-xl"
          >
            <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase">
              Tagihan Aktif
            </span>

            <h3 className="text-2xl md:text-3xl font-black mt-4">
              {activeBill.title}
            </h3>

            <p className="text-white/80 mt-1 text-sm md:text-base">
              Bersama {activeBill.participants.length} orang
            </p>

            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mt-8">
              <div>
                <span className="text-sm opacity-80">
                  Total Tagihan Kamu
                </span>
                <h2 className="text-3xl md:text-5xl font-black">
                  Rp{" "}
                  {activeSummary?.totalAmount.toLocaleString() ?? 0}
                </h2>
              </div>

              <button className="bg-white text-black px-6 py-3 rounded-full font-bold w-full md:w-auto">
                Bayar Sekarang
              </button>
            </div>
          </motion.div>
        )}

        {/* SALDO */}
        <div className="lg:col-span-4 bg-surface-container-highest rounded-xl p-6 shadow-sm">
          <p className="text-sm text-gray-500">Tagihan Kamu</p>
          <h3 className="text-xl md:text-2xl font-black mt-2">
            Rp {user.balance.toLocaleString()}
          </h3>
        </div>

      </div>

      {/* HISTORY */}
      <section className="space-y-4 md:space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-xl md:text-2xl font-black">
            History Patungin
          </h3>
        </div>

        <div className="bg-surface-container-low rounded-xl p-2 space-y-2">

          {recentBills.map((bill, index) => (
            <motion.div
              key={bill.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex flex-col md:grid md:grid-cols-12 gap-2 md:gap-4 bg-white px-4 md:px-6 py-4 rounded-lg"
            >
              {/* TITLE */}
              <div className="md:col-span-5">
                <h4 className="font-bold">
                  {bill.title}
                </h4>
                <p className="text-xs text-gray-500">
                  Split dengan {bill.participantsCount} orang
                </p>
              </div>

              {/* DATE */}
              <div className="md:col-span-3 text-sm md:text-center text-gray-500">
                {new Date(bill.date).toLocaleDateString()}
              </div>

              {/* TOTAL */}
              <div className="md:col-span-2 font-bold md:text-right">
                Rp {bill.total.toLocaleString()}
              </div>

              {/* STATUS */}
              <div className="md:col-span-2 md:text-right">
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