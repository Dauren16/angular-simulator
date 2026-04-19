export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: IAddress;
  website: string;
  company: ICompany;
}

interface IAddress {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo: IGeolocation;
}

interface IGeolocation {
  lat: number | null;
  lng: number | null;
}

interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}