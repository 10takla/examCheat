import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './VoicingAndTranscript.module.scss';
import { Voicing, VoicingProps } from '@/shared/ui/Word/VoicingAndTranscript/ui/Voicing/Voicing';
import { VStack } from '@/shared/ui/Stack';
import { WordType } from '@/entities/Word';

export interface VoicingAndTranscriptProps extends Pick<VoicingProps, 'voicing'>,
    Pick<WordType, 'transcriptOnEng' | 'transcriptOnRus'> {
    className?: string
}

export const VoicingAndTranscript = memo((props: VoicingAndTranscriptProps) => {
    const {
        className,
        voicing,
        transcriptOnEng,
        transcriptOnRus,
    } = props;

    return (
        <VStack
            className={classNames(cls.VoicingAndTranscript, {}, [className])}
            align="center"
            justify="center"
        >

            <span className={cls.transcript}>{transcriptOnEng}</span>
            <Voicing
                className={cls.voicing}
                voicing={voicing}
            />
            <span className={cls.transcript}>{transcriptOnRus}</span>
        </VStack>
    );
});
