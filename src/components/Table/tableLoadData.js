import {
    reactive
} from "@vue/composition-api";
import {
    loadTableData
} from "@/api/common.js";
export function loadData() {
    const tableData = reactive({
        item: [],
        total:0
    })   
    const tableLoadData = (params) => {
        loadTableData(params)
            .then(res => {
                console.log(res.data.data.data);
                let response = res.data.data;
                if (response.length > 0 && response != null) {
                    tableData.item = response.data;
                    tableData.total = response.total
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
    return {
        tableData,
        tableLoadData
    }
}
/**
 * 请求接口，返回数据放到tableData中，再index.vue中监听数据变化
 */