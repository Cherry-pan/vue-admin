import {
    loadTableData
} from "@/api/common.js";
let tableLoadData = {
    data() {
        return {

        }
    },
    methods: {
        getTableData() {
            let params = {
                methods: this.tableConfig.request.methods,
                requestURL: this.tableConfig.request.requestURL,
                data: this.tableConfig.request.data
            }
            loadTableData(params)
                .then(res => {
                    let response = res.data.data.data;
                    if (response.length > 0 && response != null) {
                        // 赋值
                        this.tableData = response;
                    } else {
                        // 赋值
                        this.tableData = response;
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    },
    created() {},
    beforeMount() {

    },
    mounted() {
        this.getTableData()
    }
}
export default tableLoadData