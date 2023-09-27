import { TemplateFileProps } from '../types/templates/shared';

export default ({ genericName, name }: TemplateFileProps) => {
    const TNConst = `${genericName}Type`;
    return `export interface ${TNConst} {

}

export interface ${name.upper}Schema {
    data?: ${TNConst};
    isLoading: boolean;
    error?: string;
}`;
};
