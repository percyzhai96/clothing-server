/**
 *@Description:白名单路由 可以绕过权限
*/

const whitelist = [
    "get /api/public/download", //下载
    "get /api/private/files/findone", //文件管理-下载
    "post /api/private/users/reclassify", // 修改密码
    "POST /api/private/roles/one", //角色详情
    "get /api/private/menus/rolesmenus", //角色菜单
    "get /api/private/users/infor", //用户详情


];

module.exports= whitelist
