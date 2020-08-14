import { message, notification } from "antd";

export const iconColor = "#1890ff";

export const formatListingPrice = (price: number, round = true) => {
	const formattedListingPrice = round ? Math.round(price) : price;
	return formattedListingPrice > 1000
		? `₹${
				formattedListingPrice.toString()[0]
		  },${formattedListingPrice.toString().slice(1)}`
		: `₹${formattedListingPrice}`;
};

export const displaySuccessNotification = (
	message: string,
	description?: string
) => {
	return notification["success"]({
		message,
		description,
		placement: "topLeft",
		style: {
			marginTop: 50,
		},
	});
};
export const displayErrorNotification = (error: string) => {
	return message.error(error);
};
