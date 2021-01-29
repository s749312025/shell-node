export default {
    data() {
        return {
            tableLoading: false,
            totalCount: 0,
            pageNo: 1,
            pageSize: 10
        }
    },
    methods: {
        async init() {
            Object.keys(this.searchForm).map(key => {
                if (this.searchForm[key] === '') {
                    this.searchForm[key] = undefined
                }
            })
            this.tableLoading = true
            const { status, data } = await this.$fetch(this.tableUrl, {
                page: this.pageNo,
                pageSize: this.pageSize,
                ...this.searchForm
            })
            this.tableLoading = false
            if (this.tableData && data.list && status === 0) {
                this.tableData = data.list
                this.totalCount = Number(data.count)
            }
        },
        handleCurrentChange(pageNo) {
            this.pageNo = pageNo
            this.init()
        },
        handleSizeChange(pageSize) {
            this.pageSize = pageSize
            //this.searchSubmit()
        },
        async searchSubmit() {
            this.pageNo = 1
            await this.init()
        },
        searchReset(obj = {}) {
            Object.keys(this.searchForm).forEach(item => {
                this.searchForm[item] = undefined
            })
            Object.keys(obj).forEach(item => {
                this.searchForm[item] = obj[item]
            })
            this.searchSubmit()
        }
    }
}