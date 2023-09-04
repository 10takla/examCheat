import type mutateFirsLetter from '../lib/mutateFirsLetter';
import { type Template } from './templates/shared';

export type CLIArgName = 'template' | 'pathToDir' | 'name'
export type Name = ReturnType<typeof mutateFirsLetter>

export interface CLIArgs extends Partial<Record<CLIArgName, any>> {
    template: Template
    pathToDir: string
    name?: Name
    isRootDir: boolean
}

export interface Check {
    check: boolean
    errorMessage?: string
    nextCheck?: Check
}

export interface ValidateArg {
    propName: CLIArgName
    checks: Check[]
    baseErrorMessage?: string
}
