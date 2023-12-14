import * as t from '@babel/types'
import generate from './base'
import { getKeys } from './utils'

export function generateProps(node: t.ObjectExpression) {
    const { code } = generate(node)
    return {
        code: `const propsData = defineProps(${code});\n`,
        keys: getKeys(node)
    }
}
