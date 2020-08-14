import React from "react";
import { Alert } from "antd";

interface Props {
	message?: string;
	description: string;
}

const ErrorBanner = ({
	message = "Something went Wrong, try again later ",
	description = "looks like a problem try again later",
}: Props) => {
	return (
		<div>
			<Alert
				banner
				closable
				message={message}
				description={description}
				type="error"
				className="error-banner"
			/>
		</div>
	);
};
export default ErrorBanner;
