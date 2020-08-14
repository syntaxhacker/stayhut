import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useQuery } from "react-apollo";
import { Col, Layout, Row } from "antd";
import { USER } from "../../lib/graphql/queries";
import {
	UserVariables,
	User as UserData,
} from "../../lib/graphql/queries/User/__generated__/User";
import { UserProfile } from "./components/UserProfile";
import { Viewer } from "../../lib/graphql/types";
import { PageSkeleton } from "../../lib/components";
import { UserListings, UserBookings } from "./components";
import { useScrollToTop } from "../../lib/hooks";
import ErrorBanner from "../../lib/components/ErrorBanner";

interface Props {
	viewer: Viewer;
	setViewer: (viewer: Viewer) => void;
}
interface MatchProps {
	id: string;
}
const { Content } = Layout;
const PAGE_LIMIT = 4;
const User = ({
	viewer,
	match,
	setViewer,
}: Props & RouteComponentProps<MatchProps>) => {
	const [listingsPage, setListingsPage] = useState(1);
	const [bookingsPage, setBookingsPage] = useState(1);

	const { data, loading, error, refetch } = useQuery<UserData, UserVariables>(
		USER,
		{
			variables: {
				id: match.params.id,
				bookingsPage,
				listingsPage,
				limit: PAGE_LIMIT,
			},
			fetchPolicy: "cache-and-network",
		}
	);

	useScrollToTop();

	const stripeError = new URL(window.location.href).searchParams.get(
		"stripe_error"
	);
	const stripeErrorBanner = stripeError ? (
		<ErrorBanner description="We had an issue connecting with Stripe. Please try again soon." />
	) : null;
	const handleUserRefetch = async () => {
		await refetch();
	};

	if (loading) {
		return (
			<Content className="user">
				<PageSkeleton />
			</Content>
		);
	}
	if (error) {
		return (
			<Content className="user">
				<ErrorBanner description="user may not exist"></ErrorBanner>
				<PageSkeleton />
			</Content>
		);
	}

	const user = data ? data.user : null;
	const viewerIsUser = viewer.id === match.params.id;

	const userListings = user ? user.listings : null;
	const userBookings = user ? user.bookings : null;

	const userProfileElement = user ? (
		<UserProfile
			user={user}
			viewer={viewer}
			setViewer={setViewer}
			viewerIsUser={viewerIsUser}
			handleUserRefetch={handleUserRefetch}
		/>
	) : null;

	const userListingsElement = userListings ? (
		<UserListings
			userListings={userListings}
			listingsPage={listingsPage}
			limit={PAGE_LIMIT}
			setListingsPage={setListingsPage}
		/>
	) : null;

	const userBookingsElement = userListings ? (
		<UserBookings
			userBookings={userBookings}
			bookingsPage={bookingsPage}
			limit={PAGE_LIMIT}
			setBookingsPage={setBookingsPage}
		/>
	) : null;
	return (
		<Content className="user">
			{stripeErrorBanner}
			<Row gutter={12} justify="space-between">
				<Col xs={24}>{userProfileElement}</Col>
				<Col xs={24}>
					{userListingsElement}
					{userBookingsElement}
				</Col>
			</Row>
		</Content>
	);
};

export default User;
