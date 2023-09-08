import { type Name } from '../args';

import { DeepPartial } from '../shared';

export type TemplateFormat = `${'t' | 'j'}s${'x' | ''}` | 'scss' | 'css'

export type TemplatePreFormat = 'tsx' | 'module' | 'stories' |
    'slice' | 'selector' | 'service' | 'types' |
    'api' | 'index'

type FilesThreeRules = Record<TemplatePreFormat, TemplateFormat>

export interface FilesThree extends DeepPartial<FilesThreeRules> {
    tsx: 'tsx' | 'ts' | 'jsx' | 'js'
    module: 'scss' | 'css'
    stories: 'tsx' | 'ts' | 'jsx' | 'js'
    slice: 'ts' | 'js'
    selector: 'ts' | 'js'
    service: 'ts' | 'js'
    types: 'ts'
    api: 'ts' | 'js'
    index: 'ts' | 'js'
}

export type FullFormat<
    P extends keyof FilesThree = keyof FilesThree,
    F extends FilesThree[P] = FilesThree[P]
> = `${`${P}.` | ''}${F}`

export type TemplateFiles = {
    [key in keyof FilesThree]: {
        nameMutator?: keyof Name
        format: `${`${key}.` | ''}${FilesThree[key]}`,
        name: key
    }
}
