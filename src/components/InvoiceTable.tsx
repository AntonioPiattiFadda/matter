import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { Link } from 'react-router-dom';
import { getUserByEmail, getUserInvoices } from '@/Services';
import { Connections, User, UserInvoices } from '@/types';

interface InvoiceTableProps {
  user: User;
  connections: Connections;
}

const InvoiceTable = ({ user, connections }: InvoiceTableProps) => {
  const [invoices, setInvoices] = useState<UserInvoices[]>([]);

  useEffect(() => {
    //FIXME Traer los invoices del user que tiene el email en user.email

    getUserByEmail(user.email).then((data) => {
      if (data) {
        //TODO - Traer el id del user
        const userId: string = 'KObY1Tueq9xb7n5h6ekz';
        getUserInvoices(userId).then((data) => {
          const mappedInvoices = data.map((invoice) => {
            return {
              id: invoice.id,
              status: invoice.status,
              from: invoice.companyName,
              to: invoice.toCompanyName,
              amount: invoice.total,
              payDate: invoice.dueDate,
            };
          });

          setInvoices(mappedInvoices);
        });
      }
    });
  }, [invoices, user.email]);

  if (!connections.userInfo || !connections.stripe || !connections.metamask) {
    return (
      <div className="hidden  sm:grid place-content-center w-screen h-screen  bg-slate-50 ">
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

  if (invoices.length === 0) {
    return (
      <div className="hidden  sm:grid place-content-center w-screen h-screen  bg-slate-50">
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
            <Button>
              <Link className="flex" to={'/create-invoice'}>
                <img
                  className="h-4 mr-1"
                  src="../../public/AddIcon.png"
                  alt="add icon"
                />
                Create New
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const columns = [
    {
      accessorKey: 'status',
      header: () => (
        <div className="text-base font-bold text-black">Status</div>
      ),
      cell: ({ row }) => {
        let message;
        let styles;
        const payDateTimestamp = row.original.payDate;
        const currentDateTimestamp = new Date()
          .getTime()
          .toString()
          .substring(0, 8);
        const currentDateTimestamp2 = parseInt(currentDateTimestamp);

        const isPastDue = payDateTimestamp.seconds < currentDateTimestamp2;

        const payDate = new Date(
          payDateTimestamp.seconds * 1000 +
            payDateTimestamp.nanoseconds / 1000000
        );
        const formatDate = (date: Date) => {
          const month = date.getMonth() + 1;
          const day = date.getDate();
          const year = date.getFullYear();
          return `${month}/${day}/${year}`;
        };

        const formattedPayDateStr = formatDate(payDate);

        switch (row.original.status) {
          case 'paid':
            message = `Paid on ${formattedPayDateStr}`;
            styles =
              'text-green-700 bg-green-100 font-medium text-base p-2 pl-4';
            break;
          case 'pending':
            if (isPastDue) {
              message = 'Past Due';
              styles = 'bg-red-100 font-medium text-base p-2 pl-4 text-red-600';
            } else {
              message = 'Pending Payment';
              styles = 'bg-slate-100 font-medium text-base p-2 pl-4';
            }
            break;

          default:
            message = 'Estado desconocido';
        }
        return <div className={styles}>{message}</div>;
      },
    },
    {
      accessorKey: 'invoiceId',
      header: () => (
        <div className="text-base font-bold text-black">Invoice #</div>
      ),
      cell: ({ row }) => {
        return (
          <div className="font-medium text-base p-2 pl-4">
            {row.original.id}
          </div>
        );
      },
    },

    {
      accessorKey: 'from',
      header: () => <div className="text-base font-bold text-black">From</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium text-base p-2 pl-4">
            {row.original.from}
          </div>
        );
      },
    },
    {
      accessorKey: 'to',
      header: () => <div className="text-base font-bold text-black">To</div>,
      cell: ({ row }) => {
        return (
          <div className="font-medium text-base p-2 pl-4">
            {row.original.to}
          </div>
        );
      },
    },
    {
      accessorKey: 'amount',
      header: () => (
        <div className="text-base font-bold text-black">Amount</div>
      ),
      cell: ({ row }) => {
        return (
          <div className="font-medium text-base p-2 pl-4">
            ${row.original.amount}
          </div>
        );
      },
    },
    {
      accessorKey: 'link',
      header: () => <div className="text-right"></div>,
      cell: ({ row }) => {
        return (
          <div className="text-right font-medium text-sky-600 p-2 pr-4 text-base">
            <Link to={`/view-invoice/${row.original.id}`}>View</Link>
          </div>
        );
      },
    },
  ];

  return (
    <div className="hidden  sm:flex flex-col w-full bg-white rounded-lg shadow-md">
      <DataTable columns={columns} data={invoices} />
    </div>
  );
};

export default InvoiceTable;
