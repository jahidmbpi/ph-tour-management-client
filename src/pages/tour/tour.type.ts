export interface TourApiItem {
  _id: string;
  title: string;
  description: string;
  images: string[];
  location: string;
  costFrom: number;
  startDate: string;
  endDate: string;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
  maxGuest: number;
  minAge: number;
  departureLocation: string;
  arrivalLocation: string;
  division: string;
  tourType: string;
  deleteImage: string[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
  duration: number;
}

export interface Meta {
  page: number;
  limit: number;
  totale: number;
  totalPage: number;
}

export interface TourApiResponse {
  data: TourApiItem[];
  meta: Meta;
}

export interface TourListResponse {
  success: boolean;
  massage: string;
  allTour: TourApiResponse;
}
