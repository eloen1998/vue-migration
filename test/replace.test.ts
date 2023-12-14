import { replaceThis } from '../src/replace'
import { expect, test, describe } from 'vitest'

describe('replace测试', () => {
    test('data', () => {
        const code = 'this.key1 = 100'
        const result = replaceThis(code, {
            propsKey: [],
            dataKey: ['key1'],
            computedKey: []
        })
        expect(result).toBe('key1.value = 100')
    })

    test('route', () => {
        const code = 'const query = this.$route.query'
        const result = replaceThis(code, {
            propsKey: [],
            dataKey: [],
            computedKey: []
        })
        expect(result).toBe('const query = route.query')
    })
    test('route', () => {
        const code = 'const id = this.$route.query.id'
        const result = replaceThis(code, {
            propsKey: [],
            dataKey: [],
            computedKey: []
        })
        expect(result).toBe('const id = route.query.id')
    })
    test('router', () => {
        const code = 'this.$router.back()'
        const result = replaceThis(code, {
            propsKey: [],
            dataKey: [],
            computedKey: []
        })
        expect(result).toBe('router.back()')
    })
})
