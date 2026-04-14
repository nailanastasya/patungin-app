"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRegister = async () => {
    if (!email || !password) {
      alert("Email & password wajib diisi")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        alert("Register gagal")
        return
      }

      alert("Berhasil daftar!")
      router.push("/login")

    } catch (err) {
      console.error(err)
      alert("Server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface flex flex-col relative overflow-hidden">

      {/* BACKGROUND (SAMA KAYAK LOGIN) */}
      <div className="absolute top-[-10%] right-[-5%] w-[40rem] h-[40rem] bg-surface-container rounded-full blur-[120px] opacity-60 z-0"></div>
      <div className="absolute bottom-[-10%] left-[-5%] w-[35rem] h-[35rem] bg-secondary-container/30 rounded-full blur-[100px] opacity-40 z-0"></div>

      <main className="flex-grow flex items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          <div className="bg-surface-container-lowest rounded-xl p-10 md:p-14 shadow-[0px_24px_48px_rgba(0,52,64,0.06)] relative overflow-hidden">

            {/* BACK BUTTON */}
            <button 
              onClick={() => router.push("/login")}
              className="absolute top-6 left-6 text-outline hover:text-primary transition-colors"
            >
              <ArrowRight className="w-6 h-6 rotate-180" />
            </button>

            {/* HEADER */}
            <div className="mb-12 flex flex-col items-center text-center">
              <h1 className="font-headline font-black italic text-4xl text-primary tracking-tighter mb-2">
                Patungin
              </h1>

              <p className="text-outline text-sm">
                Create account to split bill with your friends 🚀
              </p>
            </div>

            {/* FORM */}
            <div className="space-y-8">

              {/* EMAIL */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-outline px-1">
                  Email
                </label>
                <input 
                  className="bg-surface-container-low border-0 rounded-lg p-5 text-lg font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                  placeholder="yourname@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* PASSWORD */}
              <div className="flex flex-col space-y-2">
                <label className="text-sm font-semibold text-outline px-1">
                  Password
                </label>
                <input 
                  type="password"
                  className="bg-surface-container-low border-0 rounded-lg p-5 text-lg font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* REGISTER BUTTON */}
              <div className="pt-4">
                <button 
                  onClick={handleRegister}
                  disabled={loading}
                  className="w-full py-5 px-8 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-headline font-extrabold text-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                  {loading ? "Loading..." : "Sign In"}
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>

              {/* OR */}
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-outline-variant opacity-20"></div>
                <span className="mx-4 text-outline text-xs font-bold">
                  OR
                </span>
                <div className="flex-grow border-t border-outline-variant opacity-20"></div>
              </div>

              {/* SOCIAL (UI ONLY) */}
              <div className="grid grid-cols-2 gap-4">

                <button className="flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-white border hover:bg-surface-container-low transition">
                  <img 
                    src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
                    className="w-5 h-5"
                  />
                  Google
                </button>

                <button className="flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-white border hover:bg-surface-container-low transition">
                  Apple
                </button>

              </div>

              {/* LOGIN */}
              <div className="text-center pt-6">
                <p className="text-outline">
                  Already have an account? 
                  <span
                    onClick={() => router.push("/login")}
                    className="text-primary font-bold ml-1 cursor-pointer"
                  >
                    Login
                  </span>
                </p>
              </div>

            </div>

          </div>
        </motion.div>
      </main>
    </div>
  )
}