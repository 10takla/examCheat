import { memo, useEffect, useState } from 'react';
import VStack from '@/shared/ui/Stack/VStack/VStack';
import { SortProps } from '@/pages/MonitorPage/ui/Sort/Sort';
import { Range } from '@/pages/MonitorPage/ui/Sort/ui/Range/Range';
import { Selector } from '@/shared/ui/Kit/Selector/Selector';
import { DraggableList } from '@/shared/ui/Kit/DraggableLIst/DraggableList';

interface SortListProps {
    className?: string
    options: SortProps['options']
}

export const SortList = memo((props: SortListProps) => {
    const {
        options,
    } = props;

    const [sorts, setSorts] = useState<Array<SortProps['sort']>>(
        [
            {
                option: 'relation',
                isOrder: false,
            },
            {
                option: 'tion',
                isOrder: false,
            },
            {
                option: 'relion',
                isOrder: false,
            },
        ],
    );
    const [addOption, setAddOption] = useState<'' | undefined>(undefined);
    const [postOptions, setPostOptions] = useState(options);

    useEffect(() => {
        setPostOptions(options.filter((op) => sorts.every(({ option }) => option !== op)));
    }, [options, sorts]);

    return (
        <VStack>
            <DraggableList items={sorts} direction="row">
                {(item) => (
                    <div>{item?.option}</div>
                )}
            </DraggableList>
            {/* {sorts.map((sort, i) => ( */}
            {/*    <HStack key={String(i)}> */}
            {/*         <Sort */}
            {/*            onSort={(s) => { */}
            {/*                console.log(s); */}
            {/*                sorts.splice(i, 1, s); */}
            {/*                setSorts([...sorts]); */}
            {/*            }} */}
            {/*            {...{ sort, options }} */}
            {/*         /> */}
            {/*    </HStack> */}
            {/* ))} */}
            <Selector
                onChange={(e) => {
                    const { value } = e.currentTarget;
                    if (value && sorts.every(({ option }) => option !== value)) {
                        setSorts([...sorts, { option: e.currentTarget.value, isOrder: false }]);
                        setAddOption(addOption ? undefined : '');
                    }
                }}
                value={addOption}
                options={postOptions}
            />
            <Range />
        </VStack>
    );
});
