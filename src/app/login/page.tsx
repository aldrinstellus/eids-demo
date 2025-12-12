'use client'

import { createClient } from '@/lib/supabase/client'
import { useSearchParams } from 'next/navigation'
import { Fingerprint, ScanLine, Lock, ChevronRight, Users } from 'lucide-react'
import { Suspense, useEffect, useState } from 'react'
import { EIDSLogo } from '@/components/brand/eids-logo'
import { demoPersonas, type DemoPersona } from '@/data/demo-personas'

function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated scan line */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent animate-scan"
          style={{ animationDuration: '3s' }}
        />
      </div>

      {/* Grid pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-emerald-500/30" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating data nodes */}
      <div className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-emerald-400/60 animate-pulse" style={{ animationDelay: '0s' }} />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-cyan-400/60 animate-pulse" style={{ animationDelay: '0.5s' }} />
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-emerald-400/40 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-cyan-400/50 animate-pulse" style={{ animationDelay: '1.5s' }} />
      <div className="absolute bottom-1/4 right-1/2 w-2 h-2 rounded-full bg-emerald-400/60 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <line x1="25%" y1="25%" x2="66%" y2="33%" stroke="url(#lineGradient)" strokeWidth="1" className="opacity-30" />
        <line x1="66%" y1="33%" x2="75%" y2="50%" stroke="url(#lineGradient)" strokeWidth="1" className="opacity-30" />
        <line x1="33%" y1="66%" x2="50%" y2="75%" stroke="url(#lineGradient)" strokeWidth="1" className="opacity-30" />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}


// Demo persona card component
function DemoPersonaCard({ persona, onSelect }: { persona: DemoPersona; onSelect: (id: string) => void }) {
  const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/30', text: 'text-amber-400' },
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/30', text: 'text-violet-400' },
    rose: { bg: 'bg-rose-500/10', border: 'border-rose-500/30', text: 'text-rose-400' },
  }
  const colors = colorClasses[persona.color] || colorClasses.emerald

  return (
    <button
      onClick={() => onSelect(persona.id)}
      className={`w-full p-3 rounded-lg ${colors.bg} border ${colors.border} hover:border-opacity-60 transition-all duration-200 text-left group hover:-translate-y-0.5`}
    >
      <div className="flex items-center gap-3">
        <img
          src={persona.avatar}
          alt={persona.name}
          className={`w-8 h-8 rounded-full object-cover ring-2 ring-offset-1 ring-offset-slate-900 ${colors.border.replace('border-', 'ring-')}`}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-white truncate">{persona.name}</p>
          <p className={`text-xs ${colors.text} truncate`}>{persona.role}</p>
        </div>
        <ChevronRight className={`w-4 h-4 ${colors.text} opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all`} />
      </div>
    </button>
  )
}

function LoginContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const redirect = searchParams.get('redirect') || '/'
  const [mounted, setMounted] = useState(false)
  const [showDemoAccess, setShowDemoAccess] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleDemoLogin = (personaId: string) => {
    // Store demo persona in localStorage (for client-side context)
    localStorage.setItem('eids-demo-persona', personaId)
    // Also set cookie (for server-side middleware to read)
    document.cookie = `eids-demo-persona=${personaId}; path=/; max-age=86400; SameSite=Lax`
    // Full page reload to ensure React context re-reads localStorage
    // Using window.location.href instead of router.push to clear cached state
    window.location.href = '/'
  }

  const handleGoogleSignIn = async () => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${redirect}`,
      },
    })
    if (error) {
      console.error('Error signing in:', error)
    }
  }

  return (
    <div className="min-h-screen flex bg-slate-950">
      {/* Left Panel - Data Visualization */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 overflow-hidden">
        <AnimatedGrid />

        {/* Content overlay */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Top - Logo & Hero */}
          <div>
            <div className={`transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
              <div className="flex items-center gap-3">
                <EIDSLogo size="xl" variant="dark" />
              </div>
              <p className="text-xs text-slate-500 tracking-widest uppercase mt-1 ml-[60px]">Secure Access Portal</p>
            </div>

            {/* Hero Headline */}
            <div className={`mt-12 transition-all duration-1000 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight tracking-tight">
                Empowering
                <br />
                <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  VA Healthcare
                </span>
                <br />
                Grant Applications
              </h1>
              <p className="mt-6 text-slate-400 text-lg max-w-md leading-relaxed">
                AI-powered platform streamlining grant management for Defense Health Agency programs.
              </p>

              {/* Stats row */}
              <div className="mt-8 flex items-center gap-8">
                <div>
                  <p className="text-3xl font-bold text-white">2,400<span className="text-emerald-400">+</span></p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Applications Processed</p>
                </div>
                <div className="w-px h-12 bg-slate-700/50" />
                <div>
                  <p className="text-3xl font-bold text-white">94<span className="text-emerald-400">%</span></p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Success Rate</p>
                </div>
                <div className="w-px h-12 bg-slate-700/50" />
                <div>
                  <p className="text-3xl font-bold text-white">$1.2<span className="text-emerald-400">B</span></p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider">Funding Managed</p>
                </div>
              </div>
            </div>
          </div>


          {/* Bottom - Certifications */}
          <div className={`transition-all duration-1000 delay-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-xs text-slate-600 mb-3 uppercase tracking-widest">Compliance Certifications</p>
            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 rounded border border-slate-700/50 bg-slate-800/30 text-xs text-slate-400">HIPAA</div>
              <div className="px-3 py-1.5 rounded border border-slate-700/50 bg-slate-800/30 text-xs text-slate-400">SOC 2</div>
              <div className="px-3 py-1.5 rounded border border-slate-700/50 bg-slate-800/30 text-xs text-slate-400">FedRAMP</div>
              <div className="px-3 py-1.5 rounded border border-slate-700/50 bg-slate-800/30 text-xs text-slate-400">NIST 800-53</div>
            </div>
          </div>
        </div>

        {/* Gradient overlay at edge */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-r from-transparent to-slate-950" />
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 lg:p-12 relative">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-md">
          {/* Mobile Logo */}
          <div className={`lg:hidden flex flex-col items-center mb-10 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <EIDSLogo size="lg" variant="dark" />
            <p className="text-xs text-slate-500 tracking-widest uppercase mt-2">Secure Access Portal</p>
          </div>

          {/* Login Card */}
          <div className={`transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <div className="relative">
              {/* Card glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-emerald-500/20 rounded-2xl blur opacity-50" />

              <div className="relative bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    Welcome Back
                  </h2>
                  <p className="text-slate-400 text-sm">
                    Sign in to access the EIDS platform
                  </p>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <ScanLine className="w-4 h-4" />
                    </div>
                    <span>Authentication failed. Please try again.</span>
                  </div>
                )}

                {/* Demo Access Section - Moved to top */}
                <div className="mb-6">
                  <button
                    onClick={() => setShowDemoAccess(!showDemoAccess)}
                    className="w-full flex items-center justify-center gap-2 text-slate-300 hover:text-white text-sm font-medium transition-colors py-2"
                  >
                    <Users className="w-4 h-4" />
                    <span>Demo Access</span>
                    <ChevronRight className={`w-4 h-4 transition-transform ${showDemoAccess ? 'rotate-90' : ''}`} />
                  </button>

                  {/* Demo Personas */}
                  {showDemoAccess && (
                    <div className="mt-4 space-y-2">
                      <p className="text-xs text-slate-500 text-center mb-3">Select a demo persona to explore the platform</p>
                      {demoPersonas.map((persona) => (
                        <DemoPersonaCard
                          key={persona.id}
                          persona={persona}
                          onSelect={handleDemoLogin}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-700/50" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-4 text-xs text-slate-500 bg-slate-900/80 uppercase tracking-widest">
                      Or sign in with
                    </span>
                  </div>
                </div>

                {/* Google Sign In Button */}
                <button
                  onClick={handleGoogleSignIn}
                  className="group w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/50 hover:border-slate-600/50 text-slate-200 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-0.5"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
                </button>

                {/* Security badges */}
                <div className="flex items-center justify-center gap-6 text-slate-500 mt-6 pt-6 border-t border-slate-700/50">
                  <div className="flex items-center gap-2 text-xs">
                    <Lock className="w-3.5 h-3.5 text-emerald-400/60" />
                    <span>256-bit SSL</span>
                  </div>
                  <div className="w-1 h-1 rounded-full bg-slate-700" />
                  <div className="flex items-center gap-2 text-xs">
                    <Fingerprint className="w-3.5 h-3.5 text-emerald-400/60" />
                    <span>MFA Protected</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className={`mt-8 text-center transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <p className="text-slate-600 text-xs tracking-wide">
              Defense Health Agency - EIDS Data Applications
            </p>
            <p className="text-slate-700 text-xs mt-1 font-mono">
              AOI 4 | HT0038-25-S-C001
            </p>
          </div>

        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes scan {
          0% {
            top: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }
        .animate-scan {
          animation: scan 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex items-center gap-3 text-slate-400">
          <div className="w-5 h-5 border-2 border-emerald-400/30 border-t-emerald-400 rounded-full animate-spin" />
          <span className="text-sm">Initializing secure connection...</span>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
