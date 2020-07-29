let pagination = {
    data() {
        return {
            paginationData: {
                currentPage: 1,
                pageSize: 2,
                total: 20,
                pageSizes: [10, 15, 20, 30],
            }
        }
    },
    methods: {
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.tableConfig.request.data.pageSize = val;
            this.getTableData()
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.tableConfig.request.data.pageNumber = val;
            this.getTableData()
        }
    },
    created() {},
    beforeMount() {

    },
    mounted() {
        this.getTableData()
    }
}
export default pagination