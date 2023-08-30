import {Check, ValidateArg} from "../../types/args";

const deepCheck = ({nextCheck, errorMessage, check}: Check): string | undefined => {
    return (
        check ?
            nextCheck ? deepCheck(nextCheck)
                : ''
            : errorMessage
    )
}

export default (argsValidates: ValidateArg[], isTest?: boolean) => {
    const errors = argsValidates.map(({checks, baseErrorMessage}, index) => {
            const checksErrors = checks.map(check => deepCheck(check))
                .filter((errorMessage) => errorMessage !== '')
                .map(errorMessage => errorMessage ?? baseErrorMessage)
            if (checksErrors.length) {
                if(isTest){
                    return checksErrors
                } else {
                    return `Укажите (${index + 1} аргументом)${checksErrors.length === 1 ? ' ' : ':'}${
                        checksErrors.length === 1 ? checksErrors[0]
                            : `\n${checksErrors.map((e, i) => `\t${e}`).join('\n')}`
                    }`
                }

            }
        }
    ).filter(errorMessage => errorMessage)

    if (isTest){
        return errors
    }

    if (errors.length) {
        throw Error(errors.join('\n\n'))
    }
}
