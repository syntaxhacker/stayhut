import stripe from "stripe";

const client = new stripe(` ${process.env.STRIPE_SECRET}`, {
	apiVersion: "2020-03-02",
});

export const Stripe = {
	connect: async (code: string) => {
		const response = await client.oauth.token({
			grant_type: "authorization_code",
			code,
		});

		return response;
	},
	disConnect: async (stripeUserId: string) => {
		const response = await client.oauth.deauthorize({
			client_id: `${process.env.STRIPE_CLIENT_ID}`,
			stripe_user_id: stripeUserId,
		});
		return response;
	},
	charge: async (
		amount: number,
		source: string,
		stripeAccount_id: string
	): Promise<void> => {
		const res = await client.charges.create(
			// {
			// 	amount,
			// 	currency: "usd",
			// 	source,
			// 	application_fee_amount: Math.round(amount * 0.05),
			// },
			// {
			// 	stripeAccount,
			// }
			{
				amount,
				currency: "inr",
				source,
				application_fee_amount: Math.round(amount * 0.05),
				// description: "test two",
			},
			{
				stripeAccount: stripeAccount_id,
			}
		);

		if (res.status !== "succeeded") {
			throw new Error("failed to create charge with Stripe");
		}
	},
};
