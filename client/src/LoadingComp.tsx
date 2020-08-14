import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Layout, Spin } from "antd";
import AppHeaderSkeleton from "./lib/components/AppHeaderSkeletion";

const LoadingComp = () => {
	const spinningIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
	return (
		<Layout className="app-skeleton">
			<AppHeaderSkeleton />
			<div className="app-skeleton__spin-section">
				<Spin
					size="large"
					indicator={spinningIcon}
					tip="loading..."
				></Spin>
			</div>
		</Layout>
	);
};

export default LoadingComp;
