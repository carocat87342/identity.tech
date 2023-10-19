const routers = {
  base: '/',
  unsigned: {
    signin: '/sign-in',
    signup: '/sign-up',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
    acceptInvitation: '/accept-invitation'
  },
  signed: {
    dashboard: '/dashboard',
    upload: '/upload',
    report: '/report',
    profile: '/management/profile',
    account: '/management/account'
  }
};

export default routers;
