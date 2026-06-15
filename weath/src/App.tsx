import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { CircleFadingArrowUpIcon } from "lucide-react"
import { BrowserRouter } from "react-router-dom"
import { deletePost, getPost, editPost } from "./api"
import { TaskCard } from "./components/common/taskCard"

interface PostItem {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function App() {
  const [posts, setPosts] = useState<PostItem[]>([])

  useEffect(() => {
    getPost().then((data) => {
      setPosts(data);
    })
  }, [])

  async function handleDelete(id: number) {
    await deletePost(id);
    setPosts((prev) => prev.filter((item) => item.id !== id));
  }

  async function handleEdit(id: number, title: string, body: string, userId: number) {
    await editPost(id, title, body, userId);
    setPosts((prev) => prev.map((item) => item.id === id ? { ...item, title, body } : item));
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen w-screen bg-slate-50/50 p-6 dark:bg-zinc-900/20 sm:p-10">
        <div className="mx-auto max-w-7xl space-y-8">
          
          {/* Dashboard Modern Title Block */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 dark:border-zinc-900">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400">
                <span className="text-xs font-bold uppercase tracking-wider">Content Pipeline</span>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-zinc-50">Post Tracker</h1>
              <p className="text-sm text-slate-500 dark:text-zinc-400">Track and manage your publication posts feed with ease.</p>
            </div>
            
            <Button variant="outline" size="icon" className="rounded-xl shadow-sm">
              <CircleFadingArrowUpIcon className="h-4 w-4 text-slate-500" />
            </Button>
          </div>

          {/* Adaptive Clean Grid Column Layout */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <TaskCard
                key={post.id}
                userId={post.userId}
                id={post.id}
                title={post.title}
                body={post.body}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />
            ))}
          </div>

        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;
