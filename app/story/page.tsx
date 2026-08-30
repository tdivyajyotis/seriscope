import { InteriorPage } from '@/components/interior-page';
import { pageContent } from '@/lib/content';

export default function StoryPage() {
  return <InteriorPage content={pageContent.story} nextHref="/contact" nextLabel="Contact" />;
}
