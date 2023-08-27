import {createRC} from "./reactComponent";
import {PathLike,} from "fs";
import {Name} from "./types";

enum TemplateType {
    RC = 'rc'
}

const args = {
    typeTemplate: {
        value: process.argv[2] as (TemplateType | undefined),
        direction: `один из типов шаблонов: ${Object.values(TemplateType).join(', ')}`,
    },
    pathToCreate: {
        value: process.argv[3] as (PathLike | undefined),
        direction: `путь к директории, где нужно создать компанент`,
    },
    name: {
        value: process.argv[4] as (Name | undefined),
        direction: `имя компанента`,
    }
}

function main() {
    Object.values(args).forEach(({value, direction}, index) => {
        if (!value) {
            throw Error(`Укажите (${index + 1} аргументом) ${direction}.`);
        }
    })
    const {
        typeTemplate: {value: typeTemplate},
        pathToCreate: {value: pathToCreate},
        name: {value: name}
    } = args

    switch (typeTemplate){
        case TemplateType.RC:
            createRC(pathToCreate as string, name)
            break
    }
}

try {
    main()
} catch (e) {
    console.log(e.message)
}

