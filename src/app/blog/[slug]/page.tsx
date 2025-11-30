import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { serialize } from "next-mdx-remote/serialize";
import rehypeHighlight from "rehype-highlight";
import { mdxComponents } from "@/components/mdxComponents";

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

interface Frontmatter {
  title: string;
  description?: string;
  tags?: string[];
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), "src/posts", `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return <p className="p-6 text-red-500">Post not found</p>;
  }

  const source = fs.readFileSync(filePath, "utf-8");

  const mdxSource = await serialize<Frontmatter>(source, {
    parseFrontmatter: true,
    mdxOptions: { rehypePlugins: [rehypeHighlight] },
  });

  // Type-safe extraction of frontmatter
  const { title, description, tags } = mdxSource.frontmatter;

  const safeTitle = String(title || "Untitled");
  const safeDescription = description ? String(description) : null;
  const tagsArray: string[] = Array.isArray(tags) ? tags.map(String) : [];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{safeTitle}</h1>

      {safeDescription && <p className="mb-4 text-gray-600">{safeDescription}</p>}

      {tagsArray.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {tagsArray.map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <MDXRemote source={mdxSource} components={mdxComponents} />
    </div>
  );
}
