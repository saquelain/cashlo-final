const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5002/api/v1";

export interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: BlogCategory;
  coverImage?: string | null;
  tags: string[];
  readTime?: string | null;
  content?: string;
  faqs?: { question: string; answer: string }[];
  faqsTitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  isPublished: boolean;
  publishedAt?: string | null;
  createdBy?: { name: string };
  relatedPosts?: { slug: string; title: string; coverImage?: string | null }[];
  updatedAt?: string;
}

export interface GroupedBlogs {
  category: BlogCategory;
  blogs: Blog[];
}

export async function getBlogs(params?: Record<string, string>) {
  const query = new URLSearchParams({ isPublished: "true", ...params }).toString();
  const res = await fetch(`${API_URL}/blogs?${query}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch blogs");
  const data = await res.json();
  return data.data;
}

export async function getBlogsGrouped(): Promise<GroupedBlogs[]> {
  const res = await fetch(`${API_URL}/blogs/grouped`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Failed to fetch grouped blogs");
  const data = await res.json();
  return data.data;
}

export async function getBlogBySlug(slug: string): Promise<Blog> {
  const res = await fetch(`${API_URL}/blogs/${slug}`, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error("Blog not found");
  const data = await res.json();
  return data.data;
}

export async function getCategories(): Promise<BlogCategory[]> {
  const res = await fetch(`${API_URL}/categories`, { next: { revalidate: 300 } });
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.data;
}