import {Name} from "../args";
import {FilesThree, TemplateFormat, TemplatePreFormat} from "./files";
import {DeepPartial} from "./shared";

export type TemplateCombine = 'rc' | 'ml' | 'api'

export type CombineThreeRules = {
    [key in TemplateCombine]: {
        [key in TemplatePreFormat]: TemplateFormat
    }
}

export interface CombineThree extends DeepPartial<CombineThreeRules> {
    rc: {
        tsx: FilesThree["tsx"]
        module: FilesThree["module"]
        stories: FilesThree["stories"]
    },
    ml: {
        slice: FilesThree["slice"]
        selector: FilesThree["selector"]
        service: FilesThree["service"]
        types: FilesThree["types"]
    }
    api: {
        api: FilesThree["api"]
    }
}

export type TemplateCombines = {
    [key in TemplateCombine]:
    Array<[
        keyof Name,
        ...Array<
            keyof CombineThree[key] |
            CombineThree[key][keyof CombineThree[key]]
        >
    ]>
}


