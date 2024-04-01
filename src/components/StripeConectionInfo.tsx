import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';

const StripeConectionInfo = () => {
  return (
    <div>
      <CardDescription className="mb-2 mt-2 text-black font-medium">
        Cash Payouts Sending To:
      </CardDescription>
      <CardDescription className="">
        Stripe Account Name Stripe Account
      </CardDescription>
      <Button
        className="flex font-normal text-sm p-0 text-sky-500"
        variant="link"
      >
        Disconnect
      </Button>
    </div>
  );
};

export default StripeConectionInfo;
