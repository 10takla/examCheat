import {TypeTemplate} from "../const/templates";
import mutateFirsLetter from "../lib/mutateFirsLetter";

export type CLIArgName = 'typeTemplate' | 'pathToDir' | 'name'


export interface CLIArgs extends Partial<Record<CLIArgName, any>> {
    typeTemplate: TypeTemplate,
    pathToDir: string,
    name?: Name,
}

export interface Check {
    check: boolean,
    errorMessage?: string,
    nextCheck?: Check
}
export interface ValidateArg {
    propName: CLIArgName,
    checks: Array<Check>,
    baseErrorMessage?: string
}

export type Name = ReturnType<typeof mutateFirsLetter>
