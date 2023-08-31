import {Name} from "../args";
import {TemplatePack} from "./packs";
import {TemplateCombine} from "./combines";
import {FullFormat} from "./files";


export type Template = TemplatePack & TemplateCombine

export type DeepPartial<T extends object> = Partial<{
    [key in keyof T]:
    T[key] extends object
        ? DeepPartial<T[key]>
        : T[key]
}>

export interface TemplateFileProps {
    genericNameMutator: keyof Name
    name: Name
    dirFullName: string
    fileNames: Record<FullFormat, string>
}
