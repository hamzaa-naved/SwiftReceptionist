import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPost } from "@/lib/blog";
import { getNiche } from "@/content/niches";
import { site } from "@/lib/site";
import { breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/shared/json-ld";
import { Section } from "@/components/shared/section";
import { FinalCta } from "@/components/shared/final-cta";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${site.url}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      url: `${site.url}/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const niche = post.niche ? getNiche(post.niche) : undefined;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          url: `${site.url}/blog/${post.slug}`,
          author: { "@type": "Organization", name: site.name, url: site.url },
          publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", url: site.url },
          { name: "Resources", url: `${site.url}/blog` },
          { name: post.title, url: `${site.url}/blog/${post.slug}` },
        ])}
      />
      <Section className="pt-32 md:pt-40">
        <article className="mx-auto max-w-2xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground hover:text-flame-600"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden /> All resources
          </Link>
          <header className="mt-6">
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
                  <Link
                    href={`/industries/${niche.slug}`}
                    className="text-flame-600 hover:underline"
                  >
                    {niche.shortName}
                  </Link>
                </>
              )}
            </div>
            <h1 className="font-display mt-4 text-balance text-4xl font-bold uppercase leading-[0.98] sm:text-5xl">
              {post.title}
            </h1>
          </header>
          <div className="prose-sr mt-8">
            <MDXRemote source={post.content} />
          </div>
          {niche && (
            <aside className="mt-12 rounded-2xl border border-border bg-paper-warm p-6">
              <p className="font-display text-base font-bold">
                Run a {niche.noun}?
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                See exactly how the receptionist handles {niche.shortName.toLowerCase()}{" "}
                calls — emergencies, booking, and all.
              </p>
              <Link
                href={`/industries/${niche.slug}`}
                className="mt-3 inline-block text-sm font-semibold text-flame-600 underline-offset-4 hover:underline"
              >
                See the {niche.shortName.toLowerCase()} page →
              </Link>
            </aside>
          )}
        </article>
      </Section>
      <FinalCta
        title="Your phone is ringing while you read this."
        lede="Try the live demo or book a 15-minute call — either way, stop losing jobs to voicemail."
        location="blog_post"
      />
    </>
  );
}
