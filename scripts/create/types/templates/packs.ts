import {DeepPartial} from "./shared";
import {CombineThree, CombineThreeRules} from "./combines";

export type TemplatePack = 'pc' | 'pa'

type PackThreeRules = {
    [key in TemplatePack]: CombineThreeRules
}

export interface PacksThree extends DeepPartial<PackThreeRules> {
    pc: {
        rc: CombineThree['rc']
        ml: CombineThree['ml']
    },
    pa: {
        rc: CombineThree['rc']
        api: CombineThree['api']
    }
}

export type TemplatePacks = {
    [K in keyof PacksThree]:
    Array<[keyof PacksThree[K], string]>
}
