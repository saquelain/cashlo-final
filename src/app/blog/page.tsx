import Container from "@/components/ui/Container";
import BlogCard from "@/components/blog/BlogCard";
import { getBlogsGrouped } from "@/lib/blogApi";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Cashlo",
  description: "Insights on UPI, digital payments, merchant banking, and fintech from the Cashlo team.",
  alternates: { canonical: "https://www.cashlo.in/blog" },
  openGraph: {
    title: "Blog | Cashlo",
    description: "Insights on UPI, digital payments, merchant banking, and fintech from the Cashlo team.",
    url: "https://www.cashlo.in/blog",
    siteName: "Cashlo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Cashlo",
    description: "Insights on UPI, digital payments, merchant banking, and fintech from the Cashlo team.",
  },
};

export default async function BlogPage() {
  const grouped = await getBlogsGrouped().catch(() => []);

  return (
    <>
      <section className="bg-bg pb-10 pt-40 sm:pt-44">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-wider text-brand">
            Insights &amp; Updates
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            Cashlo Blog
          </h1>
        </Container>
      </section>

      <section className="bg-bg pb-20 sm:pb-24">
        <Container>
          {grouped.length === 0 ? (
            <p className="text-ink/50">No blogs published yet</p>
          ) : (
            <div className="space-y-14">
              {grouped.map((group) => (
                <div key={group.category._id}>
                  <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
                    {group.category.name}
                  </h2>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {group.blogs.map((blog) => (
                      <BlogCard key={blog._id} blog={blog} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}