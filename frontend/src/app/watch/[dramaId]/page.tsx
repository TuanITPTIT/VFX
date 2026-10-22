import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShortDramaPlayer from "@/components/player/short-drama-player";
import { getDramaById, MOCK_DRAMAS } from "@/data/mock-data";

type WatchPageProps = { params: { dramaId: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return MOCK_DRAMAS.map(drama => ({ dramaId: drama.id }));
}

export function generateMetadata({ params }: WatchPageProps): Metadata {
  const drama = getDramaById(params.dramaId);
  if (!drama) notFound();
  return { title: `${drama.title} | ShortScene`, description: drama.description };
}

export default function WatchPage({ params }: WatchPageProps) {
  const drama = getDramaById(params.dramaId);
  if (!drama) notFound();
  return <ShortDramaPlayer key={drama.id} drama={drama} />;
}
