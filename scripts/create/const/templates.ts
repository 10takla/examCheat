import {TemplatePacks} from "../types/templates/packs";
import {TemplateCombines} from "../types/templates/combines";

export const templateCombines: TemplateCombines = {
    'rc': [
        ['upper', 'tsx'],
        ['upper', 'module', 'scss'],
        ['upper', 'stories', 'tsx'],
    ],
    'ml': [
        ['lower', 'slice', 'ts'],
        ['lower', 'selector', 'ts'],
        ['lower', 'service', 'ts'],
        ['upper', 'types', 'ts']
    ],
    'api': [
        ['lower', 'api', 'ts']
    ]
}

export const templatePacks: TemplatePacks = {
    pc: [
        ['rc', 'ui'],
        ['ml', 'model'],
    ],
    pa: [
        ['rc', 'ui'],
        ['api', 'api'],
    ]
}
