import {
    reactive,
    ref,
    watch,
    onMounted,
    onBeforeMount
} from "@vue/composition-api";
export function pagination() {
    const paginationData = reactive({
        currentPage: 1,
        pageSize: 10,
        total: 20,
        pageSizes: [10, 15, 20, 30]
    })
    // 统计总和
    const tableTotal = (val) => {
        paginationData.total = val;
    }
    const handleSizeChange = (val) => {
        paginationData.pageSize = val
    }
    const handleCurrentChange = (val) => {
        paginationData.currentPage = val
    }
    return {
        paginationData,
        handleSizeChange,
        handleCurrentChange,
        tableTotal
    }
}