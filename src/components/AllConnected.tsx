import MetamaskConectionInfo from './MetamaskConectionInfo';
import StripeConectionInfo from './StripeConectionInfo';
import UserInfo from './UserInfo';

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
    </div>
  );
};

export default AllConnected;
