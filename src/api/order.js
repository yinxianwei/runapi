import request from '.';

export default {
    /**
     * 获取商品信息
     *
     * @param  {Long} options.merchantId 商户id
     * @param  {Long} options.storeId    门店id
     * @param  {String} options.type       类型
     */
    getItems({ merchantId, storeId, type = '00111', memberId }) {
        return request(`/api/order/initItems/${merchantId}/${storeId}/${type}${memberId ? '/' + memberId : ''}`);
    },
    /**
     * 获取可用支付方式
     *
     * @param {any} {merchantId, storeId, memberId}
     */
    getPayMethods(data) {
        return request('/api/order/getPayMethods', 'post', data);
    }
};
