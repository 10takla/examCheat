import { type DeepPartial } from './shared';
import { type TemplateCombine, type TemplateCombines } from './combines';

export type TemplatePack = 'pc' | 'pa'

type PackThreeRules = {
  [key in TemplatePack]: TemplateCombine
}

export interface PacksThree extends DeepPartial<PackThreeRules> {
  pc: 'rc' | 'ml'
  pa: 'rc' | 'api'
}

export type TemplatePacks = {
  [K in keyof PacksThree]: Array<[TemplateCombines[PacksThree[K]], string]>
}
