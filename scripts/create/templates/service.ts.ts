import {TemplateFileProps} from "../types/templates/shared";


export default ({genericNameMutator, name, fileNames}: TemplateFileProps) => {
    const TFN = fileNames['types.ts']
    const ServiceConst = `fetch${name.upper}Data`
    const TypeConst = `${TFN ? name.upper : '#here your type#'}`

    return `import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
${TFN ? `import { ${name.upper} } from '../../types/${TFN}';` : ''}

export const ${ServiceConst} = createAsyncThunk<
    ${TypeConst},
    string,
    ThunkConfig<string>
    >(
        '${name.lower}/${ServiceConst}',
        async (_, thunkApi) => {
            const { extra, rejectWithValue, } = thunkApi;
            try {
                const response = await extra.api.get<${TypeConst}>('/${name.lower}');

                if (!response.data) {
                    throw new Error();
                }

                return response.data;
            } catch (e) {
                return rejectWithValue('error');
            }
        },
    );`
}
