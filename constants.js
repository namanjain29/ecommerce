const couponCodeStatus = {
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  EXPIRED: 'EXPIRED',
  DELETED: 'DELETED',
  USED: 'USED',
}

const orderStatus = {
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
  DELIVERED: 'DELIVERED',
  RETURNED: 'RETURNED',
}

module.exports = {
  couponCodeStatus,
  orderStatus,
}
