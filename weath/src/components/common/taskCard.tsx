import { useState } from 'react';
import { Layers, Trash2, ArrowUpRight, Edit3 } from 'lucide-react';
import EditModal from './editModal';
import type { PostData } from './editModal';

interface TaskCardProps {
  userId: number;
  id: number;
  title: string;
  body: string;
  onDelete?: (id: number) => void;
  onEdit?: (id: number, title: string, body: string, userId: number) => void;
}

export const TaskCard = ({ userId, id, title, body, onDelete, onEdit }: TaskCardProps) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditSave = (updatedPostData: PostData) => {
    onEdit?.(id, updatedPostData.title, updatedPostData.body, userId);
  };

  const initialPostDetails: PostData = {
    title: title,
    body: body
  };

  return (
    <div 
      className="group relative flex flex-col justify-between gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_2px_8px_-3px_rgba(0,0,0,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-slate-200 hover:shadow-[0_12px_24px_-10px_rgba(0,0,0,0.08)] dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-zinc-700"
      data-post-id={id}
    >
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] font-semibold tracking-wider text-slate-400 uppercase dark:text-zinc-500">
            Post #{id}
          </span>
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-50 px-2 py-0.5 font-mono text-[10px] font-medium text-slate-500 dark:bg-zinc-900 dark:text-zinc-400">
            <Layers className="h-3 w-3" />
            User: {userId}
          </span>
        </div>

        <h3 className="text-base font-semibold tracking-tight text-slate-800 dark:text-zinc-100 line-clamp-2 first-letter:uppercase">
          {title}
        </h3>
        <p className="text-sm leading-relaxed text-slate-500 dark:text-zinc-400 line-clamp-3">
          {body}
        </p>
      </div>

      <div className="flex items-center justify-between border-t border-slate-50 pt-3 dark:border-zinc-900">
        <a
          href={`/posts/${id}`}
          className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >
          <span>View details</span>
          <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
        </a>

        {/* Action Button Set */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsEditModalOpen(true)}
            aria-label={`Edit post ${id}`}
            className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-all duration-200 hover:bg-indigo-50 hover:text-indigo-600 group-hover:opacity-100 dark:text-zinc-500 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400"
          >
            <Edit3 className="h-4 w-4" />
          </button>
          
          <button
            onClick={() => onDelete?.(id)}
            aria-label={`Delete post ${id}`}
            className="rounded-lg p-1.5 text-slate-400 opacity-0 transition-all duration-200 hover:bg-rose-50 hover:text-rose-600 group-hover:opacity-100 dark:text-zinc-500 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditSave}
        initialData={initialPostDetails}
      />
    </div>
  );
};
