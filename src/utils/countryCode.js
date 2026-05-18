import { countries } from "country-data";

export const getAllCountryCodes = () => {
  return countries.all
    .filter((item) => item.countryCallingCodes?.length)
    .map((item) => ({
      name: item.name,
      code: item.alpha2,
      dialCode: item.countryCallingCodes[0].replace(" ", ""),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
};