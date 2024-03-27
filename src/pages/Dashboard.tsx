import { useState } from 'react';
import InvoiceTable from '../components/InvoiceTable';
import WalletConection from '../components/WalletConection';

const Dashboard = () => {
  //FIXME - Logica del user si esta loggeado o no
  const [allConnected, setAllConnected] = useState(false);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <WalletConection
        allConnected={allConnected}
        setAllConnected={setAllConnected}
      />

      <InvoiceTable
        allConnected={allConnected}
        setAllConnected={setAllConnected}
      />
    </div>
  );
};

export default Dashboard;
