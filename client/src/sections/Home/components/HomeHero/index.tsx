import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Input, Row, Typography } from "antd";

import hiroshimaTemple from "../../assets/hiroshima-temple.jpg";
import pinkPalace from "../../assets/jaipur-pink-palace.png";
import norwayImage from "../../assets/norway.jpg";
import londonImage from "../../assets/london.jpg";

const { Title } = Typography;
const { Search } = Input;

interface Props {
	onSearch: (value: string) => void;
}

export const HomeHero = ({ onSearch }: Props) => {
	return (
		<div className="home-hero">
			<div className="home-hero__search">
				<Title className="home-hero__title">
					Find a home away from home
				</Title>
				<Search
					placeholder="Search 'New York'"
					size="large"
					enterButton
					className="home-hero__search-input"
					onSearch={onSearch}
				/>
			</div>
			<Row gutter={12} className="home-hero__cards">
				<Col xs={12} md={6}>
					<Link to="/listings/Japan">
						<Card cover={<img alt="Japan" src={hiroshimaTemple} />}>
							Japan
						</Card>
					</Link>
				</Col>
				<Col xs={12} md={6}>
					<Link to="/listings/India">
						<Card cover={<img alt="India" src={pinkPalace} />}>
							India
						</Card>
					</Link>
				</Col>
				<Col xs={0} md={6}>
					<Link to="/listings/norway">
						<Card cover={<img alt="Norway" src={norwayImage} />}>
							Norway
						</Card>
					</Link>
				</Col>
				<Col xs={0} md={6}>
					<Link to="/listings/london">
						<Card cover={<img alt="London" src={londonImage} />}>
							London
						</Card>
					</Link>
				</Col>
			</Row>
		</div>
	);
};
