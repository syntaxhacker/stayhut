import React, { useEffect, useRef } from "react";
import { Card, Typography, Layout, Spin } from "antd";

import googleLogo from "./assets/google_logo.jpg";
import { Viewer } from "../../lib/graphql/types";
import { useApolloClient, useMutation } from "react-apollo";
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl";
import { AUTH_URL } from "../../lib/graphql/queries/";
import {
	LogIn as LogInData,
	LogInVariables,
} from "../../lib/graphql/mutations/LogIn/__generated__/LogIn";
import { LOG_IN } from "../../lib/graphql/mutations";
import {
	displaySuccessNotification,
	displayErrorNotification,
} from "../../lib/utils";
import { Redirect } from "react-router-dom";
import { useScrollToTop } from "../../lib/hooks";
import { LoadingOutlined } from "@ant-design/icons";
import ErrorBanner from "../../lib/components/ErrorBanner";
const { Content } = Layout;
const { Text, Title } = Typography;

interface Props {
	setViewer: (viewer: Viewer) => void;
}

const Login = ({ setViewer }: Props) => {
	const client = useApolloClient();
	const handleAuth = async () => {
		try {
			const { data } = await client.query<AuthUrlData>({
				query: AUTH_URL,
			});
			window.location.href = data.authUrl;
		} catch {
			displayErrorNotification("sorry , unable to log you in ");
		}
	};

	const [
		logIn,
		{ data: logInData, loading: logInLoading, error: logInError },
	] = useMutation<LogInData, LogInVariables>(LOG_IN, {
		onCompleted: (data) => {
			if (data && data.logIn && data.logIn.token) {
				setViewer(data.logIn);
				sessionStorage.setItem("token", data.logIn.token);
				displaySuccessNotification("logged in");
			}
		},
	});

	useScrollToTop();
	const logInRef = useRef(logIn);
	useEffect(() => {
		const code = new URL(window.location.href).searchParams.get("code");
		if (code) {
			logInRef.current({
				variables: {
					input: { code },
				},
			});
		}
	}, []);

	if (logInLoading) {
		const spinningIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
		return (
			<Content className="log-in">
				<Spin
					size="large"
					indicator={spinningIcon}
					tip="loading..."
				></Spin>
			</Content>
		);
	}

	if (logInData && logInData.logIn) {
		const { id: viewerId } = logInData.logIn;
		return <Redirect to={`/user/${viewerId}`}></Redirect>;
	}

	const loginErrorBannerElement = logInError ? (
		<ErrorBanner description="something's broken , try again later ☹"></ErrorBanner>
	) : null;

	return (
		<Content className="log-in">
			{loginErrorBannerElement}
			<Card className="log-in-card">
				<div className="log-in-card__intro">
					<Title level={3} className="log-in-card__intro-title">
						<span role="img" aria-label="wave">
							👋
						</span>
					</Title>
					<Title level={3} className="log-in-card__intro-title">
						Log into StayHut
					</Title>
					<Text>
						Sign in with google to start booking avaiable rentals!!
					</Text>
				</div>
				<button
					className="log-in-card__google-button"
					onClick={handleAuth}
				>
					<img
						src={googleLogo}
						alt="google logo"
						className="log-in-card__google-button-logo"
					/>
					<span className="log-in-card__google-button-text">
						sign in with google
					</span>
				</button>
			</Card>
		</Content>
	);
};
export default Login;
