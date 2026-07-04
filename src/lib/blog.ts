import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * File-based MDX blog. Add a post by dropping an .mdx file into
 * src/content/blog with the frontmatter below — no code changes.
 *
 * ---
 * title: "..."
 * description: "..."
 * date: "2026-07-01"
 * niche: "garage-door"   # optional; links the post to an industry page
 * ---
 */

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  niche?: string;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
}

function parsePost(filename: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const words = content.split(/\s+/).length;
  return {
    slug: filename.replace(/\.mdx?$/, ""),
    title: String(data.title ?? "Untitled"),
    description: String(data.description ?? ""),
    date: String(data.date ?? ""),
    niche: data.niche ? String(data.niche) : undefined,
    readingMinutes: Math.max(1, Math.round(words / 220)),
    content,
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map(parsePost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
