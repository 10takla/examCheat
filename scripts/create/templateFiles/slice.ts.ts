import { TemplateFileProps } from '../types/templates/shared';

export default ({ genericName, name, relativeFiles }: TemplateFileProps) => {
    const SLiceN = genericName;
    const Types = relativeFiles?.types;
    const TypeConst = Types ? Types.genericName : '#here your type#';
    const Service = relativeFiles?.service;
    const ServiceConst = `fetch${name.upper}Data`;

    return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
${Service ? `import { ${TypeConst}, ${TypeConst}Schema } from '${Types?.pathTo}';\n` : ''}
${Service ? `import { ${ServiceConst} } from '${Service.pathTo}';\n` : ''}
const initialState: ${TypeConst}Schema = {
    isLoading: false,
    error: undefined,
    data: undefined,
};

export const ${SLiceN}Slice = createSlice({
    name: '${SLiceN}',
    initialState,
    reducers: {
        set${name.upper}: (state, action: PayloadAction<${TypeConst}>) => {
            state.data = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(${ServiceConst}.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(${ServiceConst}.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(${ServiceConst}.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export const { actions: ${name.lower}Actions } = ${name.lower}Slice;
export const { reducer: ${name.lower}Reducer } = ${name.lower}Slice;`;
};
