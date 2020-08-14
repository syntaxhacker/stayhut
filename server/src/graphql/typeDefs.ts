import { gql } from "apollo-server-express";

export const typeDefs = gql`
	type Viewer {
		id: ID
		token: String
		avatar: String
		hasWallet: Boolean
		didRequest: Boolean!
	}

	type Booking {
		id: ID!
		listing: Listing!
		tenant: User!
		checkIn: String!
		checkOut: String!
	}

	type Bookings {
		total: Int!
		result: [Booking!]!
	}

	enum ListingType {
		APARTMENT
		HOUSE
	}
	enum ListingsFilters {
		PRICE_LOW_TO_HIGH
		PRICE_HIGH_TO_LOW
	}

	type Listing {
		id: ID!
		title: String!
		description: String!
		image: String!
		country: String!
		admin: String!
		host: User!
		type: ListingType!
		address: String!
		city: String!
		bookings(limit: Int!, page: Int!): Bookings
		bookingsIndex: String!
		price: Int!
		numOfGuests: Int!
	}

	type Listings {
		region: String
		total: Int!
		result: [Listing!]!
	}

	type User {
		id: ID!
		name: String!
		avatar: String!
		contact: String!
		hasWallet: Boolean!
		income: Int
		bookings(limit: Int!, page: Int!): Bookings
		listings(limit: Int!, page: Int!): Listings!
	}

	type Query {
		user(id: ID!): User!
		authUrl: String!
		listing(id: ID!): Listing!
		listings(
			location: String
			filter: ListingsFilters!
			limit: Int!
			page: Int!
		): Listings!
	}

	input ConnectStripeInput {
		code: String!
	}

	input LoginInput {
		code: String!
	}
	input HostListingInput {
		title: String!
		description: String!
		image: String!
		type: ListingType!
		address: String!
		price: Int!
		numOfGuests: Int!
	}
	input CreateBookingInput {
		id: ID!
		source: String!
		checkIn: String!
		checkOut: String!
	}
	type Mutation {
		logIn(input: LoginInput): Viewer!
		logOut: Viewer!
		connectStripe(input: ConnectStripeInput): Viewer!
		disConnectStripe: Viewer!
		hostListing(input: HostListingInput!): Listing!
		createBooking(input: CreateBookingInput!): Booking!
		testMutation: String!
	}
`;
