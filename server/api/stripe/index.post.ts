
import Stripe from "stripe";

const STRIPE_API_KEY = useRuntimeConfig().stripeKey as string;
const APP_URL = useRuntimeConfig().public.appUrl as string;

const stripe = new Stripe(STRIPE_API_KEY, {
  apiVersion: "2023-10-16",
  typescript: true,
});

import { clerkClient } from 'h3-clerk';

export default defineEventHandler(async (event) => {

  const { auth } = event.context;
  const userId = auth?.userId;

  if (!userId) {
    return createError({
      statusCode: 401,
      statusMessage: "Unauthorized"
    })
  };

  const user = await clerkClient.users.getUser(userId);

  const settingsUrl = `${APP_URL}/settings/`;

  try {

    // const userSubscription = await prismadb.userSubscription.findUnique({
    //   where: {
    //     userId
    //   }
    // })

    // if (userSubscription && userSubscription.stripeCustomerId) {
    //   const stripeSession = await stripe.billingPortal.sessions.create({
    //     customer: userSubscription.stripeCustomerId,
    //     return_url: settingsUrl,
    //   })

    //   return { url: stripeSession.url }
    // }

    // const stripeSession = await stripe.checkout.sessions.create({
    //   success_url: settingsUrl,
    //   cancel_url: settingsUrl,
    //   payment_method_types: ["card"],
    //   mode: "subscription",
    //   billing_address_collection: "auto",
    //   customer_email: user.emailAddresses[0].emailAddress,
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "USD",
    //         product_data: {
    //           name: "Genius Pro",
    //           description: "Unlimited AI Generations"
    //         },
    //         unit_amount: 2000,
    //         recurring: {
    //           interval: "month"
    //         }
    //       },
    //       quantity: 1,
    //     },
    //   ],
    //   metadata: {
    //     userId
    //   },
    // })

    // return { url: stripeSession.url }
  } catch (error) {
    console.log("[STRIPE]", error);
    createError({
      statusCode: 500,
      statusMessage: "Internal Error"
    })
  }

});
