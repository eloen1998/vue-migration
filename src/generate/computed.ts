import generate from './base'
import { getKeys } from './utils'
import * as t from '@babel/types'
import { UN_IDENTIFIED } from '../config'
import { generateLeadingComments } from './utils'

export function generateComputed(node: t.ObjectExpression) {
    let result = '/** computed */\n'
    node.properties.forEach(node => {
        result += generateLeadingComments(node)
        if (node.type === 'ObjectMethod') {
            result += generateObjectMethod(node)
        }
        if (node.type === 'ObjectProperty') {
            result += generateObjectProperty(node)
        }
        if (node.type === 'SpreadElement') {
            // 形似...mapState的写法
            result += `/*\n${generate(node).code}*/`
        }
    })
    return {
        code: result,
        keys: getKeys(node)
    }
}

function generateObjectMethod(node: t.ObjectMethod) {
    let variableName = UN_IDENTIFIED
    if (node.key.type === 'Identifier') {
        variableName = node.key.name
    }
    return `const ${variableName} = computed(() => ${generate(node.body).code})\n`
}

function generateObjectProperty(node: t.ObjectProperty) {
    const { key, value } = node
    let variableName = UN_IDENTIFIED
    if (key.type === 'Identifier') {
        variableName = key.name
    }
    return `const ${variableName} = computed(${generate(value).code})\n`
}
