import { type TemplateFiles, type TemplatePreFormat } from './files';
import { type DeepPartial } from './shared';

export type TemplateCombine = 'rc' | 'ml' | 'api'

export type CombineThreeRules = {
  [key in TemplateCombine]: TemplatePreFormat
}

export interface CombineThree extends DeepPartial<CombineThreeRules> {
  rc: 'tsx' | 'module' | 'stories'
  ml: 'slice' | 'selector' | 'service' | 'types'
  api: 'api'
}

export type TemplateCombines = {
  [key in keyof CombineThree]: Array<TemplateFiles[CombineThree[key]]>
}
