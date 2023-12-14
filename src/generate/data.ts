import * as t from '@babel/types'
import generate from './base'
import { getKeys, generateLeadingComments } from './utils'

import { UN_IDENTIFIED } from '../config'

export function generateData(node: t.ObjectExpression) {
    let result = ''

    node.properties.forEach(node => {
        result += generateLeadingComments(node)
        if (node.type === 'ObjectProperty') {
            result += generateDataProperty(node)
        }
    })
    return {
        code: result,
        keys: getKeys(node)
    }
}

function generateDataProperty(node: t.ObjectProperty) {
    const { key, value } = node
    let variableName = UN_IDENTIFIED
    if (key.type === 'Identifier') {
        variableName = key.name
    }

    return `const ${variableName} = ref(${generate(value).code})\n`
}
