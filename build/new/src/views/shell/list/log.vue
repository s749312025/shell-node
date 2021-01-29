<template>
    <div>
        <el-dialog title="log" :visible.sync="dialog" center width="880px" top="50px">
            <div>
                <prism-editor class="my-editor" v-model="content" readonly :highlight="highlighter" line-numbers></prism-editor>
            </div>
            <div class="flex align-center marginT-20">
                <div class="fw-bold">保持底部：</div>
                <el-switch
                    v-model="isBottom"
                    active-text="开启"
                    inactive-text="关闭">
                </el-switch>
            </div>
            <div>
                <el-button type="daner" @click="clear">清空</el-button>
            </div>
            <div slot="footer">
                <el-button type="primary" @click="handleSubmit">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-vim'
import 'prismjs/themes/prism-tomorrow.css'
export default {
    props: {
        value: {
            type: Boolean,
            default: true,
        },
        exData: {
            type: Object,
            default: {},
        },
    },
    components: {
        PrismEditor,
    },
    data() {
        return {
            windowTime: undefined,
            isBottom: true,
            dialog: !!this.value,
            content: '',
        }
    },
    methods: {
        scrollBottom() {
            let div = document.getElementsByClassName('prism-editor-wrapper')[0]
            div.scrollTop = div.scrollHeight
        },
        highlighter(code) {
            return highlight(code, languages.vim) // languages.<insert language> to return html with markup
        },
        async handleSubmit() {
            this.dialog = false
        },
        async clear() {
            const data = await this.$fetch('command/clear', { name: this.exData.name })
            if (data.status == 0) {
                this.content = ''
            }
        },
        async getDetails() {
            const data = await this.$fetch('command/getLog', { name: this.exData.name })
            if (data.status == 0) {
                this.content = data.content
                if (this.isBottom) {
                    this.scrollBottom()
                }
                this.windowTime = setTimeout(() => {
                    this.getDetails()
                },2000)
            }
        },
    },
    mounted() {
        this.getDetails()
        setTimeout(() => {
            this.scrollBottom() 
        }, 300);
        
    },
    destroyed () {
        this.windowTime = undefined
    },
    watch: {
        dialog(val) {
            if (!val) this.$emit('input', val)
        },
    },
}
</script>
<style lang="scss">
.my-editor {
    height: 600px;
    /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
    background: #2d2d2d;
    color: #ccc;

    /* you must provide font-family font-size line-height. Example: */
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
    outline: none;
}
.footer-btn {
    margin-top: -30px;
}
</style>
