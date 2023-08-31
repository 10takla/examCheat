import mutateFirsLetter from "../lib/mutateFirsLetter";
import {Template} from "./templates";

export type CLIArgName = 'template' | 'pathToDir' | 'name'


export interface CLIArgs extends Partial<Record<CLIArgName, any>> {
    template: Template,
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
