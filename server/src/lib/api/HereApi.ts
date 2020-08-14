import NodeGeocoder, { Entry, HereOptions } from "node-geocoder";

const key = process.env.HERE_API;

const options: HereOptions = {
	provider: "here",
	apiKey: key,
};

const geocoder = NodeGeocoder(options);

const parseAddress = (addressInfo: Entry) => {
	const country = addressInfo.country;
	const admin = addressInfo.administrativeLevels?.level1long;
	const city = addressInfo.city;
	return { country, admin, city };
};

// (async () => {
// 	const res = await geocoder.geocode("marri chenna reddy colony tirupati");
// 	// console.log(typeof res)
// })();

export const HereApi = {
	geocode: async (address: string) => {
		const res = await geocoder.geocode(address);
		if (res.length < 1) {
			throw new Error("gecode fail");
		}
		return parseAddress(res[0]);
	},
};
