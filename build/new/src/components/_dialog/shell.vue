<template>
    <div>
        <el-dialog title="商品设置" :visible.sync="dialog"  center width="400px" top="50px">
            <div>
                <el-form ref="form" :model="form" 
                    class="bind-phone">
                    <el-form-item label="是否出售：">
                        <el-radio-group v-model="form.status">
                            <el-radio :label="1">上架</el-radio>
                            <el-radio :label="2">下架</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="成本价：">
                        <span>{{pointToYuan(price)}}元</span>
                    </el-form-item>
                    <el-form-item label="我的售价：">
                        <el-input placeholder="请输入售价" v-model="form.selling_price"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer text-center">
                <el-button class="width-100 footer-btn" type="primary"
                    @click="handleSubmit">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: {
        value: {
            type: Boolean,
            default: true
        },
        setData: {
            type: Object,
            default: true
        }
    },
    data() {
        return {
            dialog: !!this.value,
            cost_price: undefined,
            form: {
                status: undefined,
                selling_price: undefined,
            }
        }
    },
    methods: {
        async handleSubmit() {
            const data = await this.$fetch('/updateSiteProductPrice', {...this.form, selling_price: Number(this.form.selling_price), id: Number(this.setData.id)}, 'post')
            if (data.status == 0) {
                this.$message.success('设置成功')
                this.$emit('success')
                this.dialog = false
            }
        },
        
    },
    mounted () {
        this.form.status = this.setData.status
        this.price = this.setData.price
        this.form.selling_price = this.pointToYuan(this.setData.selling_price)
    },
    watch: {
        dialog(val) {
            if (!val) this.$emit('input', val)
        }
    }
}
</script>
<style lang="scss">
.login-dialog {
    background: #fff;
    padding-top: 200px;
}
.bind-phone-dialog {
    .bind-phone {
        .el-checkbox__input.is-checked + .el-checkbox__label {
            color: #666;
            a {
                color: #2b90ed;
            }
        }
        .rules-phone .el-form-item__content {
            margin-left: 10px !important;
            margin-top: -15px;
        }
        .send {
            .el-input-group__append {
                background-color: #aaa;
                border-color: #aaa;
                .el-button.is-disabled:hover {
                    border-color: transparent;
                    background-color: transparent;
                    color: inherit;
                }
            }
        }
        .el-input-group__append {
            cursor: pointer;
            background-color: #2b90ed;
            border-color: #2b90ed;
            color: #fff;
        }
    }
    div[role='alert'] {
        margin-top: -20px;
        margin-bottom: 20px;
        padding: 5px 10px;
    }
}
.footer-btn {
    margin-top: -30px;
}
</style>
