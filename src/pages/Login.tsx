import { useState } from 'react';
import { getUserByEmail } from '@/Services';
import { loginWithEmailSchema } from '@/Validator';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { z } from 'zod';

const Login = () => {
  const [sendedCode, setSendedCode] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [email, setEmail] = useState('');
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<z.ZodError | null>(null);

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendCode = () => {
    setLoading(true);
    try {
      loginWithEmailSchema.parse({ email });
      getUserByEmail(email).then((user) => {
        //NOTE - Enviar el codigo por mail
        setSendedCode(true);
        setLoading(false);

        if (!user) {
          //FIXME - Crear el usuario y enviar el mail
          return;
        }
        setUser(user);
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(error);
        setTimeout(() => {
          setErrors(null);
          setLoading(false);
        }, 3000);
      }
    }
  };

  const validateCode = () => {
    //NOTE -  - Logica de validacion del codigo
    //NOTE Vamos a guardar el local storage un email para que no se tenga que loguear siempre. Por ahora es de prueba
    const usuarioString = JSON.stringify(user);
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
                disabled={loading}
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
                disabled={loading}
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
                <Input
                  className={classNames('', {
                    'border-red-500':
                      errors &&
                      errors.issues.some((issue) => {
                        return issue.path[0] === 'email';
                      }),
                  })}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  onChange={handleChangeEmail}
                />
              </div>
            </div>
            <Button
              disabled={loading}
              className="flex mt-2 text-sm font-normal"
              type="button"
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
