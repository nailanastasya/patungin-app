"use client"

import React, { useState } from 'react'
import { Home, History, Users, User, Plus, LogOut, Menu } from 'lucide-react'
import { useRouter, usePathname } from "next/navigation"
import { cn } from '@/lib/utlis'

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  const menuItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Home', icon: Home },
    { id: 'history', path: '/history', label: 'History', icon: History },
    { id: 'friends', path: '/dashboard/friends', label: 'Friends', icon: Users },
    { id: 'profile', path: '/dashboard/profile', label: 'Profile', icon: User },
  ]

  const handleLogout = () => {
    const confirmLogout = window.confirm("Yakin mau logout?")
    if (!confirmLogout) return

    localStorage.removeItem("token")
    localStorage.removeItem("user")
    document.cookie = "token=; Max-Age=0; path=/"

    router.push("/login")
  }

  return (
    <>
      {/* MOBILE BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-full shadow"
      >
        <Menu />
      </button>

      {/* OVERLAY */}
      {open && (
        <div 
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR */}
      <aside className={cn(
        "fixed top-0 left-0 h-screen w-64 bg-white dark:bg-slate-900 shadow-xl flex flex-col py-10 z-50 transition-transform",
        open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}>

        {/* LOGO */}
        <div className="px-8 mb-10">
          <h1 className="text-3xl font-black italic text-primary font-headline cursor-pointer">
            Patungin
          </h1>
        </div>

        {/* MENU */}
        <nav className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path

            return (
              <button
                key={item.id}
                onClick={() => router.push(item.path)}
                className={cn(
                  "flex items-center gap-4 px-6 py-3 mx-4 rounded-full transition-all duration-300",
                  isActive
                    ? "bg-blue-500 text-white"
                    : "text-slate-500 hover:text-blue-600 hover:translate-x-2"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-bold">{item.label}</span>
              </button>
            )
          })}

          {/* LOGOUT */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-4 px-6 py-3 mx-4 rounded-full text-slate-500 hover:text-red-500 hover:translate-x-2"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-bold">Logout</span>
          </button>
        </nav>

        {/* NEW SPLIT */}
        <div className="mt-auto px-6">
          <button 
            onClick={() => router.push('/bill/create')}
            className="w-full bg-primary text-white py-3 rounded-full font-bold"
          >
            + New Split
          </button>
        </div>

      </aside>
    </>
  )
}