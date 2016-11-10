export const getUserUrl = '/Base/getCurrentUser';

export const getPeopleUrl = '/Printinfo/showPeopleInfo';

export const addPeopleUrl = '/Printinfo/addPeopleInfo';

export const editPeopleUrl = '/Printinfo/editPeopleInfo';

export const deletePeopleUrl = '/Printinfo/delPeopleInfo';

export const getVillageUrl = '/Printinfo/getVillageInfo';
// 获取所有村的所有产品
export const getProductUrl = '/Printinfo/showProduct';

export const editProductUrl = '/Printinfo/editProduct';

export const deleteProductUrl = '/Printinfo/delProduct';

export const addProductUrl = '/Printinfo/addProduct';
// 获取所有入库产品的信息
export const getEnrollUrl = '/Printinfo/showStoreProduct';
// 新增入库信息
export const addEnrollUrl = '/Printinfo/storeProduct';

export const delEnrollUrl = '/Printinfo/delStoreProduct';

// 导出订单数据
export const enrollCSVUrl = '/Printinfo/storeProductCsv';

export const printPreviewUrl = '/Printinfo/printPreview';

export const getPrinterListUrl = '/Printinfo/getPrintorList';

// 确认打印
export const submitPrintUrl = '/Printinfo/submitPrint';

// 获取所有贫困户信息, 不分页
export const getPeopleForEnroll = '/Printinfo/getPeopleList';

// 绑定打印机
export const bindPrinterUrl = '/Printinfo/bindPrintor';
// 删除打印机
export const delPrinterUrl = '/Printinfo/delPrintorInfo';

// 上传图片
export const uploadUrl = '/Printinfo/doUpload';

// 注销
export const logoutUrl = '/Base/logout';

// 默认头像
export const defaultAvatar = '/img/avatar.jpg';

// 修改密码
export const modifyPasswordUrl = '/Base/modifyPassWord';

// 根据开发环境还是生产环境决定路由
export const routeBase = process.env.NODE_ENV !== 'production' ? '/' : '/admin/village/index/';

// 添加管理员
export const addAdminUrl = '/Administrator/addAdmin';

// 添加村助理管理员
export const addAdminAssistantUrl = '/Administrator/addVillageAssitant';

// 删除店铺管理员、省管理员、县管理员、村助理管理员等
export const deleteAdminUrl = '/Administrator/delAdmin';

// 管理员列表
export const adminListUrl = '/Administrator/showAdminList';

// 店铺直播地址
export const storeLiveUrl = '/Administrator/LivePathList';

// 设定匹配关系
export const setMatchListUrl = '/Administrator/doMatch';

// 获得省列表
export const getProvincesUrl = '/Administrator/getProvinces';

// 获得制定省的市列表
export const getCitiesByProvinceUrl = '/Administrator/getCitys';

// 获得制定市的区县列表
export const getDistrictsByCityUrl = '/Administrator/getDistricts';

// 获得制定县的村列表
export const getVillagesByDistrictUrl = '/Administrator/getVillages';

// 获取村列表(包括第一书记的姓名和联系方式)
export const getVillageDetailListUrl = '/Printinfo/getVillageList';