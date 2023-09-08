import { type TemplatePacks } from '../types/templates/packs';
import { type TemplateCombines } from '../types/templates/combines';
import { type TemplateFiles } from '../types/templates/files';

const templateFiles: TemplateFiles = {
    tsx: { nameMutator: 'upper', format: 'tsx', name: 'tsx' },
    module: { nameMutator: 'upper', format: 'module.scss', name: 'module' },
    stories: { nameMutator: 'upper', format: 'stories.tsx', name: 'stories' },
    slice: { nameMutator: 'lower', format: 'slice.ts', name: 'slice' },
    selector: { nameMutator: 'lower', format: 'selector.ts', name: 'selector' },
    service: { nameMutator: 'lower', format: 'service.ts', name: 'service' },
    types: { nameMutator: 'lower', format: 'types.ts', name: 'types' },
    api: { nameMutator: 'lower', format: 'api.ts', name: 'api' },
    index: { format: 'index.ts', name: 'index' },
};

const templateCombines: TemplateCombines = {
    rc: [
        { template: templateFiles.tsx },
        { template: templateFiles.module },
    ],
    ml: [
        { template: templateFiles.slice, dirName: 'slice' },
        { template: templateFiles.selector, dirName: 'selectors' },
        { template: templateFiles.service, dirName: 'services' },
        { template: templateFiles.types, dirName: 'types' },
    ],
    ...templateFiles,
};

export const templatePacks: TemplatePacks = {
    pc: [
        { template: templateCombines.rc, dirName: 'ui' },
        { template: templateCombines.ml, dirName: 'model' },
        { template: templateFiles.index },
    ],
    pa: [
        { template: templateCombines.rc, dirName: 'ui' },
        { template: templateFiles.api, dirName: 'api' },
        { template: templateFiles.index },
    ],
    ...templateCombines,
};
