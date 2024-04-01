import { Button } from '@/components/ui/button';
import { CardDescription } from '@/components/ui/card';

interface CompanyInfoProps {
  editable: boolean;
  // companyName: string;
  // email: string;
  // state: string;
  // address: string;
  // taxId: string;
}

const CompanyInfo = ({ editable }: CompanyInfoProps) => {
  return (
    <div>
      <CardDescription className="mb-2  text-black font-medium text-xl">
        Your Company Name
      </CardDescription>
      <CardDescription className="text-xs font-medium mb-2">
        name@email.com{' '}
      </CardDescription>
      <CardDescription className="text-xs font-medium">
        860 Forest Ave, Palo Alto,{' '}
      </CardDescription>
      <CardDescription className="text-xs font-medium mb-2">
        California 94301{' '}
      </CardDescription>
      <CardDescription className="text-xs font-medium">
        Tax IcD: 12345
      </CardDescription>
      {editable && (
        <Button
          className="flex font-normal text-sm p-0 text-sky-500"
          variant="link"
        >
          Edit Details
        </Button>
      )}
    </div>
  );
};

export default CompanyInfo;
