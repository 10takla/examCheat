import { memo, useCallback, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Translates.module.scss';
import { HStack } from '@/shared/ui/Stack';
import Translate from '@/shared/ui/Word/Translate/Translate';
import { Add, AddMyTranslateProps } from '@/features/changeMyTranslate/ui/Add/Add';
import { Delete } from '@/features/changeMyTranslate/ui/Delete/Delete';
import Update from '@/features/changeMyTranslate/ui/Update/Update';
import { MyWordType } from '@/entities/Word/types/word.types';
import { ChangeTranslateProps } from '@/features/changeMyTranslate/types/changeMyTranslate.types';

export interface TranslatesProps extends ChangeTranslateProps {
    className?: string
    changeTranslatesCallback: (myTranslates: MyWordType['myTranslates']) => void,
}

export const Translates = memo((props: TranslatesProps) => {
    const {
        className,
        changeTranslatesCallback,
        translates,
        myTranslates,
        id,
    } = props;
    const [exactlyValue, setExactlyValue] = useState('');

    const postChangeMyTranslateCallback = useCallback<AddMyTranslateProps['addTranslateCallback']>((data) => {
        setExactlyValue('');
        changeTranslatesCallback(data);
    }, [changeTranslatesCallback]);

    return (
        <HStack
            className={classNames(cls.Translates, {}, [className])}
        >
            {translates.map((translate, index) => (
                <Translate
                    error={translate === exactlyValue ? 'Перевод уже написан' : null}
                    key={translate}
                    value={translate}
                    disabled
                />
            ))}
            {myTranslates?.map((translate, index) => (
                <Delete
                    key={translate}
                    value={translate}
                    {...{ translates, myTranslates, id }}
                    deleteTranslateCallback={postChangeMyTranslateCallback}
                >
                    <Update
                        updateTranslateCallback={postChangeMyTranslateCallback}
                        index={index}
                        value={translate}
                        {...{ translates, myTranslates, id }}
                    >
                        <Translate
                            error={translate === exactlyValue ? 'Перевод уже написан' : null}
                            value={translate}
                        />
                    </Update>
                </Delete>
            ))}
            <Add
                {...{ translates, myTranslates, id }}
                onChange={(event) => {
                    setExactlyValue(event.currentTarget.value);
                }}
                addTranslateCallback={postChangeMyTranslateCallback}
            >
                <Translate value="" />
            </Add>
        </HStack>
    );
});
