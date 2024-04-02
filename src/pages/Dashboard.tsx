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
    name: '',
    email: '',
  });

  useEffect(() => {
    const usuarioGuardado = sessionStorage.getItem('user');
    if (!usuarioGuardado) {
      //FIXME - No deberia llegar hasta aca sin haber un usuario asique te deberia redirigir al login
      setUser({
        name: '',
        email: '',
      });
      return;
    }
    const usuarioObjeto = JSON.parse(usuarioGuardado);
    //FIXME - Traer al usuario y fijarme si tiene los datos de coneccion con strupe y MM y si tiene los datos de la compania
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
