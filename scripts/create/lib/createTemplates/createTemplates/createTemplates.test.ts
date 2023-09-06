import { createTemplates, CreateTemplatesProps } from './createTemplates';
import mutateFirsLetter from '../../../mutateFirsLetter';
import { templatePacks } from '../../../../const/templates';

const props: CreateTemplatesProps = {
    template: [
        { template: { nameMutator: 'upper', format: 'tsx' } },
        { template: { nameMutator: 'upper', format: 'module.scss' } },
    ],
    pathToDir: 'popArt',
    name: { upper: 'TestFileName', lower: 'testFileName' },
};
const props2: CreateTemplatesProps = {
    template: templatePacks.pc,
    pathToDir: 'popArt',
    name: { upper: 'TestFileName', lower: 'testFileName' },
};

describe('createTemplates', () => {
    test('test with existing template', () => {
        expect(createTemplates(props2, true)).toEqual(
            ['popArt/'],
        );
    });
    // test('when another files created', () => {
    //     expect(createTemplates(props, true)).toEqual(
    //         ['popArt/'],
    //     );
    // });
});
