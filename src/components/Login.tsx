import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';

const Login = () => {
  const [sendedCode, setSendedCode] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const handleSendCode = () => {
    //NOTE -  - Logica de envio de codigo por mail
    setSendedCode(true);
  };

  const validateCode = () => {
    //NOTE -  - Logica de validacion del codigo
    // alert('Code validated');
    setCodeError(false);

  };

  if (sendedCode) {
    return (
      <div className="grid place-content-center w-screen h-screen  bg-slate-50">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>
              {' '}
              <img
                className="h-7"
                src="../../public/matterLogo.png"
                alt="Matter Logo"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-slate-900 font-bold text-lg">
              {' '}
              Enter the code in your email.
            </CardDescription>

            <CardDescription className="flex items-center text-base font-normal text-slate-400 mb-2">
              Didn’t get the code?{' '}
              <Button
                className="flex p-1 text-sky-500 font-normal text-base	"
                variant="link"
              >
                Send again
              </Button>
            </CardDescription>

            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="code">Code</Label>
                  <Input id="code" placeholder="" />
                  {codeError && (
                    <p className="text-red-500 text-xs">Incorrect code</p>
                  )}
                </div>
              </div>
              <Button
                className="flex mt-2 font-normal text-base"
                onClick={validateCode}
              >
                <Link to={'/dashboard'}> Submit Code</Link>
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <CardDescription className="text-slate-500 text-base">
              By signing up you agree to terms on
              business.matter.market/invoiceterms
            </CardDescription>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid place-content-center w-screen h-screen  bg-slate-50">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>
            <img
              className="h-7"
              src="../../public/matterLogo.png"
              alt="Matter Logo"
            />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" />
              </div>
            </div>
            <Button
              className="flex mt-2 text-sm font-normal"
              onClick={handleSendCode}
            >
              Send Code
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <CardDescription className="text-sm">
            By signing up you agree to terms on
            business.matter.market/invoiceterms
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
