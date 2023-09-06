import { type Name } from '../args';
import { type TemplatePack } from './packs';
import { type TemplateCombine } from './combines';
import { type FullFormat, type TemplateFiles } from './files';

export type Template = TemplatePack & TemplateCombine & TemplateFiles

export interface TemplateFileProps{
    genericName: string
    name: Name
    format: FullFormat
    pathToDir: string
    relatedFiles?: {
        [key in keyof TemplateFiles]?: {
            genericName: string,
            pathTo: string
        }
    }
}

export type templateWithDir<E> = {
    template: E,
    dirName?: string
}
