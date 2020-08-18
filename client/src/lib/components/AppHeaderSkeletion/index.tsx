import React from "react";
import { Layout } from "antd";
const { Header } = Layout;

const AppHeaderSkeleton = () => {
	return (
		<Header className="app-header">
			<div className="app-header__logo-search-section">
				<div className="app-header__logo">
					<img
						src="https://res.cloudinary.com/dghaikhyj/image/upload/w_100,h_32,c_fit/v1596866338/SH_ASSETS/bjwwjxfhk2m4wmjaelgj.png"
						alt="App Logo"
					/>
				</div>
			</div>
		</Header>
	);
};

export default AppHeaderSkeleton;
