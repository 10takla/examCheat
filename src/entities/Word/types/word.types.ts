export type Translate = string
export interface WordType<W = string> {
    id: W
    wordOnEng: W
    translates: Translate[]
    myTranslates: Translate[]
    transcriptOnEng: string
    transcriptOnRus: string
    difficultyLevel: number
    voicing: string
}

export interface MyWordType{
    id: WordType['id']
    wordId: WordType['id']
    word: WordType
    myTranslates: WordType['myTranslates']
}
