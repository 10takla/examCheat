export default (degree: number, max: number) => {
    let [red, green, blue] = [0, 0, 0];

    const part = (max / 3);

    if (degree < part) {
        const percent = (degree - 1) / part;
        red = Math.round(255 * percent);
        green = 255;
        blue = 0;
    }
    if (part < degree && degree < part * 2) {
        const percent = (degree - 5) / part;
        green = Math.round(255 * (1 - percent));
        red = 255;
        blue = 0;
    }
    if (part * 2 < degree && degree < part * 3) {
        const percent = (degree - 5) / part;
        blue = Math.round(255 * (1 - percent));
        red = 255;
    }
};
