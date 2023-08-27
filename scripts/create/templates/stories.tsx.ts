import {mutateFirstLetter} from "../helpers";
import {ArgsTemplate, Name} from "../types";

export default ({path, upperName}: ArgsTemplate) => {
    const spl = path.split('\\')
    const layer = spl.find((_, i) => spl[i - 1] === 'src')
    return `
import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { ${upperName} } from './${upperName}';

export default {
    title: '${layer}/${upperName}',
    component: ${upperName},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ${upperName}>;

const Template: ComponentStory<typeof ${upperName}> = (args) => <${upperName} {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};`
};
