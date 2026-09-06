import { InteriorPage } from '@/components/interior-page';
import { pageContent } from '@/lib/content';

export const dynamic = 'force-static';

export default function TechnologyPage() {
  return (
    <InteriorPage
      content={pageContent.technology}
      nextHref="/research"
      nextLabel="Research"
    />
  );
}
