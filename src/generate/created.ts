import * as t from '@babel/types'
import generate from './base'

export function generateCreated(node: t.BlockStatement) {
    return node.body
        .map(child => {
            return generate(child).code + '\n'
        })
        .join('')
}
