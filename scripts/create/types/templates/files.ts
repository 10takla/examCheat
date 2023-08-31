export type TemplateFormat = `${'t' | 'j'}s${'x' | ''}` | 'scss' | 'css'


export type TemplatePreFormat = 'tsx' | 'module' | 'stories' |
    'slice' | 'selector' | 'service' | 'types' |
    'api'

export interface FilesThree extends Record<TemplatePreFormat, TemplateFormat> {
    tsx: 'tsx' | 'ts' | 'jsx' | 'js'
    module: 'scss' | 'css'
    stories: 'tsx' | 'ts' | 'jsx' | 'js'
    slice: 'ts' | 'js'
    selector: 'ts' | 'js'
    service: 'ts' | 'js'
    types: 'ts'
    api: 'ts' | 'js'
}

export type FullFormat<
    K extends keyof FilesThree = keyof FilesThree,
    V extends FilesThree[K] = FilesThree[K]
> = `${`${K}.` | ''}${V}`
