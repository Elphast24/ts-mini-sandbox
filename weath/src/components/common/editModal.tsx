import React, { useState } from 'react';
import { X, Layers, FileText } from 'lucide-react';

export interface PostData {
  title: string;
  body: string;
}

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: PostData) => void;
  initialData?: PostData;
}

const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData = {
    title: '',
    body: '',
  },
}) => {
  const [formData, setFormData] = useState<PostData>(initialData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 dark:border-zinc-900">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-zinc-50">Edit Post</h2>
            <p className="text-xs text-slate-400 dark:text-zinc-500">Modify properties below to update the raw post text content.</p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-50 hover:text-slate-600 dark:text-zinc-500 dark:hover:bg-zinc-900 dark:hover:text-zinc-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Layout */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title Field */}
          <div>
            <label htmlFor="title" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-zinc-400 mb-1.5 inline-flex items-center gap-1">
              <FileText size={12} /> Post Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter post title"
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100"
              required
            />
          </div>

          {/* Body Content Field */}
          <div>
            <label htmlFor="body" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider dark:text-zinc-400 mb-1.5 inline-flex items-center gap-1">
              <Layers size={12} /> Post Body
            </label>
            <textarea
              id="body"
              name="body"
              rows={4}
              value={formData.body}
              onChange={handleChange}
              placeholder="Enter complete post body description text..."
              className="w-full px-3 py-2 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 resize-none"
              required
            />
          </div>

          {/* Action Row */}
          <div className="flex justify-end gap-2 border-t border-slate-50 pt-4 mt-6 dark:border-zinc-900">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-500 shadow-sm shadow-indigo-200 transition-colors dark:shadow-none"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;
