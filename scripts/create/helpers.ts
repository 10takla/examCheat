export const mutateFirstLetter = <T extends string>(str: T) => ([
    str.slice(0, 1).toUpperCase() + str.slice(1),
    str.slice(0, 1).toLowerCase() + str.slice(1)
] as [T, T])
