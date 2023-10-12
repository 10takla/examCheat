export default (degree: number, max: number = 10) => {
    let [r, g, b] = [0, 0, 0];
    //
    // const part = (max / 3);
    //
    // if (degree < part) {
    //     const percent = (degree - 1) / part;
    //     r = 255;
    //     // eslint-disable-next-line no-mixed-operators
    //     g = Math.round((1 / 255) * (degree / 3));
    //     b = 0;
    // }
    // if (part < degree && degree < part * 2) {
    //     const percent = (degree - 5) / part;
    //     r = 255;
    //     g = Math.round(255 * (1 - percent));
    //     b = 0;
    // }
    // if (part * 2 < degree && degree < part * 3) {
    //     const percent = (degree - 5) / part;
    //     r = 255;
    //     g = 0;
    //     b = Math.round(255 * (1 - percent));
    // }

    // if (degree < (max / 2)) {
    //     const percent = (degree - 1) / (max / 2);
    //     r = Math.round(255 * percent);
    //     g = 255;
    // } else {
    //     const percent = (degree - 5) / (max / 2);
    //     g = Math.round(255 * (1 - percent));
    //     r = 255;
    // }
    degree = Math.min(Math.max(degree, 0), max);

    // Вычислите прогресс в диапазоне [0, 1]
    const progress = (degree - 0) / (max - 0);

    // Преобразуйте прогресс в компоненты RGB
    r = Math.round(255 * progress);
    g = Math.round(255 * (1 - Math.abs(0.5 - progress)) * 2);
    b = Math.round(255 * (1 - progress));
    return [r, g, b];
};
