import { type TemplatePacks } from '../types/templates/packs';
import { type TemplateCombines } from '../types/templates/combines';
import { TemplateFiles } from '../types/templates/files';

const templateFiles: TemplateFiles = {
    tsx: {
        fileName: { nameMutator: 'upper', format: 'tsx' },
        genericNameMutator: 'upper',
        templateFileName: 'tsx',
        name: 'tsx',
    },
    module: {
        fileName: { nameMutator: 'upper', format: 'module.scss' },
        genericNameMutator: 'upper',
        templateFileName: 'module.scss',
        name: 'module',
    },
    stories: {
        fileName: { nameMutator: 'lower', format: 'stories.tsx' },
        genericNameMutator: 'upper',
        templateFileName: 'stories.tsx',
        name: 'stories',
    },
    slice: {
        fileName: { nameMutator: 'lower', format: 'slice.ts' },
        genericNameMutator: 'lower',
        templateFileName: 'slice.ts',
        name: 'slice',
    },
    selector: {
        fileName: { nameMutator: 'lower', format: 'selector.ts' },
        genericNameMutator: 'lower',
        templateFileName: 'selector.ts',
        name: 'selector',
    },
    service: {
        fileName: { nameMutator: 'lower', format: 'service.ts' },
        genericNameMutator: 'lower',
        templateFileName: 'service.ts',
        name: 'service',
    },
    types: {
        fileName: { nameMutator: 'lower', format: 'types.ts' },
        genericNameMutator: 'upper',
        templateFileName: 'types.ts',
        name: 'types',
    },
    api: {
        fileName: { nameMutator: 'lower', format: 'api.ts' },
        genericNameMutator: 'lower',
        templateFileName: 'api.ts',
        name: 'api',
    },
    index: {
        fileName: { format: 'index.ts' },
        templateFileName: 'index.ts',
        name: 'index',
    },
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
        { template: templateFiles.types, dirName: 'types' },
    ],
    ...templateCombines,
};
