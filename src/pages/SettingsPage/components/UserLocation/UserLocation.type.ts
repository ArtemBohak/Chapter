export type UserLocationProps = {
  country: number | null;
  region: number | null;
  city: number | null;
};

export type CountriesType = {
  capital: string;
  currency: string;
  currency_name: string;
  currency_symbol: string;
  emoji: string;
  id: number;
  iso2: string;
  iso3: string;
  latitude: string;
  longitude: string;
  name: string;
  native: string;
  numeric_code: string;
  phone_code: number;
  region: string;
  subregion: string;
  tld: string;
};

export type StateType = {
  id: number;
  name: string;
  state_code: string;
} & Partial<CountriesType>;

export type CityType = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
} & Partial<StateType>;
