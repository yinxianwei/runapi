import request from '.';

export default {
    /**
     * 查询会员列表
     *
     * @param {any} query
     */
    serachMemberList(query) {
        return request('/api/member/bill/list/search', 'post', query);
    }
};
