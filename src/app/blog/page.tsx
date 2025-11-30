import fs from "fs";
import path from "path";
import Link from "next/link";

export default function BlogList() {
  const postsDir = path.join(process.cwd(), "src/posts");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  const slugs = files
    .map((f) => f.replace(/\.mdx$/, ""))
    .reverse(); // Show newest first

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Blog Posts
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {slugs.map((slug) => (
          <div
            key={slug}
            className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-2xl font-semibold mb-2 text-gray-900">
              {slug.replace(/-/g, " ")}
            </h2>
            <p className="text-sm text-gray-500 mb-4">Slug: {slug}</p>

            <Link
              href={`/blog/${slug}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Read Post
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
