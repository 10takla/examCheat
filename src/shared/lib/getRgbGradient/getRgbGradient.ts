import convert from 'color-convert';

interface GetRgbGradientProps {
    degree?: number
    start?: [number, number, number]
}

export default (num: number, { degree = 1, start = [255, 0, 0] }: GetRgbGradientProps) => {
    const hsv = convert.rgb.hsv(start);
    hsv[0] = (hsv[0] + num * degree * 40) % 360;
    hsv[2] = 90;
    const [r, g, b] = convert.hsv.rgb(hsv);
    return `rgb(${[r, g, b].join(', ')})`;
};
