import { gql } from "apollo-boost";

export const USER = gql`
	query User(
		$id: ID!
		$bookingsPage: Int!
		$listingsPage: Int!
		$limit: Int!
	) {
		user(id: $id) {
			id
			name
			income
			avatar
			contact
			hasWallet
			bookings(limit: $limit, page: $bookingsPage) {
				total
				result {
					id
					listing {
						id
						title
						image
						address
						price
						numOfGuests
					}
					checkIn
					checkOut
				}
			}
			listings(limit: $limit, page: $listingsPage) {
				total
				result {
					id
					title
					image
					address
					price
					numOfGuests
				}
			}
		}
	}
`;
