import React, { FormEvent } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

import { useMutation } from "react-apollo";
import moment, { Moment } from "moment";
import {
	displayErrorNotification,
	displaySuccessNotification,
} from "../../../../lib/utils";
import { CREATE_BOOKING } from "../../../../lib/graphql/mutations";
import {
	CreateBookingVariables,
	CreateBooking as CreateBookingData,
} from "../../../../lib/graphql/mutations/CreateBooking/__generated__/CreateBooking";
import { Button, Divider } from "antd";
import Text from "antd/lib/typography/Text";

interface Props {
	id: string;
	handleListingRefetch: () => Promise<void>;
	clearBookingsData: () => void;
	checkInDate: Moment;
	checkOutDate: Moment;
}

const CardForm = ({
	checkInDate,
	id,
	clearBookingsData,
	handleListingRefetch,
	checkOutDate,
}: Props) => {
	const stripe = useStripe();
	const elements = useElements();
	const options = {
		style: {
			base: {
				fontSize: "16px",
				color: "#424770",
				"::placeholder": {
					color: "#aab7c4",
				},
			},
			invalid: {
				color: "#9e2146",
			},
		},
		hidePostalCode: true,
	};

	const [createBooking, { loading }] = useMutation<
		CreateBookingData,
		CreateBookingVariables
	>(CREATE_BOOKING, {
		onCompleted: () => {
			clearBookingsData();
			displaySuccessNotification("listing booked ");
			handleListingRefetch();
		},
		onError: () => {
			displayErrorNotification(
				`cant book lisiting right now try again later`
			);
		},
	});

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		if (!stripe || !elements) {
			return;
		}

		const cardElement = elements?.getElement(CardElement);
		const StripeToken = cardElement
			? await stripe.createToken(cardElement)
			: null;

		const err = StripeToken?.error;
		if (err) {
			displayErrorNotification(
				err.message ? err.message : "error occured"
			);
		} else {
			if (StripeToken?.token) {
				const source = StripeToken?.token.id;
				const checkIn = moment(checkInDate).format("YYYY-MM-DD");
				const checkOut = moment(checkOutDate).format("YYYY-MM-DD");
				createBooking({
					variables: {
						input: {
							id,
							source,
							checkIn,
							checkOut,
						},
					},
				});
			}
		}
	};

	const bookingStatusText = loading ? "Booking" : "Book";

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Billing Details
				<CardElement
					className="listing-booking-modal__stripe-card"
					options={options}
				/>
			</label>
			<Button
				disabled={!stripe}
				type="primary"
				loading={loading}
				htmlType="submit"
				className="listing-booking-modal__cta"
			>
				{bookingStatusText}
			</Button>
			<Divider />
			<div>
				<Text type="danger">
					Test using the credit card number: 4242 4242 4242 4242, a
					future expiry date, and any 3 digits for the CVC code.
				</Text>
			</div>
		</form>
	);
};

export default CardForm;
