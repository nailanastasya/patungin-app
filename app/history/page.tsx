import { Sidebar } from "@/components/SideBar"
import { TopBar } from "@/components/TopBar"
import History from "@/components/History"

export default function HistoryPage() {
  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        <TopBar />

        <main className="flex-1 p-6 md:p-10 bg-gray-50">
          <History />
        </main>
      </div>
    </div>
  )
}