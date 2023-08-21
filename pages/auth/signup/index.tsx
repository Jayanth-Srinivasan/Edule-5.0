import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"
import {auth,db} from '../../../backend/firebase';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAdditionalUserInfo, signInWithPopup, updateProfile} from 'firebase/auth';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
import AuthLayout from '@/layouts/AuthLayout';
import Head from 'next/head';

const SignUp = () => {

    const [values, setValues] = useState({
        email: '',
        password: '',
        name:'',
        username: '',
    });
    const [getUsername,setGetUsername] = useState(false);
    const [usernameList,setUsernameList] = useState<any[]>([]);
    const [user, setUser] = useState(typeof window !== "undefined" &&  JSON.parse(localStorage.getItem('user') || '{}'));
    const googleProvider = new GoogleAuthProvider();

    const router = useRouter();
    const { toast } = useToast();


    const handleChange = (prop: string) => (event: { target: { value: any; }; }) => {
        setValues({ ...values, [prop]: event.target.value });
    };
    
    const handleGoogleSignUp = (e: { preventDefault: () => void; } | undefined) => {
      e?.preventDefault();
      if(!values.username){
        toast({
            variant: "destructive",
            title: "Error",
            description: "Please Enter the Username",
        })
    }else
    {
        if(usernameList.includes(values.username)){
          toast({
            variant: "destructive",
            title: "Error",
            description: "Username aldready exists"
        })
      }else
      {

      
        signInWithPopup(auth, googleProvider)
          .then(async (user) => {
              const isFirstLogin = getAdditionalUserInfo(user)?.isNewUser
              if (isFirstLogin){
                setDoc(
                   doc(db, "users", values.username),
                   {
                     name: user?.user.displayName,
                     email: user?.user.email,
                     photo: user?.user.photoURL,
                     uid: user?.user.uid,
                     username : values.username,
                   },
                   { merge: true }
              ).then(async () => {
                router.replace('/');
                  window.localStorage.setItem(
                    "user",
                    JSON.stringify({
                      name: user?.user.displayName,
                      email: user?.user.email,
                      photo: user?.user.photoURL,
                      uid: user?.user.uid,
                      username: values.username,
                    })
                  );
                setUser({
                  name: user?.user.displayName,
                  email: user?.user.email,
                  photo: user?.user.photoURL,
                  uid: user?.user.uid,
                  username: values.username,
                });
              });
            // setUser(user);
              }else {
                toast({
                  variant: "destructive",
                  title: "Error",
                  description: "User Already exists!",
              })
            }
          })
          .catch((error) => alert(error.message));
      };
    }
    }

    const handleEmailSignIn = async (e: { preventDefault: () => void; } | undefined) => {
        e?.preventDefault()
        if(!values.email || !values.name || !values.password || !values.username){
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
            createUserWithEmailAndPassword(auth, values.email, values.password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                updateProfile(user, {
                    displayName: values.name,
                    photoURL: "https://github.com/shadcn.png"
                }).then(() => {
                    setDoc(doc(db, "users", values.username), {
                        name: user.displayName,
                        email: user.email,
                        uid: user.uid,
                        photo: user.photoURL,
                        username: values.username,
                    }).then( async () =>{
                        router.replace('/')
                  window.localStorage.setItem(
                    "user",
                    JSON.stringify({
                        name: user.displayName,
                        email: user.email,
                        uid: user.uid,
                        photo: user.photoURL,
                        username: values.username,
                    })
                  );
                setUser({
                    name: user.displayName,
                    email: user.email,
                    uid: user.uid,
                    photo: user.photoURL,
                    username: values.username,
                });
                    })
                    // router.replace('/')
                }).catch((error: { code: any; message: any; }) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                });
                // ...
            })
            .catch((error: { code: any; message: any; }) => {
              const errorCode = error.code;
              console.log(errorCode)
              if(errorCode === "auth/email-already-in-use"){
                  toast({
                      variant: "destructive",
                      title: "Error",
                      description: "User Email Already exists",
                  })
              }
              else if(errorCode==="auth/user-not-found"){
                  toast({
                      variant: "destructive",
                      title: "Error",
                      description: "This Email is not registered as admin",
                  })
              }
              else {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode,errorMessage);
              }
            });
        }
    }
    useEffect(() => {
      const checkUsername = async() => {
        const collectionRef = collection(db,"users");
        const q = await getDocs(collectionRef);
        const arr = q.docs.map((doc) => doc.id);
        console.log(arr)
        setUsernameList(arr)
      }
      checkUsername();
      
    }, [router.isReady])
    
  return (
    <>
    <Head>
      <title>Sign Up</title>
    </Head>
    <AuthLayout>
      {
        !getUsername?
          <>
            <h1 className='text-center w-2/5 text-[1.5rem] font-semibold'>Sign Up</h1>
              <span className='text-md text-slate-300'>Create your Account Now! </span>
              <div className="md:w-2/5 w-3/4 flex items-center justify-center ">
                  <button onClick={() => setGetUsername(true)} className='w-full text-slate-300 p-4 rounded-lg bg-slate-300/20 transition-all duration-300 hover:shadow-md'> Sign Up with Google</button>
              </div>
              <p>Or</p>
              <div className="md:w-2/5 w-3/4">
                  <input value={values.username} type="text" required onChange={handleChange('username')} placeholder='@Username' className="w-full bg-slate-300/20 p-4 rounded-lg outline-none focus:outline focus:outline-emerald-400"/>
              </div>
              <div className="md:w-2/5 w-3/4">
                  <input value={values.name} type="text" required onChange={handleChange('name')} placeholder='Name' className="w-full bg-slate-300/20 p-4 rounded-lg outline-none focus:outline focus:outline-emerald-400"/>
              </div>
              <div className="md:w-2/5 w-3/4">
                  <input value={values.email} type='email' required onChange={handleChange('email')} placeholder='Email' className="w-full bg-slate-300/20 p-4 rounded-lg outline-none focus:outline focus:outline-emerald-400"/>
              </div>
              <div className='md:w-2/5 w-3/4'>
                  <input value={values.password} required onChange={handleChange('password')} type='password' placeholder='Password' className="w-full bg-slate-300/20 p-4 rounded-lg outline-none focus:outline focus:outline-emerald-400"/>
              </div>
              <div className='md:w-2/5 w-3/4'>
                  <button onClick={handleEmailSignIn} className='w-full transition-all duration-300 hover:shadow-md bg-emerald-500/80 p-4 rounded-lg text-white'>Sign Up</button>
              </div>
              
            <div className='md:w-2/5 w-3/4 text-center'>
                <span>Already have an account?</span>
                <span onClick={() => router.push("/auth/login")} className='mt-2 cursor-pointer text-emerald-400'> Login</span>                
            </div>
            </>
      :
      <>
            <h1 className='text-center w-2/5 text-[1.5rem] font-semibold'>Username</h1>
              <span className='text-md text-slate-300'>Pick Your Username ! </span>
              <div className="md:w-2/5 w-3/4">
                  <input value={values.username} type="text" required onChange={handleChange('username')} placeholder='@Username' className="w-full bg-slate-300/20 p-4 rounded-lg outline-none focus:outline focus:outline-emerald-400"/>
              </div>
              <div className='md:w-2/5 w-3/4'>
                  <button onClick={handleGoogleSignUp} className='w-full transition-all duration-300 hover:shadow-md bg-emerald-500/80 p-4 rounded-lg text-white'>Sign Up</button>
              </div>
            </>
}
    </AuthLayout>
    </>
  )
}

export default SignUp