<template>
    <div>
        <div class="search-content">
            <el-form :inline="true">
                <el-form-item class="ml-10">
                    <el-button icon="el-icon-search" type="primary" @click="getList">查询</el-button>
                    <el-button v-if="isAdmin" icon="el-icon-plus" type="primary" @click="add">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table :data="tableData" border fit>
            <el-table-column prop="name" label="shell名字"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="view(scope.row)">查看详情</el-button>
                    <el-button type="text" @click="execute(scope.row)">执行</el-button>
                    <el-button type="text" @click="viewLog(scope.row)">查看日志</el-button>
                    <el-button v-if="isAdmin" type="text" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <detail v-if="shellDialog.show" v-model="shellDialog.show" :exData="shellDialog.exData" @success="getList"></detail>
        <log v-if="logDialog.show" v-model="logDialog.show" :exData="logDialog.exData"></log>
    </div>
</template>

<script>
import detail from './details';
import log from './log';
export default {
    components: {
        detail,
        log
    },
    data() {
        return {
            isAdmin: localStorage.egg == 'true',
            tableData: [],
            shellDialog: {
                exData: {},
                show: false
            },
            logDialog: {
                exData: {},
                show: false
            }
        }
    },
    methods: {
        view(row) {
            this.shellDialog.exData = {name: row.name}
            this.shellDialog.show = true
        },
        async execute(row) {
            const data = await this.$fetch('/command/execute', {name: row.name})
            if (data.status == 0) {
                this.logDialog.exData.name = row.name
                this.logDialog.show = true
            }
        },
        add() {
            this.shellDialog.exData = {}
            this.shellDialog.show = true
        },
        async del(row) {
            this.$confirm('确定删除吗？不可恢复', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                const data = await this.$fetch('/command/delSh', {name: row.name})
                if (data.status == 0) {
                    this.getList()
                }
            }).catch(() => {});
        },
        viewLog(row) {
            this.logDialog.exData.name = row.name
            this.logDialog.show = true
        },
        async getList() {
            const data = await this.$fetch('/command/list')
            if (data.status == 0) {
                this.tableData = data.list
            }
        }
    },
    mounted () {
        // this.init()
        this.getList()
    },
}
</script>

<style lang="scss" scoped>

</style>