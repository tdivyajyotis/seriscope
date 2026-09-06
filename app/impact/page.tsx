import { InteriorPage } from '@/components/interior-page';
import { pageContent } from '@/lib/content';

export const dynamic = 'force-static';

export default function ImpactPage() {
  return (
    <InteriorPage
      content={pageContent.impact}
      nextHref="/story"
      nextLabel="Story"
    />
  );
}
