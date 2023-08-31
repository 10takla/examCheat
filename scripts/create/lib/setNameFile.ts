import {TemplatePreFormat} from "../types/templates/files";


export default (name: string, preFormat: TemplatePreFormat, format: string) => {
    return `${name}.${preFormat}.format`
}
