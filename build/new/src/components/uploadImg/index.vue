<template>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%">
        
            <el-upload
                :multiple="false"
                :show-file-list="false"
                :on-success="handleImageSuccess"
                class="image-uploader"
                :headers="header"
                drag
                action="/api/file_upload"
            >
                <i class="el-icon-upload" />
                <div class="el-upload__text">
                    将文件拖到此处，或<em>点击上传</em>
                </div>
                
            </el-upload>

                <div class="image-preview">
                    <div v-show="imageUrl.length>1" class="image-preview-wrapper">
                        <!-- <img :src="imageUrl"> -->
                        <el-avatar shape="square" :size="80" fit="fill" :src="imageUrl"></el-avatar>
                    </div>
                </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="submit">确 定</el-button>
        </span>
    </el-dialog>

</template>

<script>
import Cookies from 'js-cookie'
export default {
    props: {
        otherParams: {
            type: Object,
            default: {}
        },
        value: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            imageUrl: '',
            header: {
                'X-TOKEN': Cookies.get('vue_token_zhan_damaijia'),
            },
            dialogVisible: !!this.value
        }
    },
    methods: {
        submit() {
            this.$emit('success', {img: this.imageUrl, otherParams: this.otherParams})
            this.dialogVisible = false
        },
        handleImageSuccess(res, file) {
            if (res.status == 0) {
                this.imageUrl = res.data
            }
            
            // this.imageUrl = URL.createObjectURL(file.raw);
        },
        // handleAvatarSuccess(res, file) {
        //     this.imageUrl = URL.createObjectURL(file.raw);
        // },
    },
    watch: {
        dialogVisible(newValue, oldValue) {
            this.$emit('input', newValue)
        }
    },
}
</script>

<style lang="scss" scoped>
.image-uploader {
    position: relative;
    .image-preview {
        position: absolute;

    }
}
</style>