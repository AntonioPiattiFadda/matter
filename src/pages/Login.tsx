import { useEffect, useState } from 'react';
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
import { useSearchParams } from 'react-router-dom';
import classNames from 'classnames';
import { z } from 'zod';
import {
  getAuth,
  isSignInWithEmailLink,
  signInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { createUser } from '@/Services';
import MatterLogoImg from '../assets/matterLogo.png';

import { GoogleAuthProvider } from 'firebase/auth';

const PROD_LINK = import.meta.env.VITE_PROD_LINK;
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const actionCodeSettings = {
  // URL you want to redirect back to. The domain (www.example.com) for this
  // URL must be in the authorized domains list in the Firebase Console.
  url: `${PROD_LINK}/login?code=true`,
  // This must be true.
  handleCodeInApp: true,
};

const Login = () => {
  const [sendedCode, setSendedCode] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<z.ZodError | null>(null);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  useEffect(() => {
    if (code) {
      setSendedCode(true);
      validateSingInWithEmailLink();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code]);

  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    login_hint: 'user@example.com',
  });

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSendCode = () => {
    try {
      loginWithEmailSchema.parse({ email });
      setLoading(true);

      sendSignInLinkToEmail(auth, email, actionCodeSettings)
        .then(() => {
          window.localStorage.setItem('emailForSignIn', email);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    } catch (error) {
      if (error instanceof z.ZodError) {
        console.log(error);

        setErrors(error);
        setTimeout(() => {
          setErrors(null);
          setLoading(false);
        }, 3000);
      }
    }
  };

  const handleSkipLogin = () => {
    setLoading(true);
    const user = {
      email: 'admin@gmail.com',
      password: ADMIN_PASSWORD,
    };
    signInWithEmailAndPassword(auth, user.email, user.password).then(
      (result) => {
        const userInfo = result.user;
        const user = {
          email: userInfo.email,
          id: userInfo.uid,
        };
        window.sessionStorage.setItem('user', JSON.stringify(user));
        if (user.email) {
          createUser({ email: user.email }, user.id).then(() => {
            setLoading(false);
            window.location.href = '/dashboard';
          });
        }
      }
    );
  };

  const validateSingInWithEmailLink = () => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        email =
          window.prompt('Please provide your email for confirmation') ?? '';
      }
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          window.localStorage.removeItem('emailForSignIn');
          const user = {
            email,
            id: result.user.uid,
          };
          window.sessionStorage.setItem('user', JSON.stringify(user));

          createUser({ email: user.email }, user.id).then(() => {
            window.location.href = '/dashboard';
          });
        })
        .catch((error) => {
          setCodeError(true);
          console.log(error);
        });
    }
  };

  // const loginWithGoogle = () => {
  //   setLoading(true);
  //   signInWithPopup(auth, provider)
  //     .then((result) => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential?.accessToken;
  //       // The signed-in user info.
  //       const userInfo = result.user;
  //       // IdP data available using getAdditionalUserInfo(result)
  //       const user = {
  //         email: userInfo.email,
  //         id: userInfo.uid,
  //         token,
  //       };
  //       window.sessionStorage.setItem('user', JSON.stringify(user));
  //       if (user.email) {
  //         createUser({ email: user.email }, user.id).then(() => {
  //           window.location.href = '/dashboard';
  //           setLoading(false);
  //         });
  //       }

  //       // ...
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       // const errorCode = error.code;
  //       // const errorMessage = error.message;
  //       // // The email of the user's account used.
  //       // const email = error.customData.email;
  //       // // The AuthCredential type that was used.
  //       // const credential = GoogleAuthProvider.credentialFromError(error);
  //       console.error(error);
  //       setLoading(false);

  //       // ...
  //     });
  // };

  if (sendedCode) {
    return (
      <div className="grid place-content-center w-screen h-screen bg-slate-50">
        <Card className="w-[300px] sm:w-[350px]">
          <CardHeader>
            <CardTitle>
              {' '}
              <img className="h-7" src={MatterLogoImg} alt="Matter Logo" />
            </CardTitle>
          </CardHeader>
          <CardDescription className="text-sm m-2 ml-6">
            We are validating your email...
          </CardDescription>
          {codeError && (
            <Button
              className="flex p-1 text-sky-500 font-normal text-base m-4 ml-5 mb-5"
              variant="link"
              onClick={handleSendCode}
              disabled={loading}
            >
              Send email again
            </Button>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="grid place-content-center w-screen h-screen  bg-slate-50">
      <Card className="w-[300px] sm:w-[350px]">
        <CardHeader>
          <CardTitle>
            <img className="h-7" src={MatterLogoImg} alt="Matter Logo" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            {loading ? (
              <CardDescription className="text-sm mt-2  text-slate-500">
                We've emailed you a sign on link or wait for google to redirect
              </CardDescription>
            ) : (
              <>
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
                <div className="flex gap-2">
                  <Button
                    disabled={loading}
                    className="flex mt-2 text-sm font-normal"
                    type="button"
                    onClick={handleSendCode}
                  >
                    Send Code
                  </Button>
                  {/* <Button
                    disabled={loading}
                    className="flex mt-2 text-sm font-normal"
                    type="button"
                    variant={'secondary'}
                    onClick={loginWithGoogle}
                  >
                    Login with Google
                  </Button> */}
                </div>
              </>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex flex-col justify-between">
          <CardDescription className="text-sm  text-slate-500">
            By continuing you agree to the terms found on
            matterinvoice.com/terms
          </CardDescription>
        </CardFooter>
      </Card>
      <Card className="w-[300px] sm:w-[350px]">
        <CardContent>
          <Button
            disabled={loading}
            className="flex mt-4 text-sm font-normal self-start"
            type="button"
            onClick={handleSkipLogin}
          >
            Go to Dashboard
          </Button>
          <CardDescription className="text-sm  text-slate-500 mt-4">
            (You can skip login for now and explore the app)
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
