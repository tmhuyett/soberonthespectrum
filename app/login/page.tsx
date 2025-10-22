// 'use client'

// import { useState } from 'react'
// import { supabase } from '@/lib/supabaseClient'
// import { useRouter } from 'next/navigation'

// export default function LoginPage() {
//   const router = useRouter()
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [error, setError] = useState<string | null>(null)

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)

//     const { error } = await supabase.auth.signInWithPassword({ email, password })
//     if (error) return setError(error.message)

//     router.push('/forum')
//   }

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setError(null)

//     const { error } = await supabase.auth.signUp({ email, password })
//     if (error) return setError(error.message)

//     router.push('/forum')
//   }

//   return (
//     <div className="max-w-md mx-auto mt-20 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
//       <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Login</h1>

//       <form className="space-y-4" onSubmit={handleLogin}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           className="w-full px-4 py-2 border rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100"
//         />

//         {error && <p className="text-red-500 text-sm">{error}</p>}

//         <div className="flex space-x-3">
//           <button type="submit" className="flex-1 bg-blue-600 text-white rounded-md py-2">
//             Login
//           </button>
//           <button
//             onClick={handleSignup}
//             className="flex-1 bg-gray-800 text-white rounded-md py-2"
//           >
//             Sign Up
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }

'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export default function ForumLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)

    if (error) setError(error.message)
    else window.location.href = '/forum'
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Insert username into profiles
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([{ id: data.user.id, username }])

      if (profileError) {
        setError(profileError.message)
      } else {
        alert('Check your email to confirm your signup.')
      }
    }

    setLoading(false)
  }

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center">
      <div className="w-full max-w-sm rounded-md bg-gray-50 p-6 shadow dark:bg-gray-900/60">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          {mode === 'login' ? 'Login' : 'Create Account'}
        </h2>

        <form className="space-y-4" onSubmit={mode === 'login' ? handleLogin : handleSignup}>
          {mode === 'signup' && (
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 dark:bg-gray-800 dark:text-gray-100"
              required
            />
          )}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 dark:bg-gray-800 dark:text-gray-100"
            required
          />

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 dark:bg-gray-800 dark:text-gray-100"
            required
          />

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-blue-600 py-2 text-white hover:bg-blue-700"
          >
            {loading
              ? mode === 'login'
                ? 'Logging in...'
                : 'Creating account...'
              : mode === 'login'
                ? 'Login'
                : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          {mode === 'login' ? (
            <>
              Don’t have an account?{' '}
              <button
                className="text-primary-500 hover:underline"
                onClick={() => setMode('signup')}
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button className="text-primary-500 hover:underline" onClick={() => setMode('login')}>
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
