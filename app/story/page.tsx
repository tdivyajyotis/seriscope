import { InteriorPage } from '@/components/interior-page';
import { pageContent } from '@/lib/content';

export const dynamic = 'force-static';

export default function StoryPage() {
  return (
    <InteriorPage
      content={pageContent.story}
      nextHref="/contact"
      nextLabel="Contact"
    />
  );
}
