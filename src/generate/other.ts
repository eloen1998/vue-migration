import * as t from '@babel/types'
import generate from './base'

export function wrapWithComment(node: t.Node, name: string) {
    return `/* ${name}\n${generate(node).code} */\n`
}
