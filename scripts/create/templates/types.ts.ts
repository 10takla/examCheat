import { type TemplateFileProps } from '../types/templates/shared';

export default ({ genericName, name }: TemplateFileProps) => {
    const TN = genericName;

    return `export interface ${TN} {

}

export interface ${TN}Schema {
    data?: ${TN};
    isLoading: boolean;
    error?: string;
}`;
};
