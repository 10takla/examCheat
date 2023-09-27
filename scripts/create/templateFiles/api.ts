import { TemplateFileProps } from '../types/templates/shared';
import mutateFirsLetter from '../lib/mutateFirsLetter';

export default ({ name, genericName, relativeFiles }: TemplateFileProps) => {
    const Type = relativeFiles.types;
    const ApiConst = `${name.lower}Api`;
    const GetConst = `Get${name.upper}`;
    const PutConst = `Put${name.upper}`;
    return (
        `import { rtkApi } from '@/shared/api/rtkApi';
import { ${Type?.genericName}Type } from '${Type?.pathTo}';

const ${ApiConst} = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        ${mutateFirsLetter(GetConst).lower}: build.query<${Type?.genericName}Type[], any>({
            query: (params) => ({
                url: '/${name.lower}',
                params: {},
            }),
        }),
        ${mutateFirsLetter(PutConst).lower}: build.mutation<void, any>({
            query: (args) => ({
                url: '/${name.lower}',
                method: 'POST',
                body: JSON.stringify(args),
            }),
        }),
    }),
});

export const use${GetConst} = ${ApiConst}.use${GetConst}Query;
export const use${PutConst} = ${ApiConst}.use${PutConst}Mutation;
`
    );
};
