import React from "react";
import { Select } from "antd";
import { ListingsFilters } from "../../../../lib/graphql/globalTypes";

interface Props {
	filter: ListingsFilters;
	setFilter: (filter: ListingsFilters) => void;
}

const { Option } = Select;

export const ListingsFiltersOptions = ({ filter, setFilter }: Props) => {
	return (
		<div className="listings-filters">
			<span>Filter By</span>
			<Select
				value={filter}
				onChange={(filter: ListingsFilters) => setFilter(filter)}
			>
				<Option value={ListingsFilters.PRICE_LOW_TO_HIGH}>
					Price: Low to High
				</Option>
				<Option value={ListingsFilters.PRICE_HIGH_TO_LOW}>
					Price: High to Low
				</Option>
			</Select>
		</div>
	);
};
