import React from "react";
import { Modal, Divider } from "antd";
import moment, { Moment } from "moment";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/typography/Paragraph";
import Link from "antd/lib/typography/Link";
import Text from "antd/lib/typography/Text";
import { formatListingPrice } from "../../../../lib/utils";
import CardForm from "./CardForm";

interface Props {
	price: number;
	checkInDate: Moment;
	checkOutDate: Moment;
	id: string;
	handleListingRefetch: () => Promise<void>;
	clearBookingsData: () => void;
	modalVisible: boolean;
	setModelVisible: (modalVisible: boolean) => void;
}

export const ListingCreateBookingModel = ({
	price,
	checkInDate,
	id,
	clearBookingsData,
	handleListingRefetch,
	checkOutDate,
	modalVisible,
	setModelVisible,
}: Props) => {
	const daysBooked = checkOutDate.diff(checkInDate, "days") + 1;

	const listingPrice = daysBooked * price;
	return (
		<Modal
			visible={modalVisible}
			centered
			footer={null}
			onCancel={() => setModelVisible(false)}
		>
			<div className="listing-booking-modal">
				<div className="listing-booking-modal__intro">
					<Title className="listing-boooking-modal__intro-title"></Title>
					<Title
						level={3}
						className="listing-boooking-modal__intro-title"
					>
						Complete Your Booking <ShoppingCartOutlined />
					</Title>
					<Paragraph>
						Book the listing from the dates between{" "}
						<Text mark strong>
							{moment(checkInDate).format("MMMM Do YYYY")}
						</Text>{" "}
						and{" "}
						<Text mark strong>
							{moment(checkOutDate).format("MMMM Do YYYY")}
						</Text>
						, inclusive.
					</Paragraph>
				</div>
			</div>
			<Divider />

			<div className="listing-booking-modal__charge-summary">
				<Paragraph>
					{formatListingPrice(price, false)} * {daysBooked} days ={" "}
					<Text strong>
						{formatListingPrice(listingPrice, false)}
					</Text>
				</Paragraph>
				<Paragraph className="listing-booking-modal__charge-summary-total">
					Total ={" "}
					<Text mark>{formatListingPrice(listingPrice, false)}</Text>
				</Paragraph>
				<Paragraph strong>
					+additional{" "}
					<span>
						<Link
							href="https://stripe.com/en-in/pricing"
							target="_blank"
						>
							Stripe fee
						</Link>
					</span>
				</Paragraph>
			</div>

			<Divider />

			<div className="listing-booking-modal__stripe-card-section">
				<CardForm
					checkInDate={checkInDate}
					checkOutDate={checkOutDate}
					id={id}
					clearBookingsData={clearBookingsData}
					handleListingRefetch={handleListingRefetch}
				/>
			</div>
		</Modal>
	);
};
