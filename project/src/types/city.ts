export type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CityType = {
  location: Location;
  name: string;
};
