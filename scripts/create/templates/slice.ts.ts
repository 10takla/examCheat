import {TemplateFileProps} from "../types/templates/shared";


export default ({genericNameMutator, name, fileNames}: TemplateFileProps) =>{
    const SLiceN = name[genericNameMutator]
    const TypeFN = fileNames['types.ts']
    const TypeConst = `${TypeFN ? TypeFN : '#here your type#'}`
    const ServFN = fileNames['service.ts']
    const ServiceConst = `fetch${name.upper}Data`

    return `import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ${TypeConst}, ${name.upper}Schema } from '../types/${TypeConst}';
${ServFN ? `import { ${ServiceConst} } from '../services/${ServFN}';\n` : ''}
const initialState: ${name.upper}Schema = {
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
export const { reducer: ${name.lower}Reducer } = ${name.lower}Slice;`
}
