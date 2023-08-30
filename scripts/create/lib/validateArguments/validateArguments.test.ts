import validateArguments from "./validateArguments";
import {ValidateArg} from "../../types/args";

describe('validateArguments', () => {
    test('without checking of argument', () => {
        const baseError = 'some value'
        const argsValidates: Partial<ValidateArg>[] = [
            {
                baseErrorMessage: baseError,
                checks: []
            }
        ]
        expect(() => validateArguments(argsValidates as ValidateArg[])).not.toThrowError();
    })
    test('checking of one error without messageError', () => {
        const baseError = 'some value'
        const argsValidates: ValidateArg[] = [
            {
                propName: 'typeTemplate',
                baseErrorMessage: baseError,
                checks: [
                    {
                        check: false,
                    }
                ]

            }
        ]
        expect(() => validateArguments(argsValidates)).toThrowError(
            `Укажите (1 аргументом) ${baseError}`
        );
    })
    test('with 2 level tree checks', () => {
        const baseError = 'some value'
        const argsValidates: ValidateArg[] = [
            {
                propName: 'typeTemplate',
                baseErrorMessage: baseError,
                checks: [
                    {
                        check: true,
                        errorMessage: 'уровень 1',
                        nextCheck: {
                            check: false,
                            errorMessage: 'уровень 2',
                        }
                    }
                ]

            }
        ]
        expect(() => validateArguments(argsValidates)).toThrowError(
            `Укажите (1 аргументом) уровень 2`
        );
    })
    test('with multi-checks', () => {
        const baseError = 'some value'
        const argsValidates: ValidateArg[] = [
            {
                propName: 'typeTemplate',
                baseErrorMessage: baseError,
                checks: [
                    {
                        check: false,
                        errorMessage: 'проверка 1 уровень 1',
                        nextCheck: {
                            check: false,
                            errorMessage: 'проверка 2 уровень 2',
                        }
                    },
                    {
                        check: true,
                        errorMessage: 'проверка 2 уровень 1',
                    },
                    {
                        check: false,
                        errorMessage: 'проверка 3 уровень 1',
                    },
                    {
                        check: true,
                        errorMessage: 'проверка 4 уровень 1',
                        nextCheck: {
                            check: false,
                            errorMessage: 'проверка 4 уровень 2',
                        }
                    }
                ]

            }
        ]
        expect(validateArguments(argsValidates, true)).toEqual([
            [
                'проверка 1 уровень 1',
                'проверка 3 уровень 1',
                'проверка 4 уровень 2'
            ]
        ]);
    })
})
