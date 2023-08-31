import {TemplateFileProps} from "../types/templates/shared";

export default ({name, fileNames, dirFullName}: TemplateFileProps) => {
    const ReactCFN = fileNames['tsx']
    const reactComponentConst = ReactCFN ?? '/*your react component*/'
    const tmp = dirFullName.split('\\')
    const GroupConst = tmp.find((part, index) =>
        tmp[index - 1] === 'src' &&
        ['app', 'pages', 'widgets', 'features', 'entities', 'shared']
            .includes(part)
    )

    return `import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
${ReactCFN ? `import { ${ReactCFN} } from './${ReactCFN}';\n` : ''}
export default {
    title: '${[GroupConst, reactComponentConst].filter(e => e).join('/')}',
    component: ${reactComponentConst},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ${reactComponentConst}>;

const Template: ComponentStory<typeof ${reactComponentConst}> = (args) => <${reactComponentConst} {...args} />;

export const Normal = Template.bind({});
Normal.args = {

};`
}
