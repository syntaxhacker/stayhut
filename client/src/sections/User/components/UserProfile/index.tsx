import React, { Fragment } from "react";
import { User as UserData } from "../../../../lib/graphql/queries/User/__generated__/User";
import { Card, Avatar, Divider, Typography, Button, Tag, Tooltip } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import {
	formatListingPrice,
	displaySuccessNotification,
	displayErrorNotification,
	iconColor,
} from "../../../../lib/utils";
import { useMutation } from "react-apollo";
import { DisConnectStripe as DisConnectStripeData } from "../../../../lib/graphql/mutations/DisConnectStripe/__generated__/DisConnectStripe";
import { DISCONNECT_STRIPE } from "../../../../lib/graphql/mutations";
import { Viewer } from "../../../../lib/graphql/types";
import { QuestionCircleOutlined } from "@ant-design/icons";

interface Props {
	user: UserData["user"];
	viewer: Viewer;
	viewerIsUser: boolean;
	setViewer: (viewer: Viewer) => void;
	handleUserRefetch: () => Promise<void>;
}

const { Title } = Typography;
const stripeAuthUrl = `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&scope=read_write`;

export const UserProfile = ({
	viewerIsUser,
	user,
	setViewer,
	handleUserRefetch,
	viewer,
}: Props) => {
	const [disConnectStripe, { loading }] = useMutation<DisConnectStripeData>(
		DISCONNECT_STRIPE,
		{
			onCompleted: (data) => {
				if (data && data.disConnectStripe) {
					setViewer({
						...viewer,
						hasWallet: data.disConnectStripe.hasWallet,
					});
					displaySuccessNotification(
						"You've successfully disconnected from Stripe!",
						"You'll have to reconnect with Stripe to continue to create listings."
					);
					handleUserRefetch();
				}
			},
			onError: () => {
				displayErrorNotification(
					"Sorry! We weren't able to disconnect you from Stripe. Please try again later!"
				);
			},
		}
	);
	const redirectToStripe = () => {
		window.location.href = stripeAuthUrl;
	};
	const disConnectStripeTip = (
		<span>
			By disconnecting, you won't be able to receive any further payments.{" "}
		</span>
	);

	const additionalDetails = user.hasWallet ? (
		<Fragment>
			<Paragraph>
				<Tag color="green">Stripe Registered</Tag>
			</Paragraph>
			<Paragraph>
				Income Earned:{" "}
				<Text strong>
					{user.income ? formatListingPrice(user.income) : `₹0`}
				</Text>
			</Paragraph>
			<Button
				type="primary"
				className="user-profile__details-cta"
				loading={loading}
				onClick={() => disConnectStripe()}
			>
				Disconnect Stripe
			</Button>
			{"  "}
			<Tooltip placement="top" title={disConnectStripeTip}>
				<QuestionCircleOutlined
					style={{ fontSize: "22px", color: iconColor }}
				/>
			</Tooltip>
		</Fragment>
	) : (
		<Fragment>
			<Paragraph>Register with your Stripe account!</Paragraph>
			<Button
				type="primary"
				className="user-profile__details-cta"
				onClick={redirectToStripe}
			>
				Connect with Stripe
			</Button>
			<Paragraph type="secondary">
				StayHut uses{" "}
				<a
					href="https://stripe.com/en-US/connect"
					target="_blank"
					rel="noopener noreferrer"
				>
					Stripe
				</a>{" "}
				to transfer your earnings in a secure and trusted manner.
			</Paragraph>

			<Text type="secondary" mark>
				Click 'Skip this account form' to skip adding your real account
			</Text>
		</Fragment>
	);

	const additionalDetailsSection = viewerIsUser ? (
		<Fragment>
			<Divider />
			<div className="user-profile__details">
				<Title level={4}>additional details</Title>
				{additionalDetails}
			</div>
		</Fragment>
	) : null;

	return (
		<div className="user-profile">
			<Card className="user-profile__card">
				<div className="user-profile__avatar">
					<Avatar size={100} src={user.avatar}></Avatar>
				</div>
				<Divider />
				<div className="user-profile__details">
					<Title level={4}>Details</Title>
					<Paragraph>
						Name : <Text strong>{user.name}</Text>
					</Paragraph>
					<Paragraph>
						Email : <Text strong>{user.contact}</Text>
					</Paragraph>
				</div>
				{additionalDetailsSection}
			</Card>
		</div>
	);
};
