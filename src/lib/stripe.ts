import Stripe from 'stripe'

export const stripe = new Stripe(
  `${process.env.NEXT_PUBLIC_VERCEL_ENV_STRIPE_SECRET_KEY}`,
  {
    apiVersion: '2024-06-20',
    appInfo: {
      name: 'Ignite Shop',
    },
  },
)
