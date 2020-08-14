import React from "react";
import Toggle from "react-toggle";
import "react-toggle/style.css";

interface Props {
	isDark: boolean;
	setIsDark: (isDark: boolean) => void;
}

export const DarkToggle = ({ isDark, setIsDark }: Props) => {
	return (
		<Toggle
			className="DarkToggle"
			checked={isDark}
			onChange={(e) => setIsDark(e.target.checked)}
			icons={{ checked: "🌙", unchecked: "🔆" }}
			aria-label="Dark mode"
		/>
	);
};
