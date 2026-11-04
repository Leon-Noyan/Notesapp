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
    <button onClick={() => setIsOpen(true)} className="rounded-xl bg-amber-800 p-1.5 m-1 text-white cursor-pointer">Create</button>

    {isOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 className="mb-4 text-lg font-semibold">Create Note</h2>
          <form onSubmit={handleCreateNote}>
            <div className="mb-4">
              <label htmlFor="title" className="mb-2 block font-medium">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                required
                placeholder="Enter note title"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="text" className="mb-2 block font-medium">
                Text
              </label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                required
                placeholder="Enter note text..."
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded bg-blue-500 px-4 py-2 text-sm font-medium text-white hover:bg-blue-600"
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
