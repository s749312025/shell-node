<template>
    <div>
        <el-dialog title="sh内容" :visible.sync="dialog" center width="660px" top="50px">
            <div v-if="!isReadonly && isAdmin" class="marginB-10">
                <el-input v-model="name" placeholder="文件名，包含后缀(.sh)"></el-input>
            </div>
            <div>
                <prism-editor class="my-editor" v-model="content" line-numbers :readonly="isReadonly && !isAdmin" :highlight="highlighter"></prism-editor>
            </div>
            <div slot="footer">
                <el-button type="primary" @click="handleSubmit">确定</el-button>
                <el-button type="primary" v-if="isAdmin" @click="save">保存</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import { PrismEditor } from 'vue-prism-editor'
import 'vue-prism-editor/dist/prismeditor.min.css'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-bash'
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
            isAdmin: localStorage.egg == 'true',
            name: '',
            isReadonly: true,   // 只读   true 即为edit
            dialog: !!this.value,
            content: '',
        }
    },
    methods: {
        highlighter(code) {
            return highlight(code, languages.bash) // languages.<insert language> to return html with markup
        },
        async handleSubmit() {
            this.dialog = false
        },
        async save() {
            const data = await this.$fetch('command/saveSh', {name: this.name, content: this.content})
            if (data.status == 0) {
                this.$emit('success')
                this.$message.success('保存成功')
            }
        },
        async getDetails() {
            const data = await this.$fetch('command/getDetails', { name: this.exData.name })
            if (data.status == 0) {
                this.name = this.exData.name
                this.content = data.content
            }
        },
    },
    mounted() {
        if (this.exData.name) {
            this.getDetails()
            this.isReadonly = true
        } else {
            this.isReadonly = false
            this.content = `#!/bin/sh

            `
        }
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
