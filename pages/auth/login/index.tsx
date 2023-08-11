import React,{useState} from 'react'
import { useRouter } from 'next/router';
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import {auth,db} from '../../../backend/firebase';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import AuthLayout from '@/layouts/AuthLayout';
import Head from 'next/head';



const Login = () => {

    const [user, setUser] = useState(typeof window !== "undefined" && JSON.parse(localStorage.getItem('user') || '{}'));
    const googleProvider = new GoogleAuthProvider();

    const router = useRouter();
    const { toast } = useToast();



    const handleGoogleSignIn = () => {
      signInWithPopup(auth, googleProvider)
        .then(async (user) => {
           setDoc(
              doc(db, "users", user?.user.uid),
              {
                name: user?.user.displayName,
                email: user?.user.email,
                photo: user?.user.photoURL,
                uid: user?.user.uid,
              },
              { merge: true }
            ).then(async () => {
              router.replace('/')
                window.localStorage.setItem(
                  "user",
                  JSON.stringify({
                    name: user?.user.displayName,
                    email: user?.user.email,
                    photo: user?.user.photoURL,
                    uid: user?.user.uid,
                  })
                );
              setUser({
                name: user?.user.displayName,
                email: user?.user.email,
                photo: user?.user.photoURL,
                uid: user?.user.uid,
              });
            });
          // setUser(user);
        })
        .catch((error: { message: any; }) => alert(error.message));
    };


    const [values, setValues] = useState({
      email: '',
      password: '',
  });

  const handleChange = (prop: string) => (event: { target: { value: any; }; }) => {
      setValues({ ...values, [prop]: event.target.value });
  };

  const handleLogin = (e: { preventDefault: () => void; } | undefined) => {
      e?.preventDefault()
      if(!values.email || !values.password){
          toast({
              variant: "destructive",
              title: "Error",
              description: "Fill up the missing fields",
          })
      }else if(values.password.length < 6){
          toast({
              variant: "destructive",
              title: "Error",
              description: "Password must be greater that 6 characteres",
          })
      }else{
          signInWithEmailAndPassword(auth, values.email, values.password)
          .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              router.replace('/')
              // ...
          })
          .catch((error) => {
              const errorCode = error.code;
              console.log(errorCode)
              if(errorCode === "auth/wrong-password"){
                  toast({
                      variant: "destructive",
                      title: "Error",
                      description: "Invalid password",
                  })
              }
              else if(errorCode==="auth/user-not-found"){
                  toast({
                      variant: "destructive",
                      title: "Error",
                      description: "This Email is not registered as admin",
                  })
              }
              
          })
      }
  }

  return (
    <>
    <Head>
      <title>Login</title>
    </Head>
    <AuthLayout>
              <h1 className='text-center w-2/5 text-[1.5rem] font-semibold'>Login</h1>
              <span className='text-md text-slate-300'>Welcome back! Enter your details </span>
              <div className="md:w-2/5 w-3/4 flex items-center justify-center">
                  <button onClick={handleGoogleSignIn} className='w-full text-slate-300 p-4 rounded-lg  bg-slate-300/20 transition-all duration-300 hover:shadow-md'> Log in with Google</button>
              </div>
              <p>Or</p>
              <div className="md:w-2/5 w-3/4">
                  <input placeholder='Email' type='email' required onChange={handleChange('email')} className="w-full bg-slate-300/20 p-4 rounded-lg outline-none focus:outline focus:outline-emerald-400"/>
              </div>
              <div className='md:w-2/5 w-3/4'>
                  <input required onChange={handleChange('password')} type='password' placeholder='Password' className="w-full bg-slate-300/20 p-4 rounded-lg outline-none focus:outline focus:outline-emerald-400"/>
                  <span onClick={() => router.push("/auth/reset-password")} className='flex cursor-pointer justify-end mt-2 text-emerald-400'>Forgot Password?</span>
              </div>
              <div className='md:w-2/5 w-3/4'>
                  <button onClick={handleLogin} className='w-full transition-all duration-300 hover:shadow-md bg-emerald-500/80 p-4 rounded-lg text-white'>Login</button>
              </div>
              <div className='md:w-2/5 w-3/4 text-center'>
                  <span>Dont have an account yet?</span>
                  <span onClick={() => router.push("/auth/signup")} className='mt-2 cursor-pointer text-emerald-400'> Sign up</span>                
              </div>
    </AuthLayout>
    </>
  )
}

export default Login