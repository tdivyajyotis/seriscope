import { InteriorPage } from '@/components/interior-page';
import { pageContent } from '@/lib/content';

export const dynamic = 'force-static';

export default function ResearchPage() {
  return (
    <InteriorPage
      content={pageContent.research}
      nextHref="/impact"
      nextLabel="Impact"
    />
  );
}
