import getBtn from './getBtn';

export default async (pageN: number) => {
    await new Promise((resolve) => {
        const interval = setInterval(() => {
            // eslint-disable-next-line no-use-before-define
            if (getBtn(pageN)
                .hasClass('active')) {
                clearInterval(interval);
                resolve(null);
            }
        }, 100);
    });
};
