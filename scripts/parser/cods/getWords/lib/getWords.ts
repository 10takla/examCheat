import $ from 'jquery';
import getBtn from './getBtn';
import waitingRows from './waitingRows';

const getWordsFromPage = () => {
    const rows: any[] = [];
    $('tbody tr[role="row"]')
        .each(function () {
            const td = $(this)
                .children('td');

            // eslint-disable-next-line max-len
            const difficultyLevel = parseInt(td.eq(0)
                .children('.rating')
                .attr('class')!.match(/rating(\d+(\.\d+)?)/)![1] as string, 10);
            const wordOnEng = td.eq(1)
                .children('b')
                .text();
            const transcriptOnEng = td.eq(2)
                .children('.sound')
                .text();
            const transcriptOnRus = td.eq(2)
                .children('.small')
                .text();
            const voicing = (() => {
                const audioName = td.eq(2)
                    .children('small')
                    .attr('data-audio');
                return `https://poliglot16.ru/audio/words/${audioName?.[3]}/${audioName}`;
            })();
            const translates = td.eq(3)
                .find('span')
                .text().split('; ');

            rows.push({
                id: wordOnEng,
                difficultyLevel,
                wordOnEng,
                voicing,
                transcriptOnEng,
                transcriptOnRus,
                translates,
            });
        });
    return rows;
};

const onCLick = async (pageN: number) => {
    // @ts-ignore
    const nextBtn = getBtn(pageN);

    await new Promise((resolve) => {
        nextBtn.on('click', async () => {
            await waitingRows(pageN);
            resolve(null);
        });
        nextBtn.trigger('click');
    });
};

export default async () => {
    const rows = [];
    let pageN = 1;
    const pagesCount = parseInt($('.paginate_button:not(.next):last')
        .text(), 10);
    console.log('...парсинг');
    for (; pageN <= (pagesCount); pageN += 1) {
        // eslint-disable-next-line no-await-in-loop
        await onCLick(pageN);
        const item = getWordsFromPage();
        rows.push(...item);
    }
    return rows;
};
