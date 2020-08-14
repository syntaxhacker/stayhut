import { Booking, Listing } from "../../../lib/types";

export interface UserArgs {
	id: string;
}
export interface UserBookingsArgs {
	limit: number;
	page: number;
}
export interface UserListingsArgs {
	limit: number;
	page: number;
}

export interface UserListingsData {
	total: number;
	result: Listing[];
}
export interface UserBookingsData {
	total: number;
	result: Booking[];
}
