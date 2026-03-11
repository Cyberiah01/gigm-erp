"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button, Input, Card } from "@/components/ui"
import { useAuthStore } from "@/stores"
import { Eye, EyeOff, Bus } from "lucide-react"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().optional(),
})

type LoginFormData = z.infer<typeof loginSchema>

const otpSchema = z.object({
  digit1: z.string().length(1),
  digit2: z.string().length(1),
  digit3: z.string().length(1),
  digit4: z.string().length(1),
  digit5: z.string().length(1),
  digit6: z.string().length(1),
})

type OTPFormData = z.infer<typeof otpSchema>

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuthStore()
  const [showPassword, setShowPassword] = React.useState(false)
  const [showOTP, setShowOTP] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [error, setError] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const {
    register: registerOTP,
    handleSubmit: handleOTPSubmit,
    setValue,
    watch,
  } = useForm<OTPFormData>()

  const otpDigits = watch(["digit1", "digit2", "digit3", "digit4", "digit5", "digit6"])

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setError("")

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (data.email === "admin@gigm.com" && data.password === "password") {
        login({
          id: "1",
          email: data.email,
          name: "Admin User",
          role: "admin",
          terminalScope: ["lagos-jibowu", "benin", "abuja"],
          status: "active",
          twoFactorEnabled: true,
        })
        
        if (data.rememberMe) {
          localStorage.setItem("gigm-remember", "true")
        }
        
        setShowOTP(true)
      } else {
        setError("Invalid email or password")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const onOTPSubmit = async (data: OTPFormData) => {
    setIsLoading(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 500))
      router.push("/dashboard")
    } catch {
      setError("Invalid verification code")
    } finally {
      setIsLoading(false)
    }
  }

  const handleOTPInput = (index: number, value: string, e?: React.KeyboardEvent) => {
    setValue(`digit${index + 1}` as keyof OTPFormData, value)
    
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`)
      nextInput?.focus()
    }
  }

  const handleOTPKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`)
      prevInput?.focus()
    }
  }

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-brand-green relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-brand-yellow rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-20 w-20 rounded-2xl bg-white/20 backdrop-blur flex items-center justify-center">
              <Bus className="h-10 w-10" />
            </div>
            <div>
              <h1 className="font-display text-5xl">GIGM</h1>
              <p className="text-brand-green-light/80 text-lg">Transport Management</p>
            </div>
          </div>
          
          <p className="text-xl text-center max-w-md leading-relaxed text-brand-green-light">
            "God is Good Motors" — Nigeria's premier transport company
          </p>
          
          <div className="mt-16 grid grid-cols-3 gap-8 text-center">
            <div>
              <p className="text-3xl font-bold text-brand-yellow">29+</p>
              <p className="text-sm text-brand-green-light">Terminals</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-yellow">500+</p>
              <p className="text-sm text-brand-green-light">Buses</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-brand-yellow">Nigeria</p>
              <p className="text-sm text-brand-green-light">& Ghana</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-bg">
        <AnimatePresence mode="wait">
          {!showOTP ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-md"
            >
              <div className="lg:hidden flex items-center gap-3 mb-8">
                <div className="h-12 w-12 rounded-lg bg-brand-green flex items-center justify-center">
                  <Bus className="h-6 w-6 text-white" />
                </div>
                <span className="font-display text-2xl text-dark">GIGM ERP</span>
              </div>

              <h2 className="text-2xl font-heading font-bold text-dark mb-2">
                Welcome back
              </h2>
              <p className="text-mid mb-8">Enter your credentials to access the ERP system</p>

              {error && (
                <div className="mb-6 p-4 bg-error-light border border-error/20 rounded-lg">
                  <p className="text-sm text-error">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  error={errors.email?.message}
                  {...register("email")}
                />

                <div className="relative">
                  <Input
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    error={errors.password?.message}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-9 text-subtle hover:text-mid"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      {...register("rememberMe")}
                      className="h-4 w-4 rounded border-border text-brand-green focus:ring-brand-green"
                    />
                    <span className="text-sm text-mid">Remember this device</span>
                  </label>
                  <a href="/forgot-password" className="text-sm text-brand-green hover:underline">
                    Forgot password?
                  </a>
                </div>

                <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                  Sign In
                </Button>
              </form>

              <p className="mt-8 text-center text-sm text-subtle">
                Having trouble logging in?{" "}
                <a href="#" className="text-brand-green hover:underline">
                  Contact IT Support
                </a>
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="w-full max-w-md"
            >
              <h2 className="text-2xl font-heading font-bold text-dark mb-2">
                Two-Factor Authentication
              </h2>
              <p className="text-mid mb-8">
                Enter the 6-digit code sent to your device
              </p>

              {error && (
                <div className="mb-6 p-4 bg-error-light border border-error/20 rounded-lg">
                  <p className="text-sm text-error">{error}</p>
                </div>
              )}

              <form onSubmit={handleOTPSubmit(onOTPSubmit)}>
                <div className="flex justify-center gap-3 mb-8">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      className="w-12 h-14 text-center text-xl font-mono border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-green focus:border-transparent"
                      onChange={(e) => handleOTPInput(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      onFocus={(e) => e.target.select()}
                    />
                  ))}
                </div>

                <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                  Verify Code
                </Button>
              </form>

              <p className="mt-6 text-center text-sm text-subtle">
                Didn't receive a code?{" "}
                <button className="text-brand-green hover:underline">
                  Resend code
                </button>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
