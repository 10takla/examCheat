import { type TemplatePacks } from '../types/templates/packs';
import { type TemplateCombines } from '../types/templates/combines';
import { type TemplateFiles } from '../types/templates/files';

export const templateFiles: TemplateFiles = {
    tsx: ['upper', 'tsx'],
    module: ['upper', 'module.scss'],
    stories: ['upper', 'stories.tsx'],
    slice: ['lower', 'slice.ts'],
    selector: ['lower', 'selector.ts'],
    service: ['lower', 'service.ts'],
    types: ['lower', 'types.ts'],
    api: ['lower', 'api.ts'],
};

export const templateCombines: TemplateCombines = {
    rc: [
        templateFiles.tsx,
        templateFiles.module,
        templateFiles.stories,
    ],
    ml: [
        templateFiles.slice,
        templateFiles.selector,
        templateFiles.service,
        templateFiles.types,
    ],
    api: [
        templateFiles.api,
    ],
};

export const templatePacks: TemplatePacks = {
    pc: [
        [templateCombines.rc, 'ui'],
        [templateCombines.ml, 'model'],
    ],
    pa: [
        [templateCombines.rc, 'ui'],
        [templateCombines.api, 'api'],
    ],
};
