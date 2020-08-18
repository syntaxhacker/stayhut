import React from "react";
import { Layout, Typography, Col, Row } from "antd";
import { HomeHero } from "./components/HomeHero";
import { RouteComponentProps, Link } from "react-router-dom";
import { displayErrorNotification } from "../../lib/utils";

import { useQuery } from "react-apollo";
import { LISTINGS } from "../../lib/graphql/queries/Listings";
import { ListingsFilters } from "../../lib/graphql/globalTypes";
import { HomeListings } from "./components";
import { HomeListingsSkeleton } from "./components/HomeListingsSkeleton";
import { useScrollToTop } from "../../lib/hooks";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const PAGE_LIMIT = 4;
const PAGE_NUMBER = 1;

const Home = ({ history }: RouteComponentProps) => {
	const { loading, data } = useQuery(LISTINGS, {
		variables: {
			filter: ListingsFilters.PRICE_HIGH_TO_LOW,
			limit: PAGE_LIMIT,
			page: PAGE_NUMBER,
		},
		fetchPolicy: "cache-and-network",
	});

	useScrollToTop();
	const onSearch = (value: string) => {
		const trimmedValue = value.trim();
		if (trimmedValue.length > 2) history.push(`listings/${trimmedValue}`);
		else displayErrorNotification("enter a valid location");
	};
	const renderListingsSection = () => {
		if (loading) {
			return <HomeListingsSkeleton />;
		}

		if (data) {
			return (
				<HomeListings
					title="Premium Listings"
					listings={data.listings.result}
				/>
			);
		}

		return null;
	};
	return (
		<Content
			className="home"
			style={{
				backgroundImage: `url("https://res.cloudinary.com/dghaikhyj/image/upload/v1597771605/SH_ASSETS/map-background.png")`,
			}}
		>
			<HomeHero onSearch={onSearch} />

			<div className="home__cta-section">
				<Title level={2} className="home__cta-section-title">
					Travel in comfort and stay in prime locations that won't
					break the bank
				</Title>
				<Paragraph>
					Private Apartments, Vacation Rentals and Guest Houses
				</Paragraph>
				<Link
					to="/listings/india"
					className="ant-btn ant-btn-primary ant-btn-lg home__cta-section-button"
				>
					Explore Listings in India
				</Link>
			</div>

			{renderListingsSection()}

			<div className="home__listings">
				<Title level={4} className="home__listings-title">
					Listings worldwide
				</Title>
				<Row gutter={12}>
					<Col xs={24} sm={12}>
						<Link to="/listings/hawaii">
							<div className="home__listings-img-cover">
								<img
									src="https://res.cloudinary.com/dghaikhyj/image/upload/v1597771593/SH_ASSETS/hawaii-islands.jpg"
									alt="hawaii"
									className="home__listings-img"
								/>
							</div>
						</Link>
					</Col>
					<Col xs={24} sm={12}>
						<Link to="/listings/italy">
							<div className="home__listings-img-cover">
								<img
									src="https://res.cloudinary.com/dghaikhyj/image/upload/v1597771600/SH_ASSETS/rome-Colosseum.jpg"
									alt="italy"
									className="home__listings-img"
								/>
							</div>
						</Link>
					</Col>
				</Row>
			</div>
		</Content>
	);
};

export default Home;
