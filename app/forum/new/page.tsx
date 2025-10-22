'use client'

import NewThreadForm from '@/components/forum/NewThreadForm'
import Link from '@/components/Link'

export default function NewThreadPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-8">
      <div className="mb-6">
        <Link href="/forum" className="text-blue-500 hover:underline">
          ← Back to Forum
        </Link>
      </div>

      <NewThreadForm onSuccess={() => window.location.replace('/forum')} />
    </div>
  )
}
