import React from "react";
import { Link } from "react-router-dom";
import { Viewer } from "../../../../lib/graphql/types";
import { Menu, Button, Avatar } from "antd";
import { HomeOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { useMutation } from "react-apollo";
import { LOG_OUT } from "../../../../lib/graphql/mutations";
import { LogOut as LogOutData } from "../../../../lib/graphql/mutations/LogOut/__generated__/LogOut";
import {
	displaySuccessNotification,
	displayErrorNotification,
} from "../../../../lib/utils";
import { useWindowDimensions } from "../../../../lib/hooks/useWindowDimensions";
import { DarkToggle } from "../../../../lib/components";
const { Item, SubMenu } = Menu;

interface Props {
	viewer: Viewer;
	setViewer: (viewer: Viewer) => void;
	isDark: boolean;
	setIsDark: (isDark: boolean) => void;
}
const MenuItems = ({ isDark, setIsDark, viewer, setViewer }: Props) => {
	const [logOut] = useMutation<LogOutData>(LOG_OUT, {
		onCompleted: (data) => {
			if (data && data.logOut) {
				setViewer(data.logOut);
				sessionStorage.removeItem("token");
				displaySuccessNotification("logged out successfully");
			}
		},
		onError: () => {
			displayErrorNotification(`error , cant log out `);
		},
	});
	const handleLogOut = () => {
		logOut();
	};

	const { width } = useWindowDimensions();

	const subMenuLogin =
		viewer.id && viewer.avatar ? (
			<SubMenu title={<Avatar src={viewer.avatar} />}>
				<Item key="/user">
					<Link to={`/user/${viewer.id}`}>
						<UserOutlined />
					</Link>
					Profile
				</Item>
				{width && width < 560 ? (
					<Item key="/host">
						<Link to="/host">
							<HomeOutlined />
							Host Listing
						</Link>
					</Item>
				) : null}
				<Item key="/logout">
					<div onClick={handleLogOut}>
						<LogoutOutlined />
						Logout
					</div>
				</Item>
			</SubMenu>
		) : (
			<Item>
				<Link to="/login">
					<Button type="primary">Sign in </Button>
				</Link>
			</Item>
		);

	return (
		<Menu mode="horizontal" selectable={false} className="menu">
			{width && width > 560 ? (
				<Item key="/host">
					<Link to="/host">
						<HomeOutlined />
						Host Listing
					</Link>
				</Item>
			) : null}
			{/* <Item> */}
			<DarkToggle isDark={isDark} setIsDark={setIsDark} />
			{/* </Item> */}
			{subMenuLogin}
		</Menu>
	);
};

export default MenuItems;
