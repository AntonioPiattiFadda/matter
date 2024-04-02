import { Timestamp } from 'firebase/firestore';

export interface User {
  id?: string;
  email: string;
  name?: string;
  companyName?: string;
  businessEmail?: string;
  adress?: string;
  city?: string;
  state?: string;
  zip?: string;
  country?: string;
  taxId?: string;
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
  dueDate: Date;
  payDate?: Date | null;
}

export interface Connections {
  userInfo: boolean;
  stripe: boolean;
  metamask: boolean;
}

export interface Invoice {
  id?: string;
  date: Date | null | Timestamp | string;
  dueDate: Date | null | Timestamp | string;
  payDate: Date | null | Timestamp | string;
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
  items?: InvoiceItem[];
}
export interface InvoiceItem {
  description: string;
  price: number;
  quantity: number;
  amount: number;
  [key: string]: string | number;
}

export interface CompanyInfo {
  companyName: string;
  businessEmail: string;
  adress: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  taxId: string;
}
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
