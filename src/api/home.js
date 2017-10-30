import request from '.';

export default {
    /**
     * 报表数据查询
     * @param {any} data query
     */
    queryReport(data) {
        return request('/api/report/show', 'post', data);
    },
    /**
     * 订单列表查询
     * @param {any} data query
     */
    queryOrderList(data) {
        return request('/api/order/getList', 'post', data);
    },
    /**
     * 商户信息查询
     * @param {any} merchantId 商户id
     * @param {any} storeId 门店id
     */
    queryMerchantInfo(merchantId, storeId) {
        return request(`/api/member/completeMerchantDegree/${merchantId}/${storeId}`);
    }
};
