"use client"

import React, { useEffect, useState } from "react"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { Check, ArrowRight, Info } from "lucide-react"

type Participant = {
  id: string
  name: string
}

type Item = {
  id: string
  name: string
  price: number
}

type Bill = {
  id: string
  name: string
  items: Item[]
  participants: Participant[]
}

export default function AssignItems() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string

  const [bill, setBill] = useState<Bill | null>(null)
  const [selected, setSelected] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!id) return

    const load = async () => {
      try {
        const res = await axios.get(`/api/bill/${id}`)
        setBill(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    load()
  }, [id])

  const toggleParticipant = (itemId: string, participantId: string) => {
    setSelected(prev => {
      const current = prev[itemId] ?? []

      return {
        ...prev,
        [itemId]: current.includes(participantId)
          ? current.filter(id => id !== participantId)
          : [...current, participantId],
      }
    })
  }

  const formatRupiah = (value: number) =>
    new Intl.NumberFormat("id-ID").format(value)

  const handleSave = async () => {
    if (loading || !bill) return

    const unassignedItems = bill.items.filter(
      item => !(selected[item.id] && selected[item.id].length > 0)
    )

    if (unassignedItems.length > 0) {
      alert("Masih ada item yang belum dipilih!")
      return
    }

    setLoading(true)

    try {
      const payload = Object.entries(selected).map(
        ([itemId, participantIds]) => ({
          itemId,
          participantIds,
        })
      )

      await axios.post("/api/item-share/bulk", {
        data: payload,
      })

      router.push(`/bill/${id}/summary`)
    } catch (err) {
      console.error(err)
      alert("Gagal menyimpan data")
    } finally {
      setLoading(false)
    }
  }

  if (!bill) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading bill...
      </div>
    )
  }

  const subtotal = bill.items.reduce((sum, i) => sum + i.price, 0)

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-50 via-white to-blue-50">

      {/* BACKGROUND DECOR */}
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl"></div>

      {/* HEADER */}
      <div className="mb-10 relative">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Bill</span>
          <span>/</span>
          <span className="text-blue-600 font-semibold">Assign Items</span>
        </div>

        <h1 className="text-3xl md:text-5xl font-black mt-2 tracking-tight">
          Assign Items
        </h1>

        <p className="text-gray-500 mt-3 flex items-center gap-2">
          <Info size={16} />
          Choose who gets to eat what
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT */}
        <div className="lg:col-span-8 space-y-6">

          {bill.items.map(item => {
            const selectedIds = selected[item.id] ?? []

            return (
              <div
                key={item.id}
                className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg border border-white/40 hover:shadow-xl transition"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <h3 className="font-bold text-lg">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-sm">
                      Rp {formatRupiah(item.price)}
                    </p>
                  </div>

                  <div className={`text-xs px-3 py-1 rounded-full ${
                    selectedIds.length === 0
                      ? "bg-gray-100 text-gray-500"
                      : "bg-blue-100 text-blue-600"
                  }`}>
                    {selectedIds.length === 0
                      ? "Unassigned"
                      : `${selectedIds.length} person`}
                  </div>
                </div>

                {/* PARTICIPANTS */}
                <div className="flex flex-wrap gap-3">
                  {bill.participants.map(p => {
                    const active = selectedIds.includes(p.id)

                    return (
                      <button
                        key={p.id}
                        onClick={() =>
                          toggleParticipant(item.id, p.id)
                        }
                        className={`
                          flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all border
                          ${
                            active
                              ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md"
                              : "bg-white hover:bg-blue-50"
                          }
                        `}
                      >
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                          {p.name[0]}
                        </div>
                        {p.name}
                        {active && <Check size={14} />}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}

        </div>

        {/* RIGHT */}
        <div className="lg:col-span-4 space-y-6">

          <div className="bg-gradient-to-br from-blue-600 to-blue-500 text-white rounded-2xl p-6 shadow-xl">
            <h3 className="font-bold text-xl mb-6">
              Summary
            </h3>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between opacity-80">
                <span>Subtotal</span>
                <span>Rp {formatRupiah(subtotal)}</span>
              </div>

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>Rp {formatRupiah(subtotal)}</span>
              </div>
            </div>

            <button
              onClick={handleSave}
              disabled={loading}
              className="mt-6 w-full bg-white text-blue-600 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:scale-105 transition"
            >
              {loading ? "Saving..." : "Next"}
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="bg-white/80 backdrop-blur p-5 rounded-2xl text-sm text-blue-600 border">
            💡 Tip: Make sure all items have been assigned before continuing
          </div>

        </div>
      </div>
    </div>
  )
}