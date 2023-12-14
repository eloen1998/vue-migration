import { expect, test, describe } from 'vitest'
import fs from 'fs'
import { parse } from '../src/core/parse'
import { generateImport, generateProps } from '../src/generate'
import * as t from '@babel/types'

function getSingleNode(code) {
    const ast = parse(code)

    return ast.program.body[0]
}

function getSpecialNode(type: string) {
    const code = fs.readFileSync('test/index.js', 'utf-8')
    const ast = parse(code)

    let result: t.ObjectExpression | undefined

    ast.program.body.forEach(node => {
        if (node.type === 'ExportDefaultDeclaration') {
            if (node.declaration.type === 'ObjectExpression') {
                node.declaration.properties.forEach(node => {
                    if (node.type === 'ObjectProperty') {
                        if (node.key.type === 'Identifier') {
                            if (node.key.name === type) {
                                result = node.value as t.ObjectExpression
                            }
                        }
                    }
                })
            }
        }
    })
    return result
}

describe('测试generateImport方法', () => {
    test('lodash转lodash-es', () => {
        const ast = getSingleNode('import { isString } from "lodash";') as t.ImportDeclaration
        const code = generateImport(ast)
        // expect(code).toEqual('import { isString } from "lodash-es";\n')
        expect(code).toMatchInlineSnapshot(`
          "import { isString } from \\"lodash-es\\";
          "
        `)
    })
})

describe('测试export中的转换', () => {
    test('props转换', () => {
        const ast = getSpecialNode('props')
        if (!ast) {
            throw new Error('不存在该类型节点')
        }
        const value = generateProps(ast)
        expect(value.code).toMatchInlineSnapshot(`
          "const propsData = defineProps({
            value: {
              type: String | Array,
              default: ''
            }
          });
          "
        `)
    })
})
