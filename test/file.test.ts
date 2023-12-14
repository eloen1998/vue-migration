import fs from 'fs'
import { transformScript } from '../src/core'
import { expect, test, describe } from 'vitest'

describe('整体测试', () => {

    test('语法转换', () => {

        const code = fs.readFileSync('test/input.js', 'utf-8')

        const result = transformScript(code)
        expect(result).matchSnapshot()
    })
})
