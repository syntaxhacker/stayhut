import React from "react";
import { Link } from "react-router-dom";
import { Card, Col, Input, Row, Typography } from "antd";

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
						<Card
							cover={
								<img
									alt="Japan"
									src="https://res.cloudinary.com/dghaikhyj/image/upload/v1597771591/SH_ASSETS/hiroshima-temple.jpg"
								/>
							}
						>
							Japan
						</Card>
					</Link>
				</Col>
				<Col xs={12} md={6}>
					<Link to="/listings/India">
						<Card
							cover={
								<img
									alt="India"
									src="https://res.cloudinary.com/dghaikhyj/image/upload/v1597771609/SH_ASSETS/jaipur-pink-palace.png"
								/>
							}
						>
							India
						</Card>
					</Link>
				</Col>
				<Col xs={0} md={6}>
					<Link to="/listings/norway">
						<Card
							cover={
								<img
									alt="Norway"
									src="https://res.cloudinary.com/dghaikhyj/image/upload/v1597771597/SH_ASSETS/norway.jpg"
								/>
							}
						>
							Norway
						</Card>
					</Link>
				</Col>
				<Col xs={0} md={6}>
					<Link to="/listings/london">
						<Card
							cover={
								<img
									alt="London"
									src="https://res.cloudinary.com/dghaikhyj/image/upload/v1597771596/SH_ASSETS/london.jpg"
								/>
							}
						>
							London
						</Card>
					</Link>
				</Col>
			</Row>
		</div>
	);
};
