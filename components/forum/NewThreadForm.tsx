'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

interface NewThreadFormProps {
  onSuccess?: () => void
}

export default function NewThreadForm({ onSuccess }: NewThreadFormProps) {
  const [newThread, setNewThread] = useState('')
  const [newContent, setNewContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handlePost = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newThread.trim() || !newContent.trim()) return
    setLoading(true)
    setError('')

    const { data: authData } = await supabase.auth.getUser()
    if (!authData.user) {
      setError('You must be logged in to post.')
      setLoading(false)
      return
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('username')
      .eq('id', authData.user.id)
      .single()

    const username = profile?.username || authData.user.email || 'Anonymous'

    const { error: insertError } = await supabase.from('threads').insert([
      {
        title: newThread,
        content: newContent,
        author_id: authData.user.id,
        author_name: username,
      },
    ])

    setLoading(false)

    if (insertError) {
      setError(insertError.message)
    } else {
      setNewThread('')
      setNewContent('')
      alert('Thread created successfully!')
      if (onSuccess) onSuccess()
    }
  }

  return (
    <div className="space-y-6 rounded-sm bg-gray-50 px-6 py-4 shadow-md dark:bg-gray-900/70">
      <h3 className="text-primary-500 mb-3 font-bold uppercase">Make a Post</h3>
      <form onSubmit={handlePost} className="space-y-3">
        <input
          type="text"
          value={newThread}
          onChange={(e) => setNewThread(e.target.value)}
          placeholder="Title"
          className="focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 focus:ring-2 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
        />
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Write your question or message..."
          rows={5}
          className="focus:ring-primary-500 w-full rounded-md border border-gray-300 bg-gray-100 px-3 py-2 text-gray-900 focus:ring-2 focus:outline-none dark:bg-gray-800 dark:text-gray-100"
        />
        {error && <p className="text-sm text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-blue-600 py-2 text-sm text-white transition hover:bg-blue-700"
        >
          {loading ? 'Posting...' : 'Post Thread'}
        </button>
      </form>
    </div>
  )
}
