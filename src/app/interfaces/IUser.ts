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

export interface IAddress {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo: IGeolocation;
}

export interface IGeolocation {
  lat: number;
  lng: number;
}

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}