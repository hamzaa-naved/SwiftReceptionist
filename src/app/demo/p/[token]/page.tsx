import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function LegacyPersonalizedDemoPage({
  params,
}: PageProps<"/demo/p/[token]">) {
  const { token } = await params;
  redirect(`/demo/${encodeURIComponent(token)}`);
}
