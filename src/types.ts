export interface UpdateCompanyInfo {
  adress?: string;
  bussines_email?: string;
  city?: string;
  company_name?: string;
  country?: string;
  state?: string;
  tax_id?: string;
  zip?: string;
}

export interface User {
  email: string;
  name: string;
}

export interface CreateUser {
  email: string;
}

export interface UserInvoices {
  status: string;
  id: string;
  from: string;
  to: string;
  amount: number;
  payDate: Date;
}

export interface Connections {
  userInfo: boolean;
  stripe: boolean;
  metamask: boolean;
}

export interface InvoiceItem {
  description: string;
  price: number;
  quantity: number;
  amount: number;
  [key: string]: string | number;
}

export interface Invoice {
  companyName: string;
  date: Date | null;
  dueDate: Date | null;
  payDate: Date | null;
  toCompanyName: string;
  toCompanyEmail: string;
  toCompanyAddress: string;
  toCompanyTaxId: string;
  subTotal: number;
  tax: number;
  discount: number;
  shipping: number;
  total: number;
  notes: string;
  terms: string;
  status: string;
}
