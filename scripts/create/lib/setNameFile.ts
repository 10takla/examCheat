import { type TemplatePreFormat } from '../types/templates/files';

export default (name: string, preFormat: TemplatePreFormat, format: string) => `${name}.${preFormat}.format`;
