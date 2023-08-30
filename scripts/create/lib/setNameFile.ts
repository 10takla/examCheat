import {Name} from "../types/args";
import {TemplateFile} from "../types/templates";
import {TypeTemplate} from "../const/templates";

interface formatFile extends Record<TypeTemplate, any>{

}

export default (name: string, preFormat: TemplateFile, format: string) => {
    return `${name}.${preFormat}.format`
}
