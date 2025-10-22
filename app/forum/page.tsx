import { supabase } from '@/lib/supabaseClient'
import ForumLayoutMinimal from '@/layouts/ForumLayoutMinimal'

export default async function ForumPage() {
  const { data: threads, error } = await supabase
    .from('threads')
    .select('*')
    .order('created_at', { ascending: false })

  return <ForumLayoutMinimal threads={threads || []} />
}
