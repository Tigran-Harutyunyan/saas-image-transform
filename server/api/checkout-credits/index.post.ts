import type { CheckoutTransactionParams } from "@/types";
import Stripe from "stripe";

const STRIPE_API_KEY = useRuntimeConfig().stripeKey as string;

const stripe = new Stripe(STRIPE_API_KEY, {
    apiVersion: "2023-10-16"
});

export default defineEventHandler(async (event) => {
    const auth = event.context.auth;
    const body = await readBody(event);

    const transaction: CheckoutTransactionParams = body.transaction;

    if (!(auth?.userId)) {
        return createError({
            statusCode: 401,
            statusMessage: "Unauthorized"
        });
    };

    try {

        const amount = Number(transaction.amount) * 100;

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        unit_amount: amount,
                        product_data: {
                            name: transaction.plan,
                        }
                    },
                    quantity: 1
                }
            ],
            metadata: {
                plan: transaction.plan,
                credits: transaction.credits,
                buyerId: transaction.buyerId,
            },
            mode: 'payment',
            success_url: `${process.env.NUXT_PUBLIC_APP_URL}/profile`,
            cancel_url: `${process.env.NUXT_PUBLIC_APP_URL}/`,
        })

        return {
            url: session.url
        }

    } catch (error) {
        console.log(error)

        return createError({
            statusCode: 500,
            statusMessage: "Internal Error"
        })
    }
});