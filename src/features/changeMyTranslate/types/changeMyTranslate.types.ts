import { HTMLProps } from 'react';
import { WordType } from '@/entities/Word';
import { MyWordType } from '@/entities/Word/types/word.types';
import { InputRef } from '@/shared/ui/Input/Input';

export interface ChangeTranslateProps extends ReplaceFields<
    HTMLProps<InputRef>,
    Pick<WordType, 'translates' | 'id'>
>, Pick<MyWordType, 'myTranslates'> {

}

export type ChangeCallback = (myTranslates: MyWordType['myTranslates']) => void
