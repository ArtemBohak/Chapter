import { FC, useEffect, useState } from "react";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
  GetCountries,
  GetState,
  GetCity,
} from "react-country-state-city";
import { CountriesType } from "./UserLocation.type";
import "./UserLocation.scss";
// import "react-country-state-city/dist/react-country-state-city.css";

// const UserLocation: FC = () => {
//   const [countryid, setCountryid] = useState(0);
//   const [stateid, setStateid] = useState(0);
//   const [cityid, setCityid] = useState(0);

//   const [countriesList, setCountriesList] = useState<
//     Array<Partial<CountriesType>>
//   >([]);
//   const [stateList, setStateList] = useState([]);
//   const [cityList, setCityList] = useState([]);

//   useEffect(() => {
//     GetCountries().then((result: CountriesType[]) => {
//       const countries = result.map((item) => ({
//         id: item.id,
//         emoji: item.emoji,
//         name: item.name,
//       }));
//       setCountriesList(countries);
//     });
//   }, []);

//   return (
//     <form>
//       <label>
//         <input type="text" />
//       </label>
//     </form>
//   );
// };

const UserLocation: FC = () => {
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  return (
    <div>
      <h6>Country</h6>
      <CountrySelect
        onChange={(e) => {
          setCountryid(e.id);
        }}
        placeHolder="Select Country"
      />
      <h6>State</h6>
      <StateSelect
        countryid={countryid}
        onChange={(e) => {
          setstateid(e.id);
        }}
        placeHolder="Select State"
      />
      <h6>City</h6>
      <CitySelect
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select City"
      />
      <h6>Language</h6>
      <LanguageSelect
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select Language"
      />
    </div>
  );
};

export default UserLocation;
