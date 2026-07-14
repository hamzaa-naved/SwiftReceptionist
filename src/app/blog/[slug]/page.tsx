import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { getAllPosts, getPost } from "@/lib/blog";
import { getNiche } from "@/content/niches";
import { articleFor } from "@/lib/utils";
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
            className="inline-flex items-center gap-2 text-sm font-medium text-carbon-400 transition-colors duration-300 hover:text-azure-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden /> All resources
          </Link>
          <header className="mt-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-carbon-400">
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
                    className="text-azure-600 transition-colors duration-300 hover:text-carbon-950"
                  >
                    {niche.shortName}
                  </Link>
                </>
              )}
            </div>
            <h1 className="mt-5 text-balance font-display text-4xl leading-[1.05] text-carbon-950 sm:text-5xl">
              {post.title}
            </h1>
          </header>
          <div className="prose-sr mt-10">
            <MDXRemote source={post.content} />
          </div>
          {niche && (
            <aside className="mt-12 rounded-3xl border border-line bg-cloud p-7">
              <p className="text-xl font-semibold tracking-[-0.01em] text-carbon-950">
                Run {articleFor(niche.noun)} {niche.noun}?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-carbon-600">
                See exactly how the receptionist handles {niche.shortName.toLowerCase()}{" "}
                calls — emergencies, booking, and all.
              </p>
              <Link
                href={`/industries/${niche.slug}`}
                className="link-underline mt-4 inline-block text-sm font-medium text-azure-600"
              >
                See the {niche.shortName.toLowerCase()} page →
              </Link>
            </aside>
          )}
        </article>
      </Section>
      <FinalCta
        title="Your phone is ringing while you read this."
        lede="Try the live demo or book a 15-minute call — either way, the next missed call doesn't have to be yours."
        location="blog_post"
      />
    </>
  );
}
