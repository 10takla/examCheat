import {Name} from "./args";


export type TemplateFormat = `${'t' | 'j'}s${'x' | ''}` | 'scss' | 'css'

export interface TypeTemplateFile extends Record<Template, string> {
    rc: 'tsx' | 'module' | 'stories',
    ml: 'slice' | 'selector' | 'service' | 'type',
    api: 'api',
}


export type TemplateFile = TypeTemplateFile[keyof TypeTemplateFile]

export type TemplateCombine = 'rc' | 'ml' | 'api'

export type TemplateCombines = {
    [key in TemplateCombine]:
    Array<[
        keyof Name,
        keyof ThreeCombines[key],
        ThreeCombines[key][keyof ThreeCombines[key]]
    ]>
}

export type TemplatePack = 'pc' | 'pa'

export type TemplatePacks = {
    [K in keyof ThreeTemplates]: Array<[keyof ThreeTemplates[K], string]>
}

export type Template = TemplatePack & TemplateCombine

export type TreeTemplatesRules = {
    [key in TemplatePack]: {
        [key in TemplateCombine]: {
            [key in TemplateFile]: TemplateFormat
        }
    }
}

type DeepPartial<T extends object> = Partial<{
    [key in keyof T]:
    T[key] extends object
        ? DeepPartial<T[key]>
        : T[key]
}>

interface ThreeCombines {
    rc: {
        tsx: 'tsx' | 'ts' | 'js' | 'jsx'
        module: 'scss' | 'css'
        stories: 'tsx' | 'ts' | 'js' | 'jsx'
    },
    ml: {
        slice: 'ts' | 'js'
        selector: 'ts' | 'js'
        service: 'ts' | 'js'
        type: 'ts'
    }
    api: {
        api: 'ts' | 'js'
    }
}

export interface ThreeTemplates extends DeepPartial<TreeTemplatesRules> {
    pc: {
        rc: ThreeCombines['rc']
        ml: ThreeCombines['ml']
    },
    pa: {
        rc: ThreeCombines['rc']
        api: ThreeCombines['api']
    }
}
