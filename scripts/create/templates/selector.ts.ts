import {Name} from "../types/args";

import {TemplateFormat, TemplatePreFormat} from "../types/templates/files";

export interface TemplateFileCode {
    genericNameMutator: keyof Name
    name: Name
    combineNames: Partial<Record<`${TemplatePreFormat}.${TemplateFormat}`, string>>
}

export default ({genericNameMutator, name, combineNames}: TemplateFileCode) => {
    return `import { StateSchema } from '@/app/providers/StoreProvider';

export const get${name.upper}IsLoading = (state: StateSchema) => state.${name.upper}?.isLoading;
export const get${name.upper}Data = (state: StateSchema) => state.${name.upper}?.data;
export const get${name.upper}Error = (state: StateSchema) => state.${name.upper}?.error;`
}
