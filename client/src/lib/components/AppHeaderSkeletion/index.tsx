import React from "react";
import { Layout } from "antd";
import headerLogo from "./assets/sh.png";
const { Header } = Layout;

const AppHeaderSkeleton = () => {
	return (
		<Header className="app-header">
			<div className="app-header__logo-search-section">
				<div className="app-header__logo">
					<img src={headerLogo} alt="App Logo" />
				</div>
			</div>
		</Header>
	);
};

export default AppHeaderSkeleton;
