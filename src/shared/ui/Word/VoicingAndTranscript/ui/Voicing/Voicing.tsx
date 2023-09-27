import {
    memo, useCallback, useRef, useState,
} from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Voicing.module.scss';
import VoiceSvg from '@/shared/assets/icons/voicing.svg';
import Description from '@/shared/ui/Description/Description';
import { WordType } from '@/entities/Word';

export interface VoicingProps {
    className?: string
    voicing: WordType['voicing']
}

export const Voicing = memo((props: VoicingProps) => {
    const {
        className,
        voicing,
    } = props;
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const [error, setError] = useState<string | null>(null);
    const onVoiceSvgClick = useCallback(async () => {
        if (audioRef.current?.readyState && audioRef.current?.readyState >= 2) {
            audioRef.current?.play();
            setIsPlaying(true);
            setError(null);
        } else {
            setError('Аудио не всроизводиться');
        }
    }, []);

    return (
        <>
            <Description
                className={classNames(
                    cls.Voicing,
                    {
                        [cls.active]: isPlaying,
                        [cls.error]: !!error,
                    },
                    [className],
                )}
                text={error ?? 'Произношение'}
            >
                <VoiceSvg
                    className={classNames(
                        cls.voicingSvg,
                        {
                            [cls.active]: isPlaying,
                            [cls.error]: !!error,
                        },
                    )}
                    onClick={onVoiceSvgClick}
                />
            </Description>
            <audio src={voicing} ref={audioRef} onEnded={() => setIsPlaying(false)}>
                <source src={voicing} type="audio/mp3" />
                <track kind="captions" srcLang="en" label="English Captions" />
                English Captions
            </audio>
        </>
    );
});
