import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { title, description, tags, body } = data;

    if (!title || !body) {
      return NextResponse.json(
        { error: "Title and body are required" },
        { status: 400 }
      );
    }

    const slug = title.toLowerCase().replace(/\s+/g, "-");
    const filePath = path.join(process.cwd(), "src/posts", `${slug}.mdx`);

    // Read template
    const templatePath = path.join(process.cwd(), "src/posts/template.mdx");
    let template = fs.readFileSync(templatePath, "utf-8");

    // Replace placeholders safely
    template = template
      .replace(/{{title}}/g, title.replace(/"/g, '\\"'))
      .replace(/{{description}}/g, (description || "").replace(/"/g, '\\"'))
      .replace(
        /{{tags}}/g,
        tags
          ?.split(",")
          .map((t: string) => `"${t.trim()}"`)
          .join(",") || ""
      )
      .replace(/{{body}}/g, body.trim());

    fs.writeFileSync(filePath, template);

    return NextResponse.json({ message: "Post created", slug });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
