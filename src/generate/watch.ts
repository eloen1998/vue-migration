import * as t from '@babel/types'
import generate from './base'
import { UN_IDENTIFIED } from '../config'
import { generateLeadingComments } from './utils'

export function generateWatch(node: t.ObjectExpression) {
    let result = '/** watch */\n'
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
    let variableName = UN_IDENTIFIED
    if (node.key.type === 'Identifier') {
        variableName = node.key.name
    }

    return `watch(${variableName}, (${node.params.map(param => generate(param).code).join(',')}) => ${generate(node.body).code})\n`
}

function generateObjectProperty(node: t.ObjectProperty) {
    const { key, value } = node
    let variableName = UN_IDENTIFIED
    if (key.type === 'Identifier') {
        variableName = key.name
    }

    const options: string[] = []

    let handlerStr = ''

    if (value.type === 'ArrowFunctionExpression') {
        return `watch(${variableName}, ${generate(value).code})\n`
    }
    if (value.type === 'ObjectExpression') {
        value.properties.forEach(node => {
            if (node.type === 'ObjectMethod' && node.key.type === 'Identifier' && node.key.name === 'handler') {
                handlerStr = `(${node.params.map(param => generate(param).code).join(',')}) => ${generate(node.body).code}`
            }
            if (node.type === 'ObjectProperty' && node.key.type === 'Identifier') {
                if (node.value.type === 'BooleanLiteral' && node.value.value === true) {
                    // immediate 或 deep
                    options.push(node.key.name)
                }
            }
        })
    }

    let optionsStr = ''
    if (options.length) {
        optionsStr = `,\n{\n${options.map(item => `${item}: true`).join(',\n')}}`
    }

    return `watch(${variableName}, ${handlerStr}${optionsStr})\n`
}
