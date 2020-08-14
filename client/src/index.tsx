import React, { lazy, Suspense, useState, useRef, useEffect } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider, useMutation } from "react-apollo";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Layout, Spin, Affix } from "antd";
// import { LoadingOutlined } from "@ant-design/icons";
import * as serviceWorker from "./serviceWorker";
import "./styles/_index.scss";
import { Viewer } from "./lib/graphql/types";
import { LOG_IN } from "./lib/graphql/mutations";
import {
	LogIn as LogInData,
	LogInVariables,
} from "./lib/graphql/mutations/LogIn/__generated__/LogIn";

//lazy laod components
import LoadingComp from "./LoadingComp";
const AppHeader = lazy(() => import("./sections/AppHeader"));
const Home = lazy(() => import("./sections/Home"));
const Listings = lazy(() => import("./sections/Listings"));
const Listing = lazy(() => import("./sections/Listing"));
const Login = lazy(() => import("./sections/Login"));
const User = lazy(() => import("./sections/User"));
const Host = lazy(() => import("./sections/Host"));
const NotFound = lazy(() => import("./sections/NotFound"));
const Stripe = lazy(() => import("./sections/Stripe"));
// const AppHeaderSkeleton = lazy(() =>
// 	import("./lib/components/AppHeaderSkeletion")
// );
const ErrorBanner = lazy(() => import("./lib/components/ErrorBanner"));

// api endpoint
const client = new ApolloClient({
	uri: "/api",
	request: async (operation) => {
		const token = sessionStorage.getItem("token");
		operation.setContext({
			headers: {
				"X-CSRF-TOKEN": token || "	",
			},
		});
	},
});
//set user to null
const intitalViewer: Viewer = {
	id: null,
	token: null,
	avatar: null,
	hasWallet: null,
	didRequest: false,
};

const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PKEY}`);

const App = () => {
	const [viewer, setViewer] = useState<Viewer>(intitalViewer);
	const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
		onCompleted: (data) => {
			if (data && data.logIn) {
				setViewer(data.logIn);

				if (data.logIn.token) {
					sessionStorage.setItem("token", data.logIn.token);
				} else {
					sessionStorage.removeItem("token");
				}
			}
		},
	});
	const logInRef = useRef(logIn);
	useEffect(() => {
		if (localStorage.getItem("isDarkMode") === null) {
			localStorage.setItem("isDarkMode", JSON.stringify(true));
			setIsDark(true);
		}
	}, []);

	// trigger login mutation on mounting
	useEffect(() => {
		logInRef.current({});
	}, []);
	//load dark mode
	const [isDark, setIsDark] = useState<boolean>(
		localStorage.getItem("isDarkMode") === "true"
			? Boolean(true)
			: Boolean(false)
	);

	useEffect(() => {
		localStorage.setItem("isDarkMode", JSON.stringify(isDark));
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDark]);

	if (!viewer.didRequest && !error) {
		// const spinningIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

		return (
			<Suspense fallback={<LoadingComp />}></Suspense>
			// <Layout className="app-skeleton">
			// 	<AppHeaderSkeleton />
			// 	<div className="app-skeleton__spin-section">
			// 		<Spin
			// 			size="large"
			// 			indicator={spinningIcon}
			// 			tip="loading..."
			// 		></Spin>
			// 	</div>
			// </Layout>
		);
	}

	const errorLogin = error ? (
		<ErrorBanner description="Error cant log you in " />
	) : null;

	return (
		<Router>
			<Suspense fallback={<LoadingComp />}>
				<Layout id="app">
					{errorLogin}
					<Affix offsetTop={0} className="app__affix_header">
						<AppHeader
							isDark={isDark}
							setIsDark={setIsDark}
							viewer={viewer}
							setViewer={setViewer}
						/>
					</Affix>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route
							exact
							path="/listing/:id"
							render={(props) => (
								<Elements stripe={stripePromise}>
									<Listing {...props} viewer={viewer} />
								</Elements>
							)}
						/>
						<Route
							exact
							path="/login"
							render={(props) => (
								<Login {...props} setViewer={setViewer} />
							)}
						/>
						<Route
							exact
							path="/stripe"
							render={(props) => (
								<Stripe
									{...props}
									viewer={viewer}
									setViewer={setViewer}
								/>
							)}
						/>
						<Route
							exact
							path="/user/:id"
							render={(props) => (
								<User
									{...props}
									viewer={viewer}
									setViewer={setViewer}
								/>
							)}
						/>
						<Route
							exact
							path="/host"
							render={(props) => (
								<Host {...props} viewer={viewer} />
							)}
						/>
						<Route
							exact
							path="/listings/:location?"
							component={Listings}
						/>
						<Route component={NotFound} />
					</Switch>
				</Layout>
			</Suspense>
		</Router>
	);
};

render(
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>,
	document.getElementById("root")
);
if (process.env.NODE_ENV === "production") serviceWorker.register();
