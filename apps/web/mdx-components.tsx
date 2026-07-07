import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';

import { DocsQuickStart } from '@/components/docs-quick-start';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    DocsQuickStart,
    ...components,
  };
}
