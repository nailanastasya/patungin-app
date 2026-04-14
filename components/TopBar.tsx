"use client"

import React from 'react'
import { Search, Bell } from 'lucide-react'

export function TopBar() {
  return (
    <header className="w-full sticky top-0 z-40 bg-cyan-50/70 backdrop-blur-xl flex items-center justify-between px-4 md:px-8 h-20 shadow-[0px_24px_48px_rgba(0,52,64,0.06)]">

      {/* LEFT */}
      <div className="flex items-center gap-4 flex-1 ml-12 md:ml-0">
        
        {/* SEARCH */}
        <div className="relative w-full max-w-md md:max-w-xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-5 h-5" />
          
          <input
            type="text"
            placeholder="Search bills or friends..."
            className="w-full bg-surface-container-low rounded-full pl-12 pr-6 py-3 text-sm focus:ring-2 focus:ring-primary/20 outline-none"
          />
        </div>

      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 md:gap-6">

        <button className="text-blue-600 p-2 rounded-full hover:bg-blue-50 transition relative">
          <Bell className="w-6 h-6" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-secondary rounded-full"></span>
        </button>

        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container shadow-sm">
          <img
            alt="User profile avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjFp3G-8U7aCRFZqENvXq4kGh9WtC-53_5KorJZ2zZYqVHfOr6pnl9x5dPfKjrdz_voZ4KaguAoyJEBGcWRlX0zIbSptcv4GuDp4ZN6fRMxKz4v9iyoBB90NjOtDNnC9pndFbET63G3xTxwG6HxP5GQruBcqjvQBJNDajdGIw4oOWhseTmuc_kUcdhy7od6hHU5x_p41AXi3Bu7-OZaJMvxTk-fZ4K5M6GkfH-YdQOo6TGt09SeEJGpJxY4bR9JIp1pwr7_3QvZWio"
          />
        </div>

      </div>
    </header>
  )
}