export default (value: string) => ({
    upper: value.slice(0, 1).toUpperCase() + value.slice(1),
    lower: value.slice(0, 1).toLowerCase() + value.slice(1),
});
