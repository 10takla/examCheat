import {TypeTemplate} from "../const/templates";
import {Name} from "./args";

type Format = 'tsx' | 'ts' | 'scss' | 'css'
// export interface TypeTemplateFile {
//     rc: {
//         tsx: 'tsx'
//         module: 'scss'
//         stories: 'ts'
//     },
//     ml: {
//         slice: 'ts'
//         selector: 'ts'
//         service: 'ts'
//         type: 'ts'
//     }
//     api: {
//         rtk: 'ts'
//     },
// }


export interface TypeTemplateFile extends Record<TypeTemplate, string> {
    rc: 'tsx' | 'module' | 'stories',
    ml: 'slice' | 'selector' | 'service' | 'type',
    api: 'api',
}

export type TemplateFile = TypeTemplateFile[keyof TypeTemplateFile]

export type TypeTemplateFiles = {
    [key in TypeTemplate]:
    Array<[keyof Name, TypeTemplateFile[key], Format]>
}
