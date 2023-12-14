import * as t from '@babel/types'

export function getKeys(node: t.ObjectExpression) {
    return node.properties
        .map(property => {
            if (property.type === 'SpreadElement') {
                // 形似...mapState的写法
            } else {
                return getKey(property)
            }
        })
        .filter(Boolean) as string[]
}

function getKey(node: t.ObjectProperty | t.ObjectMethod) {
    if (node.key.type === 'Identifier') {
        return node.key.name
    }
}

export function generateLeadingComments(node: t.Node) {
    if (node.leadingComments) {
        const comments = node.leadingComments
        node.leadingComments = null

        return comments
            .map(comment => {
                if (comment.type === 'CommentBlock') {
                    return `/*${comment.value}*/\n`
                }
                if (comment.type === 'CommentLine') {
                    return `// ${comment.value.trim()}\n`
                }
            })
            .join('')
    }
    return ''
}
