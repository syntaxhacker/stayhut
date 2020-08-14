import merge from "lodash.merge";

import { viewResolvers } from "./Viewer/";
import { userResolvers } from "./User";
import { listingResolvers } from "./Listing";
import { bookingResolvers } from "./Booking";

export const resolvers = merge(
	viewResolvers,
	userResolvers,
	listingResolvers,
	bookingResolvers
);
