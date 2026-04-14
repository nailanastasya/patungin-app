import { Sidebar } from "@/components/SideBar"
import { TopBar } from "@/components/TopBar"
import { CreateBill } from "@/components/CreateBill"

export default function Page() {
  return (
    <div className="flex min-h-screen bg-surface">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col md:ml-64">
        
        {/* TOPBAR */}
        <TopBar />

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-8">
          <CreateBill />
        </main>

      </div>
    </div>
  )
}