import { templateWithDir } from './shared';
import { type TemplateCombine, type TemplateCombines } from './combines';
import { TemplatePreFormat } from './files';

export type TemplatePack = 'pc' | 'pa'

type PackThreeRules = {
    [key in TemplatePack]: TemplateCombine | TemplatePreFormat
}

interface PacksThree extends DeepPartial<PackThreeRules> {
    pc: 'rc' | 'ml' | 'index'
    pa: 'rc' | 'api' | 'index' | 'types'
}

export type TemplatePacks = {
    [K in keyof PacksThree]: templateWithDir<
        TemplateCombines[PacksThree[K]]
    >[]
} & TemplateCombines
