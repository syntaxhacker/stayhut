declare module 'node-geocoder' {
    export interface Entry {
        formattedAddress?: string;
        latitude?: number;
        longitude?: number;
        extra?: {
            googlePlaceId?: string;
            confidence?: number;
        };
        administrativeLevels?: {
            level1long?: string;
            level1short?: string;
            level2long?: string;
            level2short?: string;
        };
        city?: string;
        streetName?: string;
        streetNumber?: string;
        country?: string;
        countryCode?: string;
        zipcode?: string;
        provider?: string;
        state?: string;
        stateCode?: string;
        county?: string;
        district?: string;
        building?: string;
    }
    export interface HereOptions {
        provider: 'here';
        apiKey: string | undefined;
        // appId: string;
        // appCode: string;
        language?: string;
        politicalView?: string;
        country?: string;
        state?: string;
        production?: boolean;
    }
    interface Query {
        address?: string;
        country?: string;
        countryCode?: string;
        zipcode?: string;
        minConfidence?: number;
        limit?: number;
    }

       class Geocoder {
        geocode(query: string | Query, cb?: (err: any, data: Entry[]) => void): Promise<Entry[]>;
    }

    type Options = HereOptions;
    function node_geocoder(options:Options): Geocoder;
    export default node_geocoder;


   }
   