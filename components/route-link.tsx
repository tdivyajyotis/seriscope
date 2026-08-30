/* oxlint-disable next/no-html-link-for-pages */

import type { AnchorHTMLAttributes } from 'react';

type RouteLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string;
};

export function RouteLink({ href, children, ...props }: RouteLinkProps) {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}
