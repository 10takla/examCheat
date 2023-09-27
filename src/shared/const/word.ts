import { WordType } from '@/entities/Word';

export const emptyWord: WordType = {
    id: '',
    wordOnEng: '',
    translates: [],
    myTranslates: [],
    transcriptOnEng: '',
    transcriptOnRus: '',
    difficultyLevel: 1,
    voicing: '',
};
