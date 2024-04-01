import MetamaskConectionInfo from './MetamaskConectionInfo';
import StripeConectionInfo from './StripeConectionInfo';
import UserInfo from './CompanyInfo';

const AllConnected = () => {
  return (
    <div
      className="flex flex-col justify-between"
      style={{
        height: 'calc(100vh - 150px)',
      }}
    >
      <UserInfo />
      <div>
        <StripeConectionInfo />
        <MetamaskConectionInfo />
      </div>
      {

invoiceNumber: '',

companyName: '',

date: '0124-04-12',

dueDate: '4124-02-11',

toCompanyName: '',

toCompanyEmail: '',

toCompanyAddress: '',

toCompanyTaxId: '',

tax: 0,

shipping: 0,

total: 0,

notes: '',

terms: '',

items: [ { description: 'sdasdf', price: 0, quantity: 123, amount: 0 } ]

}
      

    </div>
  );
};

export default AllConnected;
