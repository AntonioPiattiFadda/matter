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

const usuario = {
  nombre: 'Juan',
  email: 'antonio@gmail.com',
};

const Login = () => {
  const [sendedCode, setSendedCode] = useState(false);
  const [codeError, setCodeError] = useState(false);

  const handleSendCode = () => {
    //NOTE -  - Logica de envio de codigo por mail
    //NOTE - Codificar el codigo para guardarlo en cookies pero que no se pueda leer
    // sendEmail('antonio.piattifadda@gmail.com', '123456');
    //NOTE Si el user no existe con ese email crearlo
    setSendedCode(true);
  };

  const validateCode = () => {
    //NOTE -  - Logica de validacion del codigo
    //NOTE Vamos a guardar el local storage un email para que no se tenga que loguear siempre. Por ahora es de prueba
    const usuarioString = JSON.stringify(usuario);
    sessionStorage.setItem('user', usuarioString);
    setCodeError(false);
  };

  if (sendedCode) {
    return (
      <div className="grid place-content-center w-screen h-screen bg-slate-50">
        <Card className="w-[300px] sm:w-[350px]">
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
                onClick={handleSendCode}
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
      <Card className="w-[300px] sm:w-[350px]">
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
