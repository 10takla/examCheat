import fs from "fs/promises";
import path from "path";

export default (pathToDir: string, name: string | undefined, callback: (dirPath: string) => void)=> {
    new Promise<string>(resolve => {
        if (name) {
            fs.mkdir(path.resolve(pathToDir, name), {})
                .then(() => {
                    resolve(path.resolve(pathToDir, name))
                })
        } else {
            resolve(pathToDir)
        }
    })
        .then((dirPath) => {
            callback(dirPath)
        })
}
