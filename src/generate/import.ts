import * as t from '@babel/types'
import generate from './base'

export function generateImport(node: t.ImportDeclaration) {
    const { code } = generate(node)
    return code.replace('lodash', 'lodash-es') + '\n'
}
