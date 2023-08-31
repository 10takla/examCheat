import {TemplateFileProps} from "../types/templates/shared";

export default ({name, genericNameMutator}: TemplateFileProps) =>{

    return `.${name[genericNameMutator]} {

}
`
}
