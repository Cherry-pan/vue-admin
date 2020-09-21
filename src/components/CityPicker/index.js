import {
    reactive,
    toRefs
} from "@vue/composition-api";
import {
    getArea
} from "@/api/common.js";
export function getAreaOptions() {
    const areaOptions = reactive({
        PROVINCE_CODE: "",
        CITY_CODE: "",
        AREA_CODE: "",
        STREET_CODE: "",
        provinceOptions: [],
        cityOptions: [],
        areaOptions: [],
        streetOptions: []
    })
    const resultsData = reactive({
        PROVINCE_CODE: "",
        CITY_CODE: "",
        AREA_CODE: "",
        STREET_CODE: "",
    })
    /**
     * 获取省份
     */
    const getProvince = () => {
        let requestData = {
            type: "province"
        };
        getArea(requestData)
            .then(res => {
                areaOptions.provinceOptions = res.data.data.data;
            })
            .catch(error => {
                console.log(error);
            });
    };
    /**
     * 触发省份，获取城市
     */
    const handleProvince = val => {
        resetValue({
            type: "city"
        })
        let requestData = {
            type: "city",
            province_code: val + ""
        };
        getArea(requestData)
            .then(res => {
                areaOptions.cityOptions = res.data.data.data;
            })
            .catch(error => {
                console.log(error);
            });
    };
    /**
     * 触发城市，获取区
     */
    const handleCity = val => {
        resetValue({
            type: "area"
        })
        let requestData = {
            type: "area",
            city_code: val + ""
        };
        getArea(requestData)
            .then(res => {
                areaOptions.areaOptions = res.data.data.data;
            })
            .catch(error => {
                console.log(error);
            });
    };
    /**
     * 触发区，获取街道
     */
    const handleCounty = val => {
        resetValue({
            type: "street"
        })
        let requestData = {
            type: "street",
            area_code: val + ""
        };
        getArea(requestData)
            .then(res => {
                areaOptions.streetOptions = res.data.data.data;
            })
            .catch(error => {
                console.log(error);
            });
    };
    /**
     * 
     * @param {*触发街道，监听值} params 
     */
    const handleStreet = () => {
        resetValue({
            type: ""
        })
    }

    /**
     * 清空值
     */
    const resetValue = (params) => {
        const valueJson = {
            city: ["CITY_CODE", "AREA_CODE", "STREET_CODE"],
            area: ["AREA_CODE", "STREET_CODE"],
            street: ["STREET_CODE"],
        }
        const arrObj = valueJson[params.type]
        console.log(arrObj);
        if (arrObj != null) {
            arrObj.forEach(item => areaOptions[item] = "")            
        }
        // 数据集合处理
        result()

    }
    /**
     * 返回数据的集合
     */
    const result = () => {
        for (const key in resultsData) {
            if (resultsData.hasOwnProperty(key)) {
                resultsData[key] = areaOptions[key];
            }

        }
        console.log(resultsData);
    }
    return {
        getProvince,
        handleProvince,
        handleCity,
        handleCounty,
        //...toRefs(areaOptions), //可以解构，把对象类型，转成基础数据类型
        resetValue,
        result,
        handleStreet,
        areaOptions,
        resultsData
    }
}