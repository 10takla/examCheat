import { type TemplateFiles, type TemplatePreFormat } from './files';
import { templateWithDir } from './shared';

export type TemplateCombine = 'rc' | 'ml'

type CombineThreeRules = {
  [key in TemplateCombine]: TemplatePreFormat
}

interface CombineThree extends DeepPartial<CombineThreeRules> {
  rc: 'tsx' | 'module' | 'stories'
  ml: 'slice' | 'selector' | 'service' | 'types'
}

export type TemplateCombines = {
  [key in keyof CombineThree]: templateWithDir<TemplateFiles[CombineThree[key]]>[]
} & TemplateFiles
