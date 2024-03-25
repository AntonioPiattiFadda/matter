import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Link } from 'react-router-dom';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import invoices from '@/data/mock-invoices.json';
import { useEffect, useState } from 'react';

interface Invoice {
  status: string;
  invoiceId: string;
  from: string;
  to: string;
  amount: number;
  link: string;
  //FIXME - Falta agregar la fecha del pago y sacar link porque no sirve aca
}

const InvoiceTable = ({ allConnected, setAllConnected }) => {
  const [filteredInvoices, setFilteredInvoices] = useState<Invoice[]>(invoices);
  const [selectedTab, setSelectedTab] = useState('all');

  //NOTE - Logica de filtrado de Invoices

  const [invoiceEmpty, setInvoiceEmpty] = useState(true);

  const handleCreateNewInvoice = () => {
    //FIXME - Logica de creacion de invoice
    setInvoiceEmpty(false);
  };

  const handleTabChange = (value) => {
    console.log(value);
  };

  if (!allConnected) {
    return (
      <div className="grid place-content-center w-screen h-screen  bg-slate-50">
        <Card className="w-[500px] rounded-2xl">
          <CardHeader>
            <CardTitle>
              {' '}
              <img
                className="flex h-48 ml-2"
                src="../../public/CompleteAccountFirst.png"
                alt="Drop image"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-900 font-bold text-xl">
              {' '}
              First, complete your account.{' '}
            </CardDescription>
          </CardContent>
          <CardFooter>
            <CardDescription className="text-slate-500 text-base font-medium">
              To send invoices add your company details, connect stripe and
              MetaMask.
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (invoiceEmpty) {
    return (
      <div className="grid place-content-center w-screen h-screen  bg-slate-50">
        <Card className="w-[500px] rounded-2xl">
          <CardHeader>
            <CardTitle>
              {' '}
              <img
                className="flex h-48 ml-2"
                src="../../public/CompleteAccountFirst.png"
                alt="Drop image"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-900 font-bold text-xl">
              {' '}
              Let’s make your first invoice!{' '}
            </CardDescription>
            <CardDescription className="text-slate-500 text-base font-sm">
              Create your first invoice, once you do you’ll see them here.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Button onClick={handleCreateNewInvoice}>
              <img
                className="h-4 mr-1"
                src="../../public/AddIcon.png"
                alt="add icon"
              />
              Create New
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div
      className="flex flex-col w-full p-4 bg-white rounded-lg shadow-md
 "
    >
      <div className="flex flex-row justify-between w-full h-16">
        <Tabs defaultValue="all">
          <TabsList>
            <TabsTrigger onClick={handleTabChange} value="all">
              All invoices
            </TabsTrigger>
            <TabsTrigger onClick={handleTabChange} value="Paid">
              Unpaid invoices
            </TabsTrigger>
            <TabsTrigger onClick={handleTabChange} value="Pending">
              Paid invoices
            </TabsTrigger>
            <TabsTrigger onClick={handleTabChange} value="Past Due">
              Past Due
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <Button>
          <img
            className="h-4 mr-1"
            src="../../public/AddIcon.png"
            alt="add icon"
          />
          Create New
        </Button>
      </div>
      <Table className="w-full  border border-gray-300 rounded-lg">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Status</TableHead>
            <TableHead>Invoice #</TableHead>
            <TableHead>From</TableHead>
            <TableHead>To</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredInvoices.map((invoice) => {
            let message;
            let styles;

            switch (invoice.status) {
              case 'Paid':
                message = 'Paid on:';
                styles = 'text-green-700 bg-green-100 font-medium text-base';
                break;
              case 'Pending':
                message = 'Pending Payment';
                styles = 'bg-slate-100 font-medium text-base';
                break;
              case 'Past Due':
                message = 'Pas Due';
                styles = 'text-red-500 bg-red-100 font-medium text-base';
                break;
              default:
                message = 'Estado desconocido';
            }

            return (
              <TableRow key={invoice.invoiceId}>
                <TableCell className={styles}>{message}</TableCell>
                <TableCell>{invoice.invoiceId}</TableCell>
                <TableCell>{invoice.from}</TableCell>
                <TableCell>{invoice.to}</TableCell>
                <TableCell className="text-right">{invoice.amount}</TableCell>
                <TableCell className="text-right text-sky-400">
                  <a href={invoice.link}>View</a>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceTable;
