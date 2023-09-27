import { Name } from '../args';
import { TemplateFiles, TemplatePreFormat } from './files';
import { TemplatePack } from './packs';
import { TemplateCombine } from './combines';

export type templateWithDir<E> = {
    template: E,
    dirName?: string
}

export interface TemplateFileProps {
    genericName: string
    name: Name
    pathToDir: string
    fileName: string
    relativeFiles: {
        [key in keyof TemplateFiles]?: {
            genericName: string,
            pathTo: string
        }
    }
    alias: string
}

export type Template = TemplatePack | TemplatePreFormat | TemplateCombine
