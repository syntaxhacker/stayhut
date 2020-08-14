import dotenv from "dotenv";
dotenv.config();

import { ObjectId } from "mongodb";
import { ConnectToDatabase } from "../database";
import { Listing, ListingType, User } from "../lib/types";

const listings: Listing[] = [
	//japan
	{
		_id: new ObjectId("5d378db94e84753160e08b30"),
		title: "Hotel Re:ONcE Shibuya",
		description:
			"As you step into our apartment, you will be amazed at the sheer amount of space you are entitled to during your space. The 60㎡ apartment is spacious by Tokyo standards, and is further accentuated by the open floor plan",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684472/SH_ASSETS/22443294.jpg",
		host: "117159499874018329260",
		type: ListingType.Apartment,
		address: "Fuchū, Tokyo , Japan",
		country: "Japan",
		admin: "tokyo",
		city: "Fuchū",
		bookings: [],
		bookingsIndex: {},
		price: 1260,
		numOfGuests: 3,
	},
	{
		_id: new ObjectId("5d378db94e8a253160e08b30"),
		title: "Queen Bed Single Room for 2 Guests in Gojo",
		description:
			"A fantastic little studio apartment located 4 minutes away from Gojo station and 15 minutes walking distance from Kyoto station",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684556/SH_ASSETS/savlc-lobby-3960-hor-wide.jpg",
		host: "117159499874018329260",
		type: ListingType.Apartment,
		address: "Fuchū, Tokyo , Japan",
		country: "Japan",
		admin: "tokyo",
		city: "Fuchū",
		bookings: [],
		bookingsIndex: {},
		price: 3220,
		numOfGuests: 3,
	},
	{
		_id: new ObjectId("5d378db94e84753160e08b31"),
		title: "Large Tokyo Apartment Suite with Terrace 2",
		description:
			"TOKYO EBISU GRAND SUITE strives to be a cultural hub for all food, alcohol, and art lovers who enjoy investing that extra bit for a quality experience. We are also fans of all-things gastronomy and art, and do our very best to share what we appreciate in our own homes and accommodations. We are always keen to make improvements so that your needs are taken care of while exploring the amazing local culture in such a unique part of the world.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684517/SH_ASSETS/hardrockhotelsg-exterior.jpg",
		host: "117159499874018329260",
		type: ListingType.Apartment,
		address: "Kita-Ku, Tokyo , Japan",
		country: "Japan",
		admin: "tokyo",
		city: "Kita-Ku",
		bookings: [],
		bookingsIndex: {},
		price: 1350,
		numOfGuests: 3,
	},
	{
		_id: new ObjectId("5d378db94e34753160e08b31"),
		title: "Kyoto·Hostel Mundo Chiquito·8-bed Mixed Dormitory",
		description:
			"Hostel Mundo Chiquito is a guesthouse renovated from 'Kyomachiya', which is a unique kind of traditional Japanese house in Kyoto. You could stay in one of the bed in a mixed 8-bed dormitory room. Free WiFi is available. Toilets and shower rooms (24 hours available) are shared. You are also welcome to enjoy free Japanese tea and coffee in the common room, as well as to use the shared kitchen. 3-minute walk from Nijo castle (World Heritage) and 10-minute walk from Kyoto imperial Palace!",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684530/SH_ASSETS/https_3A_2F_2Fblogs-images.forbes.com_2Flarryolmsted_2Ffiles_2F2017_2F10_2FStanleyHotel.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Kita-Ku, Tokyo , Japan",
		country: "Japan",
		admin: "tokyo",
		city: "Kita-Ku",
		bookings: [],
		bookingsIndex: {},
		price: 1645,
		numOfGuests: 3,
	},
	{
		_id: new ObjectId("5d378db94e34753640e08b31"),
		title:
			"京都駅八条口からすぐ 新幹線 夜行バス リムジンバス降りて5分で便利 新築できれいで快適",
		description:
			"The apartment is about a 5 minute walk from Jujo station on Karasuma line which is about a 3 minute away from Kyoto station (2 stops ride from Kyoto station). Also you can walk to the apartment from Kyoto station within a 16 minute. The apartment is officially approved by Kyoto city as a guest house and it meets all regulations such fire defence law and has all necessary fire prevention equipments.It is a very beautiful room completely renovated in December 2016.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684479/SH_ASSETS/bwidi-lobby-0016-hor-feat.jpg",
		host: "117159499874018329260",
		type: ListingType.Apartment,
		address: "Kita-Ku, Tokyo , Japan",
		country: "Japan",
		admin: "tokyo",
		city: "Kita-Ku",
		bookings: [],
		bookingsIndex: {},
		price: 1325,
		numOfGuests: 3,
	},
	//India
	{
		_id: new ObjectId("5d378db94e84753160e08b32"),
		title: "Royal Exotica mansion",
		description:
			"Royal Exotica is a Private Studio condominium which offer a luxurious lifestyle and the modern comforts of a home. An ideal, fully-equipped couple friendly cozy private studio with an independent access. Ideal for small families, business trips, and couples, setup with all essentials / amenities. Come enjoy a relaxing stay in a home away from home in the famous city of Greater Noida.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684467/SH_ASSETS/51940fed_z.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Agra, Uttar Pradesh , India",
		country: "India",
		admin: "Uttar Pradesh",
		city: "Agra",
		bookings: [],
		bookingsIndex: {},
		price: 4055,
		numOfGuests: 2,
	},
	{
		_id: new ObjectId("5d378db94e84753260e08b32"),
		title: "THE MINT",
		description:
			"We offer complimentary pick-up & drop to our guests from the airport/ railway station and also arrange reliable transport for local and outstation travel at very compelling rates subject to availability.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684457/SH_ASSETS/zimmer-komfort-doppelzimmer-01-hyperion-hotel-basel-2400x1349.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Chandigarh, Punjab , India",
		country: "India",
		admin: "Uttar Pradesh",
		city: "Chandigarh",
		bookings: [],
		bookingsIndex: {},
		price: 1325,
		numOfGuests: 2,
	},
	{
		_id: new ObjectId("5d378ab94e84753260e08b32"),
		title: "Air conditioned Flat- private",
		description:
			"Wifi & TV & AC are available. The house is in the center of the visakhapatnam city. The house is on the main road of Visalakshinagar police grounds road opposite to hp petrol bunk. This is just at entrance of Kailashgiri hill park( by road). It's a beautiful scenic view from the building. At the doorstep of the house you can find any public transportion because it is on the main road.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684453/SH_ASSETS/cataloina_porto_doble_balcon2_2.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Visakhapatnam, Andhra Pradesh, India",
		country: "India",
		admin: "Andhra Pradesh",
		city: "Visakhapatnam",
		bookings: [],
		bookingsIndex: {},
		price: 4050,
		numOfGuests: 2,
	},
	{
		_id: new ObjectId("5d378aa94e84753260e08b32"),
		title: "Prakruti Farms",
		description:
			"Prakruti Farms is in the vicinity of Art of Living on Kanakapura road. You’ll adore the farm for its serenity and verdant greenery. We practice natural organic farming techniques and Permaculture. The property is ideally suited for nature lovers, farming enthusiasts and family outings.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684896/SH_ASSETS/maui-house-lifeedited-architecture-hawaii_dezeen_2364_col_51-852x568.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Kaggalipura, Karnataka, India",
		country: "India",
		admin: "Karnataka",
		city: "Kaggalipura",
		bookings: [],
		bookingsIndex: {},
		price: 3010,
		numOfGuests: 2,
	},
	{
		_id: new ObjectId("5d378aa94e842a3260e08b32"),
		title: "Abhaya hotel",
		description:
			"A peaceful getaway home that doesn't force one to gravitate away from the city per session. The comforts of a resort wrapped up in to the premises of your stay. The perfect duo of accessibility with just the ambience you need!.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684606/SH_ASSETS/bospar-2880x1870.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Kaggalipura, Karnataka, India",
		country: "India",
		admin: "Karnataka",
		city: "Kaggalipura",
		bookings: [],
		bookingsIndex: {},
		price: 2310,
		numOfGuests: 2,
	},
	{
		_id: new ObjectId("5d33aaa94e842a3260e08b32"),
		title: "Kadackal Farms - Mallika, Hivehomes",
		description:
			"We are trying to keep up the meaning of a farm house as described in traditional English tales of yester years. A farm where animals and birds and flowers and vegetables bloom together and people who spend some time in the farm can get to experience the existence of existence. There is a walk way around the farm of about 800 mtrs that will help make this happen.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684771/SH_ASSETS/1ca01432-c2fe-4f4f-95ec-9ea2c2044a4d.f6.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Tezpur, Assam, India",
		country: "India",
		admin: "Assam",
		city: "Tezpur",
		bookings: [],
		bookingsIndex: {},
		price: 3210,
		numOfGuests: 2,
	},
	{
		_id: new ObjectId("5d33aaa94e842a3260e08ba2"),
		title: "The Bhowmick's Bungalow",
		description:
			"The Bhowmick's Bungalow is an heritage property which is more than 130 year old . It has a full bloom garden and a gazebo overlooking it for having a cup of garden tea. The breakfast is meticulously curated by the owner of the property. It's located in the heart of the city making it ideal for visiting local site scene at a less proximity. This bungalow is adorned with antique furnitures to give the feel of the era it belonged to. Many untold stories are embedded in the walls of this property.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684530/SH_ASSETS/https_3A_2F_2Fblogs-images.forbes.com_2Flarryolmsted_2Ffiles_2F2017_2F10_2FStanleyHotel.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Tezpur, Assam, India",
		country: "India",
		admin: "Assam",
		city: "Tezpur",
		bookings: [],
		bookingsIndex: {},
		price: 1525,
		numOfGuests: 2,
	},
	{
		_id: new ObjectId("5d33aaa94e8a3a3260e08ba2"),
		title: "Grassroot Homes - Luit",
		description:
			"Entire service apartment at the center of the city with one large bedroom and one living cum dining room with a fully furnished kitchenette and toilet comfortable for a small family or 3 guests. 24 hours power connectivity with free WiFi and round the clock water supply. There are also several restaurants nearby from where one can order food, when they want to have a quick bite.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684479/SH_ASSETS/bwidi-lobby-0016-hor-feat.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Bhopal, Madhya Pradesh, India",
		country: "India",
		admin: "Madhya Pradesh",
		city: "Bhopal",
		bookings: [],
		bookingsIndex: {},
		price: 1395,
		numOfGuests: 2,
	},
	{
		_id: new ObjectId("5d33aaa94e842a3260a08ba2"),
		title: "Celestial Resorts Villa, a Luxury Retreat 🌲",
		description:
			"The resort is built on 10000 sq ft land with spacious beautiful landscaped garden with natural surroundings and garden night lights for a calm, serene, beautiful and peaceful ambience.complimentary Wi-Fi services, housekeeping, 24 hrs Caretaker for a wonderful and comfortable stay. The resort offers spacious rooms with furnishings and intricately carved furniture. The well-lit rooms have simple furniture and large windows. The windows allow proper ventilation in the rooms. The rooms are air-conditioned, TV and equipped with Cupboard and a personal safe. The large attached bathrooms come with shower and running hot and cold water.The property also provides other facilities like CCTV security, parking, power back and free Wi-Fi to its guests.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684479/SH_ASSETS/bwidi-lobby-0016-hor-feat.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Bhopal, Madhya Pradesh, India",
		country: "India",
		admin: "Madhya Pradesh",
		city: "Bhopal",
		bookings: [],
		bookingsIndex: {},
		price: 3215,
		numOfGuests: 2,
	},
	{
		_id: new ObjectId("5d33aaa94e84aa3260e08ba2"),
		title: "Vista Del Lago",
		description:
			"The listing is for 1 of the 3 villas/cottages at Vista Del Lago( Extra bed provided upon request).We provide 3 separate cottages with Balcony which has beautiful lake and Mountain view. We also have a Private room with attached toilet which have 3 single beds.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596688286/SH_ASSETS/trump-hotel-chicago-illinois-usa.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Bhopal, Madhya Pradesh, India",
		country: "India",
		admin: "Madhya Pradesh",
		city: "Bhopal",
		bookings: [],
		bookingsIndex: {},
		price: 4260,
		numOfGuests: 2,
	},
	{
		_id: new ObjectId("5d378db94e84753160e08b33"),
		title: "Symphony Palms Resort",
		description:
			"Luxury condo suite located in the heart of the city with building pool/gym/sauna available 24/7. Buses, subway, and all other amenities are available close by. Booking comes with 1 available parking spot in building underground.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684461/SH_ASSETS/13d75164caaf0f692321d155994ff9e6.jpg",
		host: "117159499874018329260",
		type: ListingType.Apartment,
		address: "Havelock Island, Andaman and Nicobar , India",
		country: "India",
		admin: "Andaman and Nicobar",
		city: "Andaman and Nicobar",
		bookings: [],
		bookingsIndex: {},
		price: 3215,
		numOfGuests: 4,
	},
	//london
	{
		_id: new ObjectId("5d378db94e84753160e08b34"),
		title: "Stylish, New & Exceptionally Clean En-Suite Room!",
		description:
			"High end, newly refurbished, 5 Star double room with ensuite bathroom. Spacious and well designed living and sleeping space complimented by our fully equipped modern kitchen. Décor is exceptional throughout. 5 mins walk to Battersea Park, 15 minutes to Clapham Junction and 15 minutes to South Kensington tube Station. Ideal for exploring all that Central London has to offer.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596687551/SH_ASSETS/250492420.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "London, England, United Kingdom",
		country: "United Kingdom",
		admin: "England",
		city: "London",
		bookings: [],
		bookingsIndex: {},
		price: 2095,
		numOfGuests: 5,
	},
	{
		_id: new ObjectId("5d378db94e84753160e08b35"),
		title: "Penthouse on Park, Ensuite, Priv. Terrace, Station",
		description:
			"Our light and airy penthouse has long views south, east and west. It’s the top floor of a converted Victorian schoolhouse, oriented to catch all available sun. Your room faces south and east, with an ensuite bathroom and two sets of double doors leading to your own private terrace, and the shared terrace too. You have shared use of the kitchen, lounge and dining area. London Fields station is 2 mins walk – Liverpool Street in 10 mins. We have a 50m lido, heated year-round, 2 mins walk away.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596687514/SH_ASSETS/Villa_Rental_Partners_-_luxury_villa_marketing_and_booking_management.png",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "London, England, United Kingdom",
		country: "United Kingdom",
		admin: "England",
		city: "London",
		bookings: [],
		bookingsIndex: {},
		price: 1685,
		numOfGuests: 2,
	},
	//hawaii
	{
		_id: new ObjectId("5d378db94e84753160e08b36"),
		title: "Ocean View Studio with Canopy Balcony",
		description:
			"Watch a spectacular sunset over the ocean from the comfort of this top-level apartment. This recently remodeled home features an incredible ocean view from the balcony (with dining area), private entry, eclectic furnishings and decor, bright pops of turquoise, and a backyard garden. Park in your own covered parking spot and the hosts provide a top-rated level of service and amenities.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596687480/SH_ASSETS/international-luxury-villa.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Kailua-Kona, Hawaii, United States",
		country: "United States",
		admin: "Hawaii",
		city: "Kailua-Kona",
		bookings: [],
		bookingsIndex: {},
		price: 2570,
		numOfGuests: 1,
	},
	{
		_id: new ObjectId("5d378db92e84753160e08b36"),
		title: "Pele's Eye",
		description:
			"Pele's Eye is an eco friendly, off grid two story cottage, with a breath taking, mesmerizing, 180̊ sweeping view of the Pacific Ocean, solution to a worry free, quiet, adventurous getaway south of Naalehu. Situated on a 23 acres of rolling grass lands with no neighbors, no mosquitoes, no coqui frogs, no roosters to disturb ones well being. Pele’s Eye is a smoke free environment.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596684771/SH_ASSETS/1ca01432-c2fe-4f4f-95ec-9ea2c2044a4d.f6.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Kailua-Kona, Hawaii, United States",
		country: "United States",
		admin: "Hawaii",
		city: "Kailua-Kona",
		bookings: [],
		bookingsIndex: {},
		price: 3215,
		numOfGuests: 3,
	},
	{
		_id: new ObjectId("5d378db94e84753160e08b37"),
		title: "Chic downtown condo",
		description:
			"Hale 'Alalā is named after the highly endangered hawaiian crow being reintroduced to the forests around Volcano. Only 20 of these birds exist in the wild.The cottage is situated in the rainforest and barely visible from the road, making this a private retreat that's just a 5 minute drive (3.3 miles) to the entrance gate of Hawaii Volcanoes National Park.This cozy cottage has many thoughtful touches such as Bluetooth speaker clocks with USB charging ports for your electronics, an electric fireplace in both the living room and bedroom, and a kitchen with all the utensils and appliances you should need for quick meals.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596687442/SH_ASSETS/175239980.jpg",
		host: "117159499874018329260",
		type: ListingType.Apartment,
		address: "Kailua-Kona, Hawaii, United States",
		country: "United States",
		admin: "Hawaii",
		city: "Kailua-Kona",
		bookings: [],
		bookingsIndex: {},
		price: 2390,
		numOfGuests: 4,
	},

	{
		_id: new ObjectId("5d378db94e84753160e08b38"),
		title: "Exclusive apartment, with a super location",
		description:
			"Luxury apartment, 95 sqm,parking, with one of the best locations in Bergen. 2 bedrooms. One double, and one single bed.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596687408/SH_ASSETS/200659852.jpg",
		host: "117159499874018329260",
		type: ListingType.Apartment,
		address: "Bergen , Vestland , Norge",
		country: "Norge",
		admin: "Bergen",
		city: "Vestland",
		bookings: [],
		bookingsIndex: {},
		price: 2190,
		numOfGuests: 3,
	},
	{
		_id: new ObjectId("5d378db94e84753160e08b39"),
		title: "Premium apartment in the luxury Emirates Hills",
		description:
			"This sweet and cozy 1 bedroom apartment is located in the middle of a peaceful neighborhood and community. With amazing facilities, you can enjoy your stay at reasonable prices.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596687374/SH_ASSETS/4690b269e507e416e04b0a23ecd67ff7.jpg",
		host: "117159499874018329260",
		type: ListingType.Apartment,
		address: "55 Emirates Hills Dr, Dubai, United Arab Emirates",
		country: "United Arab Emirates",
		admin: "Dubai",
		city: "Dubai",
		bookings: [],
		bookingsIndex: {},
		price: 3240,
		numOfGuests: 5,
	},
	{
		_id: new ObjectId("5d378db94e84753160e08b3a"),
		title: "Modern apartment, close to all city sights.",
		description:
			"Nice, modern and clean apartment located in the heart of Bergen. Close to Funicular, Bryggen, Fish Marked and all of the city sights and restaurants. Nespresso machine with coffee (and tea) included. Fully equipped kitchen. Large bathroom with washer/dryer. Wifi and cable TV.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596687342/SH_ASSETS/1dbe9b16407b6b38d2aa55269032ac99.jpg",
		host: "117159499874018329260",
		type: ListingType.Apartment,
		address: "Stavanger , Rogaland , Norge",
		country: "Norge",
		admin: "Rogaland",
		city: "Stavanger",
		bookings: [],
		bookingsIndex: {},
		price: 1610,
		numOfGuests: 4,
	},
	{
		_id: new ObjectId("5d378db94e84753160e08b3b"),
		title: "Fontana bedroom - Campo de' Fiori",
		description:
			"Fontana bedroom is a comfortable private bedroom with double bed and private bathroom located just 300 meters from Campo de Fiori e Piazza Navona.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596687280/SH_ASSETS/162920285.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Rome, Lazio, Italia",
		country: "Italia",
		admin: "Lazio",
		city: "Rome",
		bookings: [],
		bookingsIndex: {},
		price: 1165,
		numOfGuests: 5,
	},
	{
		_id: new ObjectId("5d378db94e84753160e08b3c"),
		title: "Massy & Alex house ",
		description:
			"L appartamento è situato al 3 piano , si compone di 3 camere ognuna con il proprio bagno , quindi 3 camere e 3 bagni , cucina in comune attrezzata , piccolo terrazzo dove è presente la lavatrice.",
		image:
			"https://res.cloudinary.com/dghaikhyj/image/upload/v1596688746/SH_ASSETS/Luxury-Hotel-2.jpg",
		host: "117159499874018329260",
		type: ListingType.House,
		address: "Rome, Lazio, Italia",
		country: "Italia",
		admin: "Lazio",
		city: "Rome",
		bookings: [],
		bookingsIndex: {},
		price: 1685,
		numOfGuests: 4,
	},
];
// seed  users if needed
// const users: User[] = [
// 	{
// 		_id: "",
// 		token: "",
// 		name: "",
// 		avatar:
// 			"",
// 		contact: "",
// 		walletId: "",
// 		income: 0,
// 		bookings: [],
// 		listings: [
// 			new ObjectId(""),
// 		],
// 	} ]
const seed = async () => {
	try {
		console.log("[seed] : running...");

		const db = await ConnectToDatabase();
		for (const listing of listings) {
			await db.listings.insertOne(listing);
		}

		const setUserListings = () => {
			return listings.map(({ _id }) => _id);
		};
		db.users.updateOne(
			{ contact: "jrohit072@gmail.com" },
			{
				$set: {
					listings: setUserListings(),
				},
			}
		);

		// for (const user of users) {
		// 	await db.users.insertOne(user);
		// }

		console.log("[seed] : success");
		return;
	} catch {
		throw new Error("failed to seed database");
	}
};

seed();
