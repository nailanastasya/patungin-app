"use client"

import { useEffect, useState } from "react"
import { Sidebar } from "@/components/SideBar"
import { TopBar } from "@/components/TopBar"
import Dashboard from "@/components/Dashboard"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  if (!user) {
    return <div>Silakan login dulu</div>
  }

  return (
    <div>
      <Sidebar />

      <div className="ml-64">
        <TopBar />
      </div>

      <main className="ml-64 pt-20 p-6">
        <Dashboard
          user={{
            ...user,
            name: user.email,
            balance: 0
          }}
          activeBill={null}
          activeSummary={null}
          recentBills={[]}
        />
      </main>
    </div>
  )
}