import type { TemplateConfig, TemplateName } from './types.js';
import { basicTemplate } from './registry/basic/index.js';
import { httpTemplate } from './registry/http/index.js';
import { authTemplate } from './registry/auth/index.js';
import { fullTemplate } from './registry/full/index.js';

const templates = new Map<TemplateName, TemplateConfig>([
  ['basic', basicTemplate],
  ['http', httpTemplate],
  ['auth', authTemplate],
  ['full', fullTemplate],
]);

export function getTemplate(name: TemplateName): TemplateConfig | undefined {
  return templates.get(name);
}

export function getTemplateNames(): TemplateName[] {
  return Array.from(templates.keys());
}

export function getAllTemplates(): TemplateConfig[] {
  return Array.from(templates.values());
}

export function getTemplateOptions() {
  return getAllTemplates().map((t) => ({
    value: t.name as TemplateName,
    label: t.icon + ' ' + t.name.charAt(0).toUpperCase() + t.name.slice(1),
    hint: t.hint,
  }));
}

export function isValidTemplate(name: string): name is TemplateName {
  return templates.has(name as TemplateName);
}

export type { TemplateName };
