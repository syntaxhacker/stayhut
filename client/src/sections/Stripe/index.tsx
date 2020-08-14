import React, { useEffect, useRef } from "react";
import { Redirect, RouteComponentProps } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import { Layout, Spin } from "antd";
import { CONNECT_STRIPE } from "../../lib/graphql/mutations";
import {
	ConnectStripe as ConnectStripeData,
	ConnectStripeVariables,
} from "../../lib/graphql/mutations/ConnectStripe/__generated__/ConnectStripe";
import { displaySuccessNotification } from "../../lib/utils";
import { Viewer } from "../../lib/graphql/types";
import { LoadingOutlined } from "@ant-design/icons";

interface Props {
	viewer: Viewer;
	setViewer: (viewer: Viewer) => void;
}

const { Content } = Layout;

const Stripe = ({
	viewer,
	setViewer,
	history,
}: Props & RouteComponentProps) => {
	const [connectStripe, { data, loading, error }] = useMutation<
		ConnectStripeData,
		ConnectStripeVariables
	>(CONNECT_STRIPE, {
		onCompleted: (data) => {
			if (data && data.connectStripe) {
				setViewer({
					...viewer,
					hasWallet: data.connectStripe.hasWallet,
				});
				displaySuccessNotification(
					"You've successfully connected your Stripe Account!",
					"Now you can be able to create listings in the Host page."
				);
			}
		},
	});
	const connectStripeRef = useRef(connectStripe);

	useEffect(() => {
		// store stripe oauth code
		const code = new URL(window.location.href).searchParams.get("code");

		if (code) {
			connectStripeRef.current({
				variables: {
					input: { code },
				},
			});
		} else {
			history.replace("/");
		}
	}, [history]);

	if (data && data.connectStripe) {
		return <Redirect to={`/user/${viewer.id}`} />;
	}

	if (loading) {
		const spinningIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
		return (
			<Content className="stripe">
				<Spin
					size="large"
					indicator={spinningIcon}
					tip="Connecting your Stripe account..."
				></Spin>
			</Content>
		);
	}

	if (error) {
		return <Redirect to={`/user/${viewer.id}?stripe_error=true`} />;
	}

	return null;
};
export default Stripe;
