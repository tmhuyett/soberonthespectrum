// 'use client'

// import { useState } from 'react'
// import Link from '@/components/Link'
// import { supabase } from '@/lib/supabaseClient'

// interface Thread {
//   id: string
//   title: string
//   content: string
//   author_id: string
//   author_name: string
//   created_at: string
//   replies?: number
// }

// interface ForumLayoutProps {
//   threads: Thread[]
//   title?: string
// }

// export default function ForumLayoutMinimal({
//   threads,
//   title = 'Community Forum',
// }: ForumLayoutProps) {
//   const [newThread, setNewThread] = useState('')
//   const [newContent, setNewContent] = useState('')
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState('')

//   const handlePost = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!newThread.trim() || !newContent.trim()) return
//     setLoading(true)
//     setError('')

//     // Get logged-in user
//     const { data: authData } = await supabase.auth.getUser()
//     if (!authData.user) {
//       setError('You must be logged in to post.')
//       setLoading(false)
//       return
//     }

//     // Fetch username from profiles
//     const { data: profile } = await supabase
//       .from('profiles')
//       .select('username')
//       .eq('id', authData.user.id)
//       .single()

//     const username = profile?.username || authData.user.email || 'Anonymous'

//     // Insert thread into DB
//     const { error: insertError } = await supabase.from('threads').insert([
//       {
//         title: newThread,
//         content: newContent,
//         author_id: authData.user.id,
//         author_name: username,
//       },
//     ])

//     setLoading(false)

//     if (insertError) {
//       setError(insertError.message)
//     } else {
//       setNewThread('')
//       setNewContent('')
//       alert('Thread created successfully!')
//       window.location.reload()
//     }
//   }

//   return (
//     <div className="pt-6 pb-6">
//       <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
//         {title}
//       </h1>

//       <div className="flex sm:space-x-24 mt-6">
//         {/* LEFT COLUMN — Create Thread */}
//         <div className="hidden h-full max-h-screen max-w-[320px] min-w-[320px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
//           <div className="px-6 py-4 space-y-6">
//             <div>
//               <h3 className="text-primary-500 font-bold uppercase mb-3">
//                 Make a Post
//               </h3>
//               <form onSubmit={handlePost} className="space-y-3">
//                 <input
//                   type="text"
//                   value={newThread}
//                   onChange={(e) => setNewThread(e.target.value)}
//                   placeholder="Title"
//                   className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-100"
//                 />
//                 <textarea
//                   value={newContent}
//                   onChange={(e) => setNewContent(e.target.value)}
//                   placeholder="Write your question or message..."
//                   rows={5}
//                   className="w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-800 dark:text-gray-100"
//                 />
//                 {error && <p className="text-sm text-red-500">{error}</p>}
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="w-full rounded-md bg-blue-600 text-white py-2 text-sm hover:bg-blue-700 transition"
//                 >
//                   {loading ? 'Posting...' : 'Post Thread'}
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>

//         {/* RIGHT COLUMN — Recent Threads */}
//         <div className="flex-1">
//           <h3 className="text-xl font-semibold mb-5 text-gray-900 dark:text-gray-100">
//             Recent Threads
//           </h3>

//           <ul>
//             {threads.length === 0 && (
//               <p className="text-gray-500 dark:text-gray-400">No threads yet.</p>
//             )}
//             {threads.map((thread) => (
//               <li
//                 key={thread.id}
//                 className="py-5 border-b border-gray-200 dark:border-gray-700 last:border-none"
//               >
//                 <article className="flex flex-col space-y-1">
//                   <h2 className="text-lg font-bold tracking-tight">
//                     <Link
//                       href={`/forum/thread/${thread.id}`}
//                       className="text-gray-900 dark:text-gray-100 hover:text-primary-500 dark:hover:text-primary-400"
//                     >
//                       {thread.title}
//                     </Link>
//                   </h2>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">
//                     by {thread.author_name || 'Anonymous'} •{' '}
//                     {thread.replies ?? 0} replies •{' '}
//                     <time dateTime={thread.created_at}>
//                       {new Date(thread.created_at).toLocaleDateString()}
//                     </time>
//                   </p>
//                 </article>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import Link from '@/components/Link'
import NewThreadForm from '@/components/forum/NewThreadForm'

interface Thread {
  id: string
  title: string
  content: string
  author_id: string
  author_name: string
  created_at: string
  replies?: number
}

interface ForumLayoutProps {
  threads: Thread[]
  title?: string
}

export default function ForumLayoutMinimal({
  threads,
  title = 'Community Forum',
}: ForumLayoutProps) {
  return (
    <div className="pt-6 pb-6">
      <h1 className="text-3xl leading-9 font-extrabold tracking-tight text-gray-900 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 dark:text-gray-100">
        {title}
      </h1>

      <div className="mt-6 flex sm:space-x-24">
        {/* LEFT COLUMN — Create Thread (desktop only) */}
        <div className="hidden h-full max-h-screen max-w-[320px] min-w-[320px] flex-wrap overflow-auto rounded-sm bg-gray-50 pt-5 shadow-md sm:flex dark:bg-gray-900/70 dark:shadow-gray-800/40">
          <NewThreadForm onSuccess={() => window.location.reload()} />
        </div>

        {/* RIGHT COLUMN — Recent Threads */}
        <div className="flex-1">
          <h3 className="mb-5 text-xl font-semibold text-gray-900 dark:text-gray-100">
            Recent Threads
          </h3>

          <ul>
            {threads.length === 0 && (
              <p className="text-gray-500 dark:text-gray-400">No threads yet.</p>
            )}
            {threads.map((thread) => (
              <li
                key={thread.id}
                className="border-b border-gray-200 py-5 last:border-none dark:border-gray-700"
              >
                <article className="flex flex-col space-y-1">
                  <h2 className="text-lg font-bold tracking-tight">
                    <Link
                      href={`/forum/thread/${thread.id}`}
                      className="hover:text-primary-500 dark:hover:text-primary-400 text-gray-900 dark:text-gray-100"
                    >
                      {thread.title}
                    </Link>
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    by {thread.author_name || 'Anonymous'} • {thread.replies ?? 0} replies •{' '}
                    <time dateTime={thread.created_at}>
                      {new Date(thread.created_at).toLocaleDateString()}
                    </time>
                  </p>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* MOBILE — Floating Post Button */}
      <div className="fixed right-6 bottom-6 sm:hidden">
        <Link
          href="/forum/new"
          className="rounded-full bg-blue-600 px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700"
        >
          + Post
        </Link>
      </div>
    </div>
  )
}
