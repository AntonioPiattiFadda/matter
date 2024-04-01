import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { useState } from 'react';
import invoiceDetail from '@/data/mock-inovice-detail.json';
import { useParams } from 'react-router-dom';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getInvoiceById } from '@/Services';
import CompanyInfo from '../components/CompanyInfo';
import { Invoice } from '@/types';

const NoBorderStyle = {
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
};

const ViewInvoice = () => {
  //FIXME - Traer el id del user y de la factura en los params porque el cliente que lo vea no puede loggearse
  const { id } = useParams();
  const userID = 'KObY1Tueq9xb7n5h6ekz';

  const [invoice, setInvoice] = useState<Invoice | null>(null);

  if (id) {
    //FIXME - Traer el user ID del usuario logueado
    getInvoiceById(userID, id).then((res) => {
      return setInvoice((res as unknown as Invoice) || null);
    });
  }

  if (!invoice) {
    return <div>No hay invoice</div>;
  }

  return (
    <div className="bg-slate-100 flex flex-col justify-center sm:items-center relative">
      <nav className="bg-black text-white flex justify-center items-center h-10 text-sm w-full">
        <span className="w-[350px] text-center">
          {invoice.status === 'paid'
            ? `This invoice was paid on ${invoice.dueDate}`
            : 'This invoice has not been paid.'}
        </span>
      </nav>

      <Card className="m-2 sm:w-[calc(100vw-24px)] sm:max-w-screen-md">
        <CardContent
          className="border flex justify-between items-center w-full h-full p-3"
          style={NoBorderStyle}
        >
          <CardDescription>
            Inovice <span className="font-semibold text-black">00001</span>
          </CardDescription>
          <CardDescription className="flex flex-col justify-between sm:flex-row sm:gap-2">
            <p>
              Issued{' '}
              <span className="font-semibold text-black">MM/DD/YYYY</span>
            </p>
            <p>
              Due Date{' '}
              <span className="font-semibold text-black">MM/DD/YYYY</span>
            </p>
          </CardDescription>
        </CardContent>
        <div className="flex flex-col sm:flex-row">
          <CardContent
            className="border flex justify-between items-center w-full h-full p-3"
            style={NoBorderStyle}
          >
            <CompanyInfo editable={false} />
          </CardContent>
          <CardContent
            className="border flex justify-between items-center w-full h-full p-3"
            style={NoBorderStyle}
          >
            <CompanyInfo editable={false} />
          </CardContent>
        </div>
        <CardContent
          className="border flex flex-col justify-between  w-full h-full p-3"
          style={NoBorderStyle}
        >
          <Table className="w-full p-0">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Description</TableHead>
                <TableHead>QTY</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoiceDetail.map((invoice) => {
                return (
                  <TableRow key={invoice.name}>
                    <TableCell>{invoice.name}</TableCell>
                    <TableCell>{invoice.quantity}</TableCell>
                    <TableCell>{invoice.price}</TableCell>
                    <TableCell>{invoice.amount}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          <CardDescription className="flex justify-between m-2">
            <span>Subtotal</span>
            <span className="text-black text-xs font-semibold">$100.00</span>
          </CardDescription>

          <CardDescription className="flex justify-between m-2">
            <span>Discount</span>
            <span className="text-black text-xs font-semibold">%5</span>
          </CardDescription>

          <CardDescription className="flex justify-between m-2">
            <span>Tax</span>
            <span className="text-black text-xs font-semibold">$10.00</span>
          </CardDescription>

          <CardDescription className="flex justify-between m-2">
            <span>Shipping</span>
            <span className="text-black text-xs font-semibold">$10.00</span>
          </CardDescription>

          <CardDescription className="flex justify-between m-2">
            <span>Total</span>
            <span className="text-black text-lg font-bold">$110.00</span>
          </CardDescription>
        </CardContent>

        <CardContent
          className="border flex flex-col justify-between  w-full h-full p-3"
          style={NoBorderStyle}
        >
          <CardDescription className="flex flex-col justify-between ">
            Notes
          </CardDescription>
          <CardDescription className="flex flex-col justify-between text-black ">
            Lorem ipsum dolor esit amit
          </CardDescription>
        </CardContent>

        <CardContent
          className="border flex flex-col justify-between  w-full h-full p-3"
          style={NoBorderStyle}
        >
          <CardDescription className="flex flex-col justify-between ">
            Terms
          </CardDescription>
          <CardDescription className="flex flex-col justify-between text-black ">
            Lorem ipsum dolor esit amit
          </CardDescription>
        </CardContent>

        <div className="flex flex-col justify-center items-center sm:grid grid-cols-2">
          <CardDescription className="text-black text-base m-5">
            Pay with crypto or card.
          </CardDescription>
          <Button className="text-base m-2 w-11/12 mb-5">
            <img
              className="h-7 mr-2"
              src="../../public/ETHLogo.png"
              alt="eth icon"
            />
            Pay with ETH
          </Button>
          <Button className="text-base m-2 w-11/12 mb-5">
            <img
              className="h-7 mr-2"
              src="../../public/WalletLogo.png"
              alt="wallet icon"
            />
            Pay with ETH
          </Button>
          <CardDescription className="flex gap-2 items-center mb-5">
            Powered by
            <img
              className="h-5 translate-y-[-.05rem]"
              src="../../public/MatterAlt.png"
              alt="matter logo"
            />
          </CardDescription>
        </div>
      </Card>
      <Button className="bg-slate-200 text-black text-base m-2 lg:absolute top-10 right-0">
        <img
          className="h-5 mr-2"
          src="../../public/CopyIcon.png"
          alt="copy icon"
        />
        Copy Share Link{' '}
      </Button>
    </div>
  );
};

export default ViewInvoice;
