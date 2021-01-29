<template>
    <div class="upload-wrapper">
        <el-upload
            class="avatar-uploader"
            action="/api/file_upload"
            accept="image/*"
            :show-file-list="false"
            :headers="header"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
    </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
    props: {
        type: {
            type: String,
            default: 'qrcode'
        },
        value: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            imageUrl: this.value,
            header: {
                'X-TOKEN': Cookies.get('vue_token_zhan_damaijia'),
            },
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
            console.log(res);
            if (res.status == 0) {
                this.$emit('input', res.data)
            }
            // this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isLt2M = file.size / 1024 / 1024 < 5;
            if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 5MB!');
            }
            return isLt2M;
        },
    },
    watch: {
        value(n, o) {
            // this.imageUrl = n ? ('http://' + this.configData.static_url + '/' + n) : ''
            this.imageUrl = n
        }
    }
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>