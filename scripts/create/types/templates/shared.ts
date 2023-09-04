import { type Name } from '../args';
import { type TemplatePack } from './packs';
import { type TemplateCombine } from './combines';
import { type FullFormat, type TemplateFiles } from './files';

export type Template = TemplatePack & TemplateCombine & TemplateFiles

export type DeepPartial<T extends object> = Partial<{
  [key in keyof T]:
  T[key] extends object
    ? DeepPartial<T[key]>
    : T[key]
}>

export interface TemplateFileProps {
  genericName: string
  name: Name
  pathToDir: string
  fileCombineNames?: Record<FullFormat, string>
}
