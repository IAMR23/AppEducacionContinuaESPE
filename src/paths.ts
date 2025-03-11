/*export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    customers: '/dashboard/customers',
    integrations: '/dashboard/integrations',
    settings: '/dashboard/settings',
  },
  errors: { notFound: '/errors/not-found' },
} as const;
*/
export const paths = {
  home: '/',
  auth: { signIn: '/auth/sign-in', signUp: '/auth/sign-up', resetPassword: '/auth/reset-password' },
  dashboard: {
    overview: '/dashboard',
    account: '/dashboard/account',
    courses: '/dashboard/publicidad',
    
    cursos: '/dashboard/cursos',
    //settings: '/dashboard/settings',
    carrusel: '/dashboard/carrusel',
    maestrias: '/dashboard/maestrias'
  },
  errors: { notFound: '/errors/not-found' },
} as const;
