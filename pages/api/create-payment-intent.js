import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { amount } = req.body;
            const paymentIntent = await stripe.paymentIntents.create({
                amount,
                currency: 'usd',
            });
            res.status(200).json({ clientSecret: paymentIntent.client_secret });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}