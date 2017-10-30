import request from '.';

export default {
    /**
     * 获取验证方式
     *
     * @param {any} mobile 手机号
     */
    captcha(mobile) {
        return request(`/api/auth/captcha/${mobile}`);
    },
    /**
     * 发送验证码
     *
     * @param {any} username 用户名
     */
    sendCaptchaCode(username) {
        // /api/auth/captcha/' + username + '/message
        return request(`/api/auth/captcha/${username}/message`);
    },
    /**
     * 鉴权
     *
     * @param {any} data 提交内容
     */
    auth(data) {
        return request('/api/auth/form', 'post', data);
    },
    /**
     * 获取角色权限列表
     *
     * @param {any} userId 登录人id
     */
    userRoles(userId) {
        return request(`/api/employee/list/account/${userId}`);
    },
    /**
     * 未知
     *
     * @param {any} merchantId 商户id
     */
    merchantContract(merchantId) {
        return request(`/api/merchantContract/maturity/${merchantId}`);
    },
    /**
     * 登录
     *
     * @param {any} userId 登录id
     */
    login(userId) {
        return request(`/api/employee/login/${userId}`, 'put');
    },
    /**
     * 权限列表
     *
     * @param {any} userId 登录id
     */
    permissions(userId) {
        return request(`/api/employee/permissions/${userId}`);
    },
    /**
     * 权限门店
     *
     * @param {any} userId 登录人id
     */
    permissionStores(userId) {
        return request(`/api/employee/permissionStores/${userId}`);
    },
    /**
     * 权限包
     *
     * @param {any} userId 登录人id
     */
    permission(userId) {
        return request(`/api/employee/permission/${userId}`);
    },
    /**
     * 用户是否存在
     *
     * @param {any} username 用户名
     * @returns 用户id
     */
    userExist(username) {
        return request(`/api/authUser/exist/${username}`);
    },
    /**
     * 发送修改密码的验证码
     *
     * @param {any} userId 用户id
     */
    userValidateCode(userId) {
        return request(`/api/authUser/validate/${userId}`);
    },
    /**
     * 用户名获取修改密码验证码
     *
     * @param {any} username 用户名
     */
    async getValidateCodeWithUsername(username) {
        var res = await this.userExist(username);
        return await this.userValidateCode(res.data);
    },
    /**
     * 修改密码
     *
     * @param {any} data {authUserId, password, validateCode}
     */
    changePassword(data) {
        return request(`/api/authUser/password`, 'put', data);
    }
};
