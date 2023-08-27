import path from "path";
import fs from "fs/promises";
import {default as Fs, PathLike} from "fs";
import tsx from "../templates/tsx";
import moduleScss from "../templates/module.scss";
import storiesTsx from "../templates/stories.tsx";
import {mutateFirstLetter} from "../helpers";
import {Name} from "../types";

export const createRC = async (dirPath: string, name: Name) => {
    const projectDir = process.cwd()
    const componentFullName = path.resolve(projectDir, 'src', dirPath as string, name)

    try {
        await fs.mkdir(componentFullName)
        try {
            const [upperName, lowerName] = mutateFirstLetter(name)
            await fs.writeFile(path.resolve(componentFullName, `${upperName}.tsx`, ), tsx({upperName}))
            await fs.writeFile(path.resolve(componentFullName, `${upperName}.module.scss`), moduleScss({upperName}))
            await fs.writeFile(path.resolve(componentFullName, `${upperName}.stories.tsx`), storiesTsx({path: componentFullName, upperName}))
        } catch (e){
            console.log(e.message)
        }
        console.log(`Создан компанент: ${componentFullName}`)
    } catch (e) {
        console.log('Компанент уже существует')
    }
}
