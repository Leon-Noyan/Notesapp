'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function CreateNote() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, text }),
      })

      if (res.ok) {
        setTitle('');
        setText('');
        setIsOpen(false);
        router.refresh();
      }
    } catch (error) {
      console.error('Error creating note:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
    <button onClick={() => setIsOpen(true)} className="rounded-xl bg-amber-700 hover:bg-amber-600 p-1.5 m-1 text-white cursor-pointer">Create Note</button>

    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
        <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold">Create Note</h2>
          <form onSubmit={handleCreateNote}>
            <div className="mb-4">
              <label htmlFor="title" className="mb-2 block font-bold">
                Title:
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                required
                placeholder="Enter note title"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="mb-2 block font-bold">
                Text:
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none resize-none"
                placeholder="Enter note text..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-xl bg-amber-700 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 cursor-pointer"
              >
                {loading ? 'Creating...' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
    </>
  )
}
