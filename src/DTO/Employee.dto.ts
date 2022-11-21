export interface EmployeeCreation {
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: string;
  photo?: string;
}

export interface FilterEmployee {
  search?: string;
  sort?: string;
  searchBy?: string;
  sortBy?: string;
}
