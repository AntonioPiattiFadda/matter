import { useEffect, useState } from 'react';
import InvoiceTable from '../components/InvoiceTable';
import WalletConection from '../components/WalletConection';
import { Connections } from '@/types';

const Dashboard = () => {
  const [connections, setConnections] = useState<Connections>({
    userInfo: false,
    stripe: false,
    metamask: false,
  });
  const [user, setUser] = useState({
    id: '',
    email: '',
  });

  useEffect(() => {
    const usuarioGuardado = sessionStorage.getItem('user');
    if (!usuarioGuardado) {
      return;
    }
    const usuarioObjeto = JSON.parse(usuarioGuardado);
    setUser(usuarioObjeto);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <WalletConection
        user={user}
        setConnections={setConnections}
        connections={connections}
      />

      <InvoiceTable user={user} connections={connections} />
    </div>
  );
};

export default Dashboard;
