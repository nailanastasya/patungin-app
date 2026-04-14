"use client"

import React from 'react'
import { Home, History, Users, User, Plus, LogOut } from 'lucide-react'
import { useRouter, usePathname } from "next/navigation"
import { cn } from '@/lib/utlis'

export function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const menuItems = [
    { id: 'dashboard', path: '/dashboard', label: 'Home', icon: Home },
    { id: 'history', path: '/dashboard/history', label: 'History', icon: History },
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
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white dark:bg-slate-900 rounded-r-xl shadow-xl flex flex-col py-10 z-50">

      {/* LOGO */}
      <div className="px-8 mb-10">
        <h1 className="text-4xl font-black italic text-primary font-headline cursor-pointer">
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
                "flex items-center gap-4 px-6 py-4 mx-4 rounded-full transition-all duration-300 group",
                isActive
                  ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-200"
                  : "text-slate-500 hover:text-blue-600 hover:translate-x-2"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
              <span className="font-headline font-bold">{item.label}</span>
            </button>
            
          )
        })}
        <button
          onClick={handleLogout}
          className="flex items-center gap-4 px-6 py-4 mx-4 rounded-full transition-all duration-300 text-slate-500 hover:text-red-500 hover:translate-x-2"
        >
          <LogOut className="w-6 h-6" />
          <span className="font-headline font-bold">Logout</span>
        </button>
      </nav>

      {/* BOTTOM SECTION */}
      <div className="mt-auto flex flex-col gap-2">

        {/* LOGOUT (SAMA KAYAK MENU) */}
        

        {/* NEW SPLIT */}
        <div className="px-8 mt-2">
          <button 
            onClick={() => router.push('/bill/create')}
            className="w-full bg-gradient-to-br from-primary to-primary-container text-white font-bold py-4 rounded-full shadow-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Split
          </button>
        </div>

      </div>
    </aside>
  )
}