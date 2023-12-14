import { tokenQa } from './constant'
export default {
    mixins: [tokenQa],
    props: {
        prop1: {
            type: String | Array,
            default: ''
        },
        prop2: String
    },
    data() {
        return {
            // 第一个key
            key1: 0,
            key2: 'string',
            key3: [0, 1, 2],
            key4: {
                field1: '',
                field12: undefined
            },
            key5: [
                {
                    value: 1,
                    label: '选项1'
                }
            ],
            key6: tokenQa
        }
    },
    computed: {
        // 第一个computed
        key7() {
            return this.key1 + this.key2
        },
        key8: function () {
            return this.key1 + 3
        },
        key9: {
            get: function () {
                return this.key1 + 1
            },
            set: function (v) {
                this.key1 = v - 1
            }
        }
    },
    watch: {
        // 第一个watch
        watch1(n) {
            this.method2(n)
        },
        watch2(n, oldn) {
            this.method3(n, oldn)
        },
        watch3: {
            handler(n) {
                this.method2(n)
            },
            immediate: true,
            deep: true
        },
        watch4: (n, oldn) => {
            this.method3(n, oldn)
        }
    },
    filters: {
        // 第一个filter
        filter1(val) {
            return val + '1'
        },
        filter2: function (val) {
            return val + '2'
        }
    },
    // 这是created的说明
    created() {
        const id = this.$router.query.id
        this.method1(id)
    },
    // 这是mounted的说明
    mounted() {
        console.log('mounted')
    },
    // 这是beforeDestroy的说明
    beforeDestroy() {
        console.log('beforeDestroy')
    },
    methods: {
        /**
         * 打印id
         * @param {string} id
         */
        method1(id) {
            console.log('method1', id)
        },
        // 方法2
        method2: function () {
            console.log('method2')
        },
        method3: () => {
            // 方法3
            console.log('method3')
        }
    }
}
