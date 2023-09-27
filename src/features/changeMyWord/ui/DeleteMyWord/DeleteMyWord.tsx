import {
    ForwardedRef, forwardRef, memo, ReactElement, useEffect, useState,
} from 'react';
import { CSSTransition } from 'react-transition-group';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './DeleteMyWord.module.scss';
import DeleteSvg from '@/shared/assets/icons/delete.svg';
import HStack from '@/shared/ui/Stack/HStack/HStack';
import { WordType } from '@/entities/Word';
import { useDeleteMyWord } from '@/features/changeMyWord/api/changeMyWord.api';

export interface DeleteMyWordProps {
    className?: string
    children: ReactElement
    wordId: WordType['id']
    onDelete?: (wordId: WordType['id']) => void
    isActive?: boolean
}

const DeleteMyWord = (props: DeleteMyWordProps, ref: ForwardedRef<HTMLElement>) => {
    const {
        className,
        children,
        wordId,
        onDelete,
        isActive = true,
    } = props;

    const [deleteMyWord, result] = useDeleteMyWord({});

    useEffect(() => {
        if (result.isSuccess) {
            onDelete?.(wordId);
        }
    }, [onDelete, result.isSuccess, wordId]);

    return (
        <HStack
            className={classNames(cls.DeleteMyWOrd, {}, [className])}
            gap="8"
        >
            <DeleteSvg
                className={classNames(cls.deleteBtn, { [cls.active]: isActive })}
                onClick={() => {
                    deleteMyWord(wordId);
                }}
            />
            {children}
        </HStack>
    );
};
export default memo(forwardRef(DeleteMyWord));
