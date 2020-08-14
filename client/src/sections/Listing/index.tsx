import React, { useState } from "react";
import {
	Listing as ListingData,
	ListingVariables,
} from "../../lib/graphql/queries/Listing/__generated__/Listing";
import { Layout, Row, Col } from "antd";
import { LISTING } from "../../lib/graphql/queries/Listing";
import { useQuery } from "react-apollo";
import { PageSkeleton } from "../../lib/components";
import { RouteComponentProps } from "react-router-dom";
import {
	ListingDetails,
	ListingCreateBooking,
	ListingBookings,
	ListingCreateBookingModel,
} from "./Components";
import { Moment } from "moment";
import { Viewer } from "../../lib/graphql/types";
import { useScrollToTop } from "../../lib/hooks";
import ErrorBanner from "../../lib/components/ErrorBanner";
const { Content } = Layout;
const PAGE_LIMIT = 3;

interface MarchParams {
	id: string;
}

interface Props {
	viewer: Viewer;
}

const Listing = ({
	viewer,
	match,
}: Props & RouteComponentProps<MarchParams>) => {
	const [bookingsPage, setBookingsPage] = useState(1);
	const [checkInDate, setCheckInDate] = useState<Moment | null>(null);
	const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null);
	const [modalVisible, setModalVisible] = useState(false);

	const clearBookingsData = () => {
		setCheckInDate(null);
		setCheckOutDate(null);
		setModalVisible(false);
	};

	const { data, loading, error, refetch } = useQuery<
		ListingData,
		ListingVariables
	>(LISTING, {
		variables: {
			id: match.params.id,
			bookingsPage,
			limit: PAGE_LIMIT,
		},
	});

	useScrollToTop();
	const handleRefetch = async () => {
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
				<ErrorBanner description="Listing may not exist"></ErrorBanner>
				<PageSkeleton />
			</Content>
		);
	}

	const listing = data ? data.listing : null;
	const listingBookings = listing ? listing.bookings : null;

	const listingDetailsElement = listing ? (
		<ListingDetails listing={listing} />
	) : null;

	const listingBookingsElement = listingBookings ? (
		<ListingBookings
			listingBookings={listingBookings}
			bookingsPage={bookingsPage}
			limit={PAGE_LIMIT}
			setBookingsPage={setBookingsPage}
		/>
	) : null;

	const listingCreateBookingElement = listing ? (
		<ListingCreateBooking
			viewer={viewer}
			host={listing.host}
			price={listing.price}
			bookingsIndex={listing.bookingsIndex}
			checkInDate={checkInDate}
			checkOutDate={checkOutDate}
			setCheckInDate={setCheckInDate}
			setCheckOutDate={setCheckOutDate}
			setModalVisible={setModalVisible}
		/>
	) : null;

	const listingCreateBookingModelElement =
		listing && checkInDate && checkOutDate ? (
			<ListingCreateBookingModel
				price={listing.price}
				id={listing.id}
				handleListingRefetch={handleRefetch}
				clearBookingsData={clearBookingsData}
				checkInDate={checkInDate}
				checkOutDate={checkOutDate}
				modalVisible={modalVisible}
				setModelVisible={setModalVisible}
			/>
		) : null;

	return (
		<Content className="listings">
			<Row gutter={12} justify="space-between">
				{" "}
				<Col xs={24} lg={14}>
					{listingDetailsElement}
					{listingBookingsElement}
				</Col>
				<Col xs={24} lg={10}>
					{listingCreateBookingElement}
				</Col>
			</Row>
			{listingCreateBookingModelElement}
		</Content>
	);
};

export default Listing;
