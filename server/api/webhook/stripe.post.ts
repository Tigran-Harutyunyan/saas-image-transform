import Stripe from "stripe";
import { defineStripeWebhook } from '@fixers/nuxt-stripe/server';
import { createTransaction } from "@/lib/actions/transaction.actions";
/**
 * @param event - the H3 event
 * @param stipe - the Stripe instance
 * @param stripeEvent - the Stripe Webhook event
 */

const STRIPE_API_KEY = useRuntimeConfig().stripeKey as string;

const WEBHOOK_SECRET = useRuntimeConfig().stripeWebhookSecret

const stripe = new Stripe(STRIPE_API_KEY, {
    apiVersion: "2023-10-16"
});

const webhookOptions = {
    webhookSecret: WEBHOOK_SECRET,
    stripe,
}

export default defineStripeWebhook(async ({ event, stripeEvent }) => {

    if (!isMethod(event, ['POST'])) {
        setResponseStatus(event, 400)

        return { ok: false }
    }
    const session = stripeEvent.data.object as Stripe.Checkout.Session;

    switch (stripeEvent.type) {
        case 'checkout.session.completed': {

            if (!session?.metadata?.userId) {
                createError({
                    statusCode: 400,
                    statusMessage: 'User id is required'
                });
            }

            const { id, amount_total, metadata } = stripeEvent.data.object;
            const transaction = {
                stripeId: id,
                amount: amount_total ? amount_total / 100 : 0,
                plan: metadata?.plan || "",
                credits: Number(metadata?.credits) || 0,
                buyerId: metadata?.buyerId || "",
                createdAt: new Date(),
            };

            const newTransaction = await createTransaction(transaction);

            return { message: "OK", transaction: newTransaction };
        }
    }

    return {
        hello: 'world'
    }

}, webhookOptions); 
