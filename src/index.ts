import { transformScript } from './core'
export default transformScript

// import { transformScript } from './core'

// const code = `
// import { isArray, isNil, isString } from 'lodash';
// export default {
//     props: {
//         value: {
//             type: String | Array,
//             default: ''
//         }
//     },
//     filters: {
//         show(val) {
//             if (isNil(val) || val === '') {
//                 return '- -';
//             }
//             return val;
//         }
//     },
//     computed: {
//         list() {
//             return isArray(this.value) ? this.value : [this.value];
//         }
//     },
//     methods: {
//         isImage(url) {
//             return isString(url) && /\.(png|jpg|jpeg|gif|bmp|webp|svg|tiff|ico)$/i.test(url);
//         }
//     }
// };`

// transformScript(code)
