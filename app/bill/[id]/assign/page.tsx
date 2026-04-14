import { Sidebar } from "@/components/SideBar"
import { TopBar } from "@/components/TopBar"
import AssignItems from "@/components/AssignItems"

export default function Page() {
  return (
    <div className="flex">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 flex flex-col min-h-screen md:ml-64">
        
        {/* TOPBAR */}
        <TopBar />

        {/* CONTENT */}
        <main className="flex-1 p-4 md:p-6 pt-24 md:pt-6">
          <AssignItems />
        </main>

      </div>
    </div>
  )
}