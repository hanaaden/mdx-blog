// src/app/blog/page.tsx
import fs from "fs";
import path from "path";
import Link from "next/link";

export default function BlogList() {
  const postsDir = path.join(process.cwd(), "src/posts");
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx"));
  const slugs = files.map((f) => f.replace(/\.mdx$/, ""));

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Blog</h1>
      <ul className="space-y-2">
        {slugs.map((slug) => (
          <li key={slug}>
            <Link
              href={`/blog/${slug}`}
              className="text-blue-600 hover:underline"
            >
              {slug.replace(/-/g, " ")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
