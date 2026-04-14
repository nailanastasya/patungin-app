import { prisma } from "@/lib/prisma"
import { Sidebar } from "@/components/SideBar"
import { TopBar } from "@/components/TopBar"
import Dashboard from "@/components/Dashboard"

export default async function DashboardPage() {
  const user = await prisma.user.findFirst()

  if (!user) {
    return <div className="p-6">Tidak ada data</div>
  }

  return (
    <div className="flex">
      
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        
        {/* TOPBAR */}
        <TopBar />

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-6 pt-24 md:pt-6">
          <Dashboard
            user={{
              ...user,
              name: user.email, // sementara
              balance: 0
            }}
            activeBill={null}
            activeSummary={null}
            recentBills={[]}
          />
        </main>

      </div>
    </div>
  )
}