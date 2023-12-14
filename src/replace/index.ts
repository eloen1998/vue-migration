
import { keysMap } from '../types'

export function replaceThis(code: string, param: keysMap) {
    return code.replace(/this\.([a-zA-Z_$][a-zA-Z0-9_$]*)/g, (subString: string, group1: string) => {
        const key = group1.trim()

        if ([...param.dataKey, ...param.computedKey].includes(key)) {
            return `${key.trim()}.value`
        }
        if (param.propsKey.includes(key)) {
            return `propsData.${key.trim()}`
        }
        if (key === '$router') {
            return 'router'
        }
        if (key === '$route') {
            return 'route'
        }

        return key.trim()
    })
}

export function replaceRefs(code: string) {
    return code.replace(/this\.\$refs([a-zA-Z_$][a-zA-Z0-9_$]*)/g, (subString: string, key: string) => {
        return key.trim()
    })
}

/**
 * 字符串的 replace 方法，第二个参数为函数时
 * 每一次匹配到内容，都会执行该函数
 * 该函数的参数
 * 第一个：匹配到的字符串
 * 第二个-第n个： 匹配到的组信息，即正则中小括号括起来的部分，有几个小括号，这里就有几个对应的参数
 * 倒数第二个参数：匹配到的字符串在原始字符串中的位置
 * 最后一个参数：原始字符串
 * 返回值： 用于替换匹配的字符串 即第一个参数
 */
