// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams } from 'next/navigation'
// import { supabase } from '@/lib/supabaseClient'

// export default function ThreadPage() {
//   const { id } = useParams()
//   const [thread, setThread] = useState<any>(null)
//   const [comments, setComments] = useState<any[]>([])
//   const [newComment, setNewComment] = useState('')
//   const [loading, setLoading] = useState(false)

//   useEffect(() => {
//     const fetchData = async () => {
//       const { data: threadData } = await supabase
//         .from('threads')
//         .select('*')
//         .eq('id', id)
//         .single()

//       const { data: commentData } = await supabase
//         .from('comments')
//         .select('*')
//         .eq('thread_id', id)
//         .order('created_at', { ascending: true })

//       setThread(threadData)
//       setComments(commentData || [])
//     }

//     fetchData()
//   }, [id])

//   const handleComment = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!newComment.trim()) return

//     const { data: user } = await supabase.auth.getUser()
//     if (!user.user) {
//       alert('You must be logged in to comment.')
//       return
//     }

//     setLoading(true)
//     const { error } = await supabase.from('comments').insert([
//       {
//         thread_id: id,
//         content: newComment,
//         author_id: user.user.id,
//         author_name: user.user.email,
//       },
//     ])
//     setLoading(false)

//     if (!error) {
//       setNewComment('')
//       window.location.reload()
//     }
//   }

//   if (!thread) return <p className="p-6 text-gray-400">Loading...</p>

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-3 text-gray-100">{thread.title}</h1>
//       <p className="text-gray-300 mb-6">{thread.content}</p>

//       <h2 className="text-xl font-semibold mb-3 text-gray-200">Comments</h2>
//       <ul className="space-y-4 mb-6">
//         {comments.map((c) => (
//           <li key={c.id} className="border-b border-gray-700 pb-3">
//             <p className="text-gray-100">{c.content}</p>
//             <p className="text-xs text-gray-500 mt-1">
//               by {c.author_name} on {new Date(c.created_at).toLocaleString()}
//             </p>
//           </li>
//         ))}
//       </ul>

//       <form onSubmit={handleComment} className="space-y-3">
//         <textarea
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write a comment..."
//           rows={3}
//           className="w-full rounded-md border border-gray-600 bg-gray-800 text-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <button
//           type="submit"
//           disabled={loading}
//           className="rounded-md bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 transition"
//         >
//           {loading ? 'Posting...' : 'Post Comment'}
//         </button>
//       </form>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ThreadPage() {
  const { id } = useParams()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [thread, setThread] = useState<any>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [comments, setComments] = useState<any[]>([])
  const [newComment, setNewComment] = useState('')
  const [loading, setLoading] = useState(false)

  // Fetch thread + comments
  useEffect(() => {
    const fetchData = async () => {
      // Fetch the main thread
      const { data: threadData } = await supabase.from('threads').select('*').eq('id', id).single()

      // Fetch associated comments with author names
      const { data: commentData } = await supabase
        .from('comments')
        .select('*')
        .eq('thread_id', id)
        .order('created_at', { ascending: true })

      setThread(threadData)
      setComments(commentData || [])
    }

    fetchData()
  }, [id])

  // Post new comment
  const handleComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newComment.trim()) return

    const { data: user } = await supabase.auth.getUser()
    if (!user.user) {
      alert('You must be logged in to comment.')
      return
    }

    // Get username from profiles
    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', user.user.id)
      .single()

    const username = profile?.username || user.user.email || 'Anonymous'

    setLoading(true)
    const { error } = await supabase.from('comments').insert([
      {
        thread_id: id,
        content: newComment,
        author_id: user.user.id,
        author_name: username,
      },
    ])
    setLoading(false)

    if (!error) {
      setNewComment('')
      // Re-fetch comments instantly
      const { data: updatedComments } = await supabase
        .from('comments')
        .select('*')
        .eq('thread_id', id)
        .order('created_at', { ascending: true })

      setComments(updatedComments || [])
    }
  }

  if (!thread) return <p className="p-6 text-center text-gray-400">Loading thread...</p>

  return (
    <div className="mx-auto max-w-3xl p-6">
      {/* THREAD HEADER */}
      <h1 className="mb-2 text-3xl font-bold text-gray-100">{thread.title}</h1>
      <p className="mb-6 text-sm text-gray-500">
        Posted by <span className="font-semibold text-gray-300">{thread.author_name}</span> •{' '}
        <time dateTime={thread.created_at}>{new Date(thread.created_at).toLocaleString()}</time> •{' '}
        {comments.length} {comments.length === 1 ? 'reply' : 'replies'}
      </p>

      {/* THREAD CONTENT */}
      <div className="mb-10 rounded-md border border-gray-700 bg-gray-900/60 p-4 text-gray-200">
        {thread.content}
      </div>

      {/* COMMENTS */}
      <h2 className="mb-3 text-xl font-semibold text-gray-200">Comments ({comments.length})</h2>

      {comments.length === 0 ? (
        <p className="mb-6 text-gray-500">No comments yet. Be the first!</p>
      ) : (
        <ul className="mb-6 space-y-4">
          {comments.map((c) => (
            <li key={c.id} className="border-b border-gray-700 pb-3 last:border-none">
              <p className="text-gray-100">{c.content}</p>
              <p className="mt-1 text-xs text-gray-500">
                by <span className="font-medium text-gray-300">{c.author_name}</span> •{' '}
                <time dateTime={c.created_at}>{new Date(c.created_at).toLocaleString()}</time>
              </p>
            </li>
          ))}
        </ul>
      )}

      {/* COMMENT FORM */}
      <form onSubmit={handleComment} className="space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          rows={3}
          className="w-full rounded-md border border-gray-600 bg-gray-800 px-3 py-2 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition hover:bg-blue-700"
        >
          {loading ? 'Posting...' : 'Post Comment'}
        </button>
      </form>
    </div>
  )
}
