"use client"

import React, { useState } from 'react';
import { Calendar, Minus, Plus, Search, CheckCircle, ArrowRight, Lightbulb, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utlis';
import { useRouter } from "next/navigation";

type Friend = {
  id: string
  name: string
}

type CreateBillResponse = {
  id?: number
  success?: boolean
  error?: string
}

export function CreateBill() {
  const [tax, setTax] = useState(15);
  const [title, setTitle] = useState('Nongkrong Starbak');

  const [friends, setFriends] = useState<Friend[]>([])
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])

  const [inputName, setInputName] = useState("")
  const [isSavingDraft, setIsSavingDraft] = useState(false)

  const router = useRouter()

  const toggleFriend = (id: string) => {
    setSelectedFriends(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const addFriend = () => {
    if (!inputName) return

    const newFriend: Friend = {
      id: Date.now().toString(),
      name: inputName
    }

    setFriends(prev => [...prev, newFriend])
    setInputName("")
  }

  const selectedData = friends.filter(f => selectedFriends.includes(f.id))

  const handleSaveDraft = async () => {
    setIsSavingDraft(true)

    try {
      await fetch("/api/bill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title,
          friends: selectedData.map(f => f.name)
        })
      })

      alert("Draft berhasil disimpan!")
    } catch (error) {
      console.error(error)
    } finally {
      setIsSavingDraft(false)
    }
  }

 const handleNext = async () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  console.log("USER:", user)

  if (!user.id) {
    alert("User tidak ditemukan, login ulang")
    return
  }

  const cleanParticipants = selectedData.map(f => f.name)

  if (cleanParticipants.length === 0) {
    alert("Isi minimal 1 participant")
    return
  }

  try {
    const res = await fetch("/api/bill/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title, // 🔥 dari UI
        userId: user.id,
        participants: cleanParticipants, // 🔥 dari selected friends
      }),
    })

    if (!res.ok) {
      const text = await res.text()
      console.error("ERROR API:", text)
      alert("Gagal membuat bill")
      return
    }

    const data = await res.json()

    console.log("SUCCESS:", data)

    router.push(`/bill/${data.id}/input`) // 🔥 BALIK KE FLOW LAMA
  } catch (err) {
    console.error(err)
    alert("Terjadi error")
  }
}

return (
  <div className="max-w-7xl mx-auto space-y-10">

    {/* HEADER */}
    <header>
      <span className="text-outline text-xs uppercase tracking-widest">
        Step 1 of 3
      </span>
      <h2 className="text-3xl md:text-5xl font-black font-headline mt-2">
        Create New Bill
      </h2>
    </header>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

      {/* LEFT */}
      <section className="lg:col-span-7 space-y-8">

        {/* BILL CARD */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 shadow relative overflow-hidden">

          {/* glow */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full"></div>

          <label className="text-sm font-bold uppercase text-outline mb-4 block">
            Bill Information
          </label>

          <input
            className="w-full bg-transparent outline-none text-3xl md:text-5xl font-black"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex items-center gap-2 mt-4 text-outline">
            <Calendar className="w-4 h-4" />
            <span>Today</span>
          </div>
        </div>

        {/* FRIENDS */}
        <div className="bg-surface-container-lowest rounded-2xl p-8 shadow">

          {/* INPUT */}
          <div className="flex flex-col md:flex-row gap-3 mb-8">

            <input
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Add friend..."
              className="flex-1 border border-outline-variant/30 rounded-full px-5 py-3 focus:ring-2 focus:ring-primary/20 outline-none"
            />

            <button
              onClick={addFriend}
              className="bg-primary text-white px-6 py-3 rounded-full font-bold shadow hover:scale-105 active:scale-95 transition"
            >
              Add
            </button>
          </div>

          {/* LIST */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {friends.length === 0 && (
              <p className="text-outline text-sm">Belum ada teman</p>
            )}

            {friends.map((friend) => {
              const isSelected = selectedFriends.includes(friend.id)

              return (
                <button
                  key={friend.id}
                  onClick={() => toggleFriend(friend.id)}
                  className={cn(
                    "flex items-center gap-4 p-4 rounded-2xl transition-all duration-300",
                    isSelected
                      ? "bg-primary text-white shadow-lg"
                      : "bg-surface-container-high hover:shadow-md"
                  )}
                >
                  {/* AVATAR FIX */}
                  <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center text-lg font-bold">
                    {friend.name.charAt(0).toUpperCase()}
                  </div>

                  {/* TEXT */}
                  <div className="flex-1 text-left">
                    <h4 className="font-bold leading-none">
                      {friend.name}
                    </h4>

                    <span className="text-xs opacity-70">
                      {isSelected ? "Selected" : "Tap to add"}
                    </span>
                  </div>

                  {/* ICON */}
                  {isSelected ? (
                    <CheckCircle className="shrink-0" />
                  ) : (
                    <Plus className="shrink-0" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

      </section>

      {/* RIGHT */}
      <section className="lg:col-span-5 sticky top-6">

        <div className="bg-gradient-to-br from-primary to-primary-container text-white rounded-2xl p-8 shadow-2xl space-y-6">

          <h3 className="text-xl font-bold">
            Summary Preview
          </h3>

          <div className="space-y-4">

            <div className="flex justify-between border-b border-white/20 pb-3">
              <span>Bill Title</span>
              <span className="font-bold">{title}</span>
            </div>

            <div className="flex justify-between border-b border-white/20 pb-3">
              <span>Friends</span>
              <span className="font-bold">
                {selectedData.length}
              </span>
            </div>

          </div>

          <button
            onClick={handleNext}
            className="w-full bg-white text-primary font-bold py-4 rounded-full flex justify-center items-center gap-2 hover:scale-[1.02] active:scale-95 transition"
          >
            Next <ArrowRight />
          </button>

        </div>

        {/* TIPS */}
        <div className="mt-6 bg-surface-container-low p-6 rounded-xl flex gap-4">
          <Lightbulb />
          <p className="text-sm">
            Nama bill yang jelas bikin teman kamu lebih cepat ngerti
          </p>
        </div>

      </section>
    </div>
  </div>
)
}