import { type TemplateFileProps } from '../types/templates/shared';

export default ({ genericName, name }: TemplateFileProps) => {
    const TN = genericName;

    return `export interface ${name.upper} {

}

export interface ${name.upper}Schema {
    data?: ${name.upper};
    isLoading: boolean;
    error?: string;
}`;
};
