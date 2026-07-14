import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/blog";
import { getNiche } from "@/content/niches";
import { site } from "@/lib/site";
import { Section, SectionHeader } from "@/components/shared/section";
import { DawnCta } from "@/components/shared/dawn-cta";

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
      <Section tone="night" className="pt-32 md:pt-40">
        <SectionHeader
          tone="ink"
          kicker="Resources"
          title="Straight talk about your phone line"
          lede="No growth-hacking fluff. Practical math and honest comparisons for owners who'd rather be working than reading."
        />
        <div className="mx-auto max-w-3xl border-t border-espresso-800">
          {posts.map((post) => {
            const niche = post.niche ? getNiche(post.niche) : undefined;
            return (
              <article key={post.slug} className="border-b border-espresso-800">
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block px-2 py-8 transition-colors duration-500 hover:bg-espresso-900/40 sm:px-6 sm:py-10"
                >
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-espresso-500">
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
                        <span className="text-brass-400">{niche.shortName}</span>
                      </>
                    )}
                  </div>
                  <h2 className="font-display mt-4 text-2xl font-medium leading-snug text-ivory transition-colors duration-500 group-hover:text-brass-400 sm:text-3xl">
                    {post.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-espresso-300 sm:text-base">
                    {post.description}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-brass-400">
                    Read it
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </article>
            );
          })}
        </div>
      </Section>
      <DawnCta
        title="Done reading? The demo talks."
        italicLine="Hear what your callers would hear."
        lede="Sixty seconds with the live demo beats another article."
        location="blog_index"
      />
    </>
  );
}
