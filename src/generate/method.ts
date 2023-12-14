import generate from './base'
import * as t from '@babel/types'
import { UN_IDENTIFIED } from '../config'
import { generateLeadingComments } from './utils'

export function generateMethod(node: t.ObjectExpression, type: string = 'methods') {
    let result = `/** ${type} */\n`
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
    return result
}

function generateObjectMethod(node: t.ObjectMethod) {
    const code = generate(node).code

    if (node.async) {
        return code.replace('async', 'async function')
    }
    return `function ${code} \n`
}

function generateObjectProperty(node: t.ObjectProperty) {
    const { key, value } = node
    let funName = UN_IDENTIFIED
    if (key.type === 'Identifier') {
        funName = key.name
    }

    return `const ${funName} = ${generate(value).code}\n`
}
