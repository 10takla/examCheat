import { type TemplateFileProps } from '../types/templates/shared';

export default ({ name, relativeFiles }: TemplateFileProps) => {
    const Types = relativeFiles?.types;
    const ServiceConst = `fetch${name.upper}Data`;
    const TypeConst = `${Types ? Types.genericName : '#here your type#'}`;

    return `import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
${Types ? `import { ${name.upper} } from '${Types.pathTo}';` : ''}

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
    );`;
};
