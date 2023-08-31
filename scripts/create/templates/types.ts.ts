import {TemplateFileProps} from "../types/templates/shared";

export default ({genericNameMutator, name}: TemplateFileProps) => {
    const TN = name[genericNameMutator]

    return `export interface ${TN} {

}

export interface ${TN}Schema {
    data?: ${TN};
    isLoading: boolean;
    error?: string;
}`
}
