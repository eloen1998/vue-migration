import { parse } from './parse'
import { generateImport, generateProps, generateData, generateComputed, generateMethod, generateWatch, wrapWithComment } from '../generate'
import { replaceThis, replaceRefs } from '../replace'

import type { ExportDefaultDeclaration, ObjectExpression } from '@babel/types'
import { generateCreated } from 'src/generate/created'
import { keysMap } from '../types'

export function transformScript(code: string) {
    const ast = parse(code)
    let result = ''

    const body = ast.program.body

    body.forEach(node => {
        if (node.type === 'ImportDeclaration') {
            result += generateImport(node)
        }

        if (node.type === 'ExportDefaultDeclaration') {
            const vueResult = formatExport(node)
            let code = replaceRefs(vueResult.code)
            code = replaceThis(code, vueResult.keysMap)
            result += code
        }
    })
    return result
}

function formatExport(node: ExportDefaultDeclaration) {
    let result = ''
    const keysMap: keysMap = {
        propsKey: [],
        dataKey: [],
        computedKey: []
    }
    if (node.declaration.type === 'ObjectExpression') {
        node.declaration.properties.forEach(node => {
            if (node.type === 'ObjectProperty') {
                if (node.key.type === 'Identifier') {
                    const { name } = node.key
                    if (name === 'props') {
                        const { code, keys } = generateProps(node.value as ObjectExpression)
                        result += code
                        keysMap.propsKey = keys
                    } else if (name === 'computed') {
                        const { code, keys } = generateComputed(node.value as ObjectExpression)
                        result += code
                        keysMap.computedKey = keys
                    } else if (name === 'filters') {
                        result += generateMethod(node.value as ObjectExpression, 'filters')
                    } else if (name === 'methods') {
                        result += generateMethod(node.value as ObjectExpression)
                    } else if (name === 'watch') {
                        result += generateWatch(node.value as ObjectExpression)
                    } else if (name === 'mixins') {
                        result += wrapWithComment(node.value as ObjectExpression, 'mixins')
                    }
                }
            }
            if (node.type === 'ObjectMethod') {
                if (node.key.type === 'Identifier') {
                    const { name } = node.key
                    if (name === 'data') {
                        const returnStatement = node.body.body.at(-1)
                        if (returnStatement && returnStatement.type === 'ReturnStatement' && returnStatement.argument?.type === 'ObjectExpression') {
                            const { code, keys } = generateData(returnStatement.argument)
                            result += code
                            keysMap.dataKey = keys
                        }
                    } else if (name === 'created') {
                        result += '/** created */\n'
                        result += generateCreated(node.body)
                    } else if (name === 'mounted') {
                        result += `onMounted(() => {\n${generateCreated(node.body)}})\n`
                    } else if (name === 'destroyed') {
                        result += `unmounted(() => {\n${generateCreated(node.body)}})\n`
                    } else if (name === 'beforeDestroy') {
                        result += `onBeforeUnmount(() => {\n${generateCreated(node.body)}})\n`
                    }
                }
            }
        })
    }
    return {
        code: result,
        keysMap
    }
}
