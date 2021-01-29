
export default {

	expenseType: {
		c:'充值',
		p:'支出',
		r:'取消订单退回金额'
	},



	rechargeType: {
		'a': '支付宝',
		'w': '微信'
	},

	USER_STATUS_NORMAL: 'n', // 正常
	USER_STATUS_FROZEN: 'f', // 冻结中
	user_status: {
		'n': '正常', // USER_STATUS_NORMAL
		'f': '冻结中', // USER_STATUS_FROZEN
	},

	WARE_HOUSE_STATUS_NORMAL: 'n', // 仓库状态正常
	WARE_HOUSE_STATUS_FROZEN: 'f', // 仓库状态禁用
	warehouse_status: {
		'n': '仓库状态正常', // WARE_HOUSE_STATUS_NORMAL
		'f': '仓库状态禁用', // WARE_HOUSE_STATUS_FROZEN
	},

	PRODUCT_STATUS_ONLINE: 'n', // 商品状态上线
	PRODUCT_STATUS_OFFLINE: 'f', // 商品状态下线
	product_status: {
		// 'n': '商品状态上线', // PRODUCT_STATUS_ONLINE
		// 'f': '商品状态下线', // PRODUCT_STATUS_OFFLINE
		'n': '上架', // PRODUCT_STATUS_ONLINE
		'f': '下架', // PRODUCT_STATUS_OFFLINE
	},

	site_product_status: {
		1: '上架',
		2: '下架'
	},

	finance_type_name: {
		1:'微信提现',
		2:'支付宝提现',
		3:'银行卡提现',
		4:'包裹利润',
		5:'工具利润',
		6:'提现退款'
	},

	finance_type_name_income: {
		4:'包裹利润',
		5:'工具利润',
		6:'提现退款'
	},

	withdrawal_status: {
		1: '提现中',
		2: '提现成功',
		3: '提现失败'
	},

	CART_STATUS_NORMAL: 'n', // 正常
	CART_STATUS_DELETED: 'd', // 删除状态
	CART_STATUS_ORDER: 'o', // 已生成订单
	cart_status: {
		'n': '正常', // CART_STATUS_NORMAL
		'd': '删除状态', // CART_STATUS_DELETED
		'o': '已生成订单', // CART_STATUS_ORDER
	},

	USER_ORDER_STATUS_PAID: 'p', // 待发货
	USER_ORDER_STATUS_SHIPPED: 's', // 已发货
	USER_ORDER_STATUS_CANCEL: 'c', // 取消订单
	USER_ORDER_SYNC_STATUS_UNSHIPPED: 'u', // 未同步
	USER_ORDER_SYNC_STATUS_SHIPPED: 's', // 已同步
	user_order_status: {
		'p': '待发货', // USER_ORDER_STATUS_PAID
		's': '已发货', // USER_ORDER_STATUS_SHIPPED
		'c': '取消订单', // USER_ORDER_STATUS_CANCEL
		'u': '未同步', // USER_ORDER_SYNC_STATUS_UNSHIPPED
		's': '已同步', // USER_ORDER_SYNC_STATUS_SHIPPED
	},

	user_order_sync_status: {
		'u': '未同步', // USER_ORDER_SYNC_STATUS_PENDING
		's': '同步成功', // USER_ORDER_SYNC_STATUS_SUCCESS
		'f': '同步失败', // USER_ORDER_SYNC_STATUS_FAILED
	},

	USER_BALANCE_TYPE_CHARGE: 'c', // 充值
	USER_BALANCE_TYPE_PAY: 'p', // 支出
	USER_BALANCE_TYPE_REBACK: 'r', // 取消订单退回金额
	user_balance_type: {
		'c': '充值', // USER_BALANCE_TYPE_CHARGE
		'p': '支出', // USER_BALANCE_TYPE_PAY
		'r': '取消订单退回金额', // USER_BALANCE_TYPE_REBACK
	},
	SITE_TYPE: {
		'w': 'web站点',
		'a': 'API接口',
	},
	SITE_STATUS: {
		'n': '已激活',
		'f': '冻结',
	},
	user_order_source: {
		'taobao': '淘宝', // USER_ORDER_SOURCE_TAOBAO
		'tmall': '天猫', // USER_ORDER_SOURCE_TMALL
		'jd': '京东', // USER_ORDER_SOURCE_JD
		'pdd': '拼多多', // USER_ORDER_SOURCE_PDD
	},
	user_package_status: {
		'f': '待支付',
		'p': '未发货',
		's': '已发货',
		'g': '待退款',
		'c': '已退款',
	},

	user_pay_status: {
		'f': '待支付',
		'p': '支付成功',
		's': '支付失败',
		'c': '取消订单',
	},

	order_from: {
		1: '主站',
		2: '分站',
		3: 'API',
	},

	order_sent_type: {
		1: '手工下单发货',
		2: '批量下单发货',
		3: 'api下单发货'
  },

  prohibitList: {
		1: '偏远地区',
		2: '禁发液体及粉末',
		3: '快递完全禁发',
		4: '其他',
	},

}
