import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { getNiche } from "@/content/niches";
import { site } from "@/lib/site";
import { Section, SectionHeader } from "@/components/shared/section";
import { FinalCta } from "@/components/shared/final-cta";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Practical, no-hype writing on missed calls, answering, and phone-driven revenue for local service businesses.",
  alternates: { canonical: `${site.url}/blog` },
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <>
      <Section className="pt-32 md:pt-40">
        <SectionHeader
          kicker="Resources"
          title="Straight talk about your phone line"
          lede="No growth-hacking fluff. Practical math and honest comparisons for owners who'd rather be working than reading."
        />
        <div className="mx-auto max-w-3xl space-y-5">
          {posts.map((post) => {
            const niche = post.niche ? getNiche(post.niche) : undefined;
            return (
              <article key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block rounded-2xl border border-border bg-card p-6 shadow-card transition-shadow hover:shadow-lift focus-visible:outline-2 focus-visible:outline-ring sm:p-8"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date + "T00:00:00").toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
                    <span aria-hidden>·</span>
                    <span>{post.readingMinutes} min read</span>
                    {niche && (
                      <>
                        <span aria-hidden>·</span>
                        <span className="text-flame-600">{niche.shortName}</span>
                      </>
                    )}
                  </div>
                  <h2 className="font-display mt-3 text-xl font-bold leading-snug group-hover:text-flame-600 sm:text-2xl">
                    {post.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {post.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-flame-600">
                    Read it
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </Section>
      <FinalCta
        title="Done reading? The demo talks."
        lede="Sixty seconds with the live demo beats another article — hear exactly what your callers would hear."
        location="blog_index"
      />
    </>
  );
}
