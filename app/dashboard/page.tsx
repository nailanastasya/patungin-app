import { prisma } from "@/lib/prisma"
import { Sidebar } from "@/components/SideBar"
import { TopBar } from "@/components/TopBar"
import Dashboard from "@/components/Dashboard"
import { cookies } from "next/headers"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const email = cookieStore.get("userEmail")?.value

  if (!email) {
    return <div>Silakan login dulu</div>
  }

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return <div>User tidak ditemukan</div>
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
            balance: 0,
          }}
          activeBill={null}
          activeSummary={null}
          recentBills={[]}
        />
      </main>
    </div>
  )
}