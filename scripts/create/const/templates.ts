import {TypeTemplateFiles} from "../types/templates";

export enum TypeTemplate {
    RC = 'rc',
    ML = 'ml',
    API = 'api'
}


export const typeTemplateFiles: TypeTemplateFiles = {
    [TypeTemplate.RC]: [
        ['upper', undefined, 'tsx'],
        ['upper', 'module', 'scss'],
        ['upper', 'stories', 'tsx'],
    ],
    [TypeTemplate.ML]: [
        ['lower', 'slice', 'ts'],
        ['lower', 'selector', 'ts'],
        ['lower', 'service', 'ts'],
        ['lower', 'type', 'ts']
    ],
    [TypeTemplate.API]: [
        ['lower', 'api', 'ts']
    ]
}
