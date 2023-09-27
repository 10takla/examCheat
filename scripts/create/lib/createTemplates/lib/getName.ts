export default (...args: (string | undefined)[]) => (
    args.filter((o) => o).join('.')
);
