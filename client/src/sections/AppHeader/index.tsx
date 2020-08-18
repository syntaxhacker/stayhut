import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { MenuItems } from "./components";
import { Viewer } from "../../lib/graphql/types";
import Search from "antd/lib/input/Search";
import { displayErrorNotification } from "../../lib/utils";
const { Header } = Layout;
interface Props {
	viewer: Viewer;
	isDark: boolean;
	setIsDark: (isDark: boolean) => void;
	setViewer: (viewer: Viewer) => void;
}

const AppHeader = withRouter(
	({
		isDark,
		setIsDark,
		viewer,
		setViewer,
		location,
		history,
	}: Props & RouteComponentProps) => {
		const [search, setSearch] = useState("");

		useEffect(() => {
			const { pathname } = location;
			const pathnameSubStrings = pathname.split("/");
			if (!pathname.includes("/listings")) {
				setSearch("");
				return;
			}

			if (
				pathname.includes("/listings") &&
				pathnameSubStrings.length === 3
			) {
				setSearch(pathnameSubStrings[2]);
				return;
			}
		}, [location]);

		const onSearch = (value: string) => {
			const trimmedValue = value.trim();

			if (trimmedValue) {
				history.push(`/listings/${trimmedValue}`);
			} else {
				displayErrorNotification("enter valid location");
			}
		};

		return (
			<Header className="app-header">
				<div className="app-header__logo-search-section">
					<div className="app-header__logo">
						<Link to="/">
							<img
								src="https://res.cloudinary.com/dghaikhyj/image/upload/w_100,h_32,c_fit/v1596866338/SH_ASSETS/bjwwjxfhk2m4wmjaelgj.png"
								alt="App Logo"
							/>
						</Link>
					</div>
					<div className="app-header__search-input">
						<Search
							placeholder="Search 'New York'"
							enterButton
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							onSearch={onSearch}
						/>
					</div>
				</div>
				<div className="app-header__menu-section">
					<MenuItems
						isDark={isDark}
						setIsDark={setIsDark}
						viewer={viewer}
						setViewer={setViewer}
					/>
				</div>
			</Header>
		);
	}
);
export default AppHeader;
