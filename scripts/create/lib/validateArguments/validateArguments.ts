import { type Check, type ValidateArg } from '../../types/args';

const deepCheck = ({ nextCheck, errorMessage, check }: Check): string | undefined => {
    if (check) {
        if (nextCheck) {
            return deepCheck(nextCheck);
        }
        return '';
    }
    return errorMessage;
};

export default (argsValidates: ValidateArg[], isTest?: boolean) => {
    const errors = argsValidates.reduce((all, { checks, baseErrorMessage }, index) => {
        const checksErrors = checks.map((check) => deepCheck(check))
            .filter((errorMessage) => errorMessage !== '')
            .map((errorMessage) => errorMessage ?? baseErrorMessage);
        if (checksErrors.length > 0) {
            if (isTest) {
                all.push(checksErrors);
            }
            all.push(`Укажите (${index + 1} аргументом)${checksErrors.length === 1 ? ' ' : ':'}${
                checksErrors.length === 1
                    ? checksErrors[0]
                    : `\n${checksErrors.map((e, i) => `\t${e}`).join('\n')}`
            }`);
        }
        return all as string[];
    }, []);

    if (isTest) {
        return errors;
    }

    if (errors.length > 0) {
        throw Error(errors.join('\n\n'));
    }

    return null;
};
