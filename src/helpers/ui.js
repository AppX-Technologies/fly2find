export const getVariantFromStatus = status => {
  const map = {
    Active: 'info',
    Closed: 'success',
    Cancelled: 'danger',
    'New Order': 'success',
    'Information Requested': 'info',
    'Information Received': 'warning',
    'Pending To Pay': 'secondary',
    Paid: 'dark'
  };

  return map[status] || 'primary';
};
