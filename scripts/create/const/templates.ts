import {TemplateCombines, TemplatePacks} from "../types/templates";

export const templateCombines: TemplateCombines = {
    'rc': [
        ['upper', undefined, 'tsx'],
        ['upper', 'module', 'scss'],
        ['upper', 'stories', 'tsx'],
    ],
    'ml': [
        ['lower', 'slice', 'ts'],
        ['lower', 'selector', 'ts'],
        ['lower', 'service', 'ts'],
        ['lower', 'type', 'ts']
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
