import generator from '@babel/generator'
let generate = generator
// @ts-ignore 这里使用import语法会导致在使用traverse时出现问题：在执行测试用例时需要使用traverse.default，而在运行插件时需要使用traverse。
if (generator.default) {
    // @ts-ignore 同上原因
    generate = generator.default
}

export default generate