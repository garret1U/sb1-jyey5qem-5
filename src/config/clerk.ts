export const clerkAppearance = {
  variables: { colorPrimary: '#4f46e5' },
  elements: {
    card: 'bg-white shadow-sm rounded-lg p-6 mx-auto',
    rootBox: 'w-full max-w-md mx-auto',
    headerTitle: 'text-2xl font-bold text-center mb-8',
    headerSubtitle: 'text-gray-600 text-center mb-6',
    formButtonPrimary: 'bg-indigo-600 hover:bg-indigo-700',
    formFieldInput: 'rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
    footerAction: 'text-indigo-600 hover:text-indigo-500',
    card__main: 'p-0'
  }
} as const;

export const signUpConfig = {
  signInUrl: '/sign-in',
  afterSignUpUrl: '/',
  afterSignInUrl: '/'
} as const;