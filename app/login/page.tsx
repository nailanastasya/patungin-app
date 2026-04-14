"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowRight, Smartphone } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async () => {
  const res = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })

  if (!res.ok) {
    alert("Login gagal")
    return
  }

  const user = await res.json()

  localStorage.setItem("user", JSON.stringify(user))

  document.cookie = `userEmail=${encodeURIComponent(user.email)}; path=/; max-age=86400`

  router.push("/dashboard")
}

  return (
    <div className="min-h-screen bg-surface font-body text-on-surface flex flex-col relative overflow-hidden">

      {/* Background */}
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
              onClick={() => router.push("/")}
              className="absolute top-6 left-6 text-outline hover:text-primary transition-colors"
            >
              <ArrowRight className="w-6 h-6 rotate-180" />
            </button>

            {/* HEADER */}
            <div className="mb-12 flex flex-col items-center text-center">
              <h1 className="font-headline font-black italic text-4xl text-primary tracking-tighter mb-2">
                Patungin
              </h1>
              {/* <p className="text-outline font-medium tracking-wide font-label uppercase text-xs">
                The Neon Oasis
              </p> */}
            </div>

            {/* FORM */}
            <div className="space-y-8">

              <div className="flex flex-col space-y-2">
                <label className="font-label text-sm font-semibold text-outline px-1">
                  Email
                </label>
                <input 
                  className="bg-surface-container-low border-0 rounded-lg p-5 text-lg font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                  placeholder="yourname@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex flex-col space-y-2">
                <label className="font-label text-sm font-semibold text-outline px-1">
                  Password
                </label>
                <input 
                  type="password"
                  className="bg-surface-container-low border-0 rounded-lg p-5 text-lg font-medium focus:ring-2 focus:ring-primary/20 focus:bg-white transition-all outline-none"
                  placeholder="••••••••"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* LOGIN BUTTON */}
              <div className="pt-4">
                <button 
                  onClick={handleLogin}
                  className="w-full py-5 px-8 rounded-full bg-gradient-to-r from-primary to-primary-container text-white font-headline font-extrabold text-xl shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
                >
                 Log In
                  <ArrowRight className="w-6 h-6" />
                </button>
              </div>

              {/* OR */}
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-outline-variant opacity-20"></div>
                <span className="mx-4 text-outline text-xs font-bold">
                  ATAU LANJUT DENGAN
                </span>
                <div className="flex-grow border-t border-outline-variant opacity-20"></div>
              </div>

              {/* SOCIAL */}
           <div className="grid grid-cols-2 gap-4">

  {/* GOOGLE */}
  <button className="flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-white border border-outline-variant/15 hover:bg-surface-container-low transition-colors group">
    <img 
      src="https://www.gstatic.com/images/branding/product/1x/googleg_48dp.png"
      className="w-5 h-5 grayscale group-hover:grayscale-0 transition-all"
      alt="Google"
    />
    <span className="font-label font-bold text-sm text-on-surface">
      Google
    </span>
  </button>

  {/* APPLE */}
  <button className="flex items-center justify-center gap-3 py-4 px-6 rounded-full bg-white border border-outline-variant/15 hover:bg-surface-container-low transition-colors group">
    <svg
      className="w-5 h-5 text-black"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M16.365 1.43c0 1.14-.465 2.22-1.24 3.04-.8.85-2.1 1.5-3.28 1.4-.15-1.1.45-2.27 1.2-3.04.82-.88 2.2-1.53 3.32-1.4zm4.5 16.3c-.33.75-.72 1.44-1.2 2.07-.65.9-1.18 1.52-1.6 1.86-.65.55-1.35.83-2.1.85-.55 0-1.22-.16-2-.5-.78-.33-1.5-.5-2.16-.5-.7 0-1.45.17-2.25.5-.8.34-1.45.52-1.95.54-.72.03-1.44-.26-2.14-.88-.45-.4-1-1.04-1.64-1.94-.7-.98-1.27-2.12-1.72-3.4-.48-1.38-.72-2.72-.72-4 0-1.47.32-2.74.95-3.8.5-.85 1.16-1.52 1.98-2 .82-.48 1.7-.73 2.64-.75.6 0 1.38.19 2.33.56.95.38 1.56.56 1.83.56.2 0 .88-.21 2.03-.64 1.1-.4 2.03-.57 2.78-.5 2.03.16 3.56.96 4.6 2.4-1.82 1.1-2.72 2.64-2.7 4.62.02 1.54.58 2.82 1.68 3.84.5.47 1.05.83 1.65 1.08-.14.4-.3.78-.5 1.15z"/>
    </svg>

    <span className="font-label font-bold text-sm text-on-surface">
      Apple
    </span>
  </button>

</div>
              {/* REGISTER */}
              <div className="text-center pt-6">
                <p className="text-outline">
                  Belum punya akun? 
                  <span
                    onClick={() => router.push("/register")}
                    className="text-primary font-bold ml-1 cursor-pointer"
                  >
                    Daftar
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