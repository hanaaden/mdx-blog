"use client";

import { useState } from "react";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/admin/create-post/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, tags, body }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`Post created successfully! Slug: ${data.slug}`);
        setTitle("");
        setDescription("");
        setTags("");
        setBody("");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Blog Post</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Tags (comma separated)</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Body (MDX content)</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 h-64"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-blue-600 font-semibold">{message}</p>
      )}
    </div>
  );
}
