'use client';
import { useState } from "react";
import { useRouter } from 'next/navigation'

import Button from "@/components/button";
import Input from "@/components/input";
import { X } from 'lucide-react'
import toast from "react-hot-toast";
import { registerUser, loginUser } from '../services/authService';

export default function Home() {
  const [popupCreateAccountVisible, setPopupCreateAccountVisible] = useState<boolean>(false)
  const [popupEnterAccountVisible, setPopupEnterAccountVisible] = useState<boolean>(false)
  const [visibleName, setVisibleName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      try {
          const response = await registerUser({ visibleName, username, password });
          console.log('User registered:', response);
          sessionStorage.setItem('authToken', response.token)
          sessionStorage.setItem('user', JSON.stringify(response.user))
          router.push('/home')
      } catch (error) {
          //console.error('Registration failed:\n', (error as Error).message);
          toast.error('Registration failed:\n'+(error as Error).message)
      }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await loginUser({ username, password });
        console.log('User Logged In:', response);
        sessionStorage.setItem('authToken', response.token)
        sessionStorage.setItem('user', JSON.stringify(response.user))
        router.push('/home')
    } catch (error) {
        console.error('Log In failed:\b', (error as Error).message);
        toast.error('Log In failed:\n'+(error as Error).message)
    }
};

  const handleCreateAccountButton = () => {
    //toast("Hello World")
    setPopupCreateAccountVisible(true)
    //toast("Hello World")

  }

  const handleEnterAccountButton = () => {
    //toast("Hello World")
    setPopupEnterAccountVisible(true)
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-0 bg-zinc-950">
      <div className="z-5 w-full h-full lg:min-h-screen items-center justify-around lg:flex p-1 lg:p-0">
          <img src="/assets/y-logo-white.svg" className="w-[30px] lg:w-[340px] m-5" alt="Y logo"/>
          <div className="justify-left min-w-80 p-3">
            <div className="text-7xl text-bold">
              Happening now
            </div>
            <br />
            <div className="text-3xl text-bold ">
              Join today
            </div>
            <br />
            <Button label="Join with Google" textColor="#000000" bgColor="#ffffff" minWidth="300px"/>
            <Button label="Join with Apple" textColor="#000000" bgColor="#ffffff" minWidth="300px" />
            <div className="mx-5 lg:mx-[145px]">or</div>
            <Button label="Create Account" textColor="#ffffff" bgColor="#4477ff" minWidth="300px" onClick={handleCreateAccountButton}/>
            <div className="text-xs text-zinc-400 m-3 [&>a]:text-cyan-600 [&>a:hover]:underline">
              By joining, you agree to our <a>Terms of Service</a> and <br /><a>Privacy Policy</a>, including our <a>Cookie Policy</a>.
            </div>
            <br />
            <div className="text-l m-3 text-bold ">Already have an account?</div>
            <Button label="Enter" textColor="#4477ff" bgColor="#00000000" borderColor="#ffffff" minWidth="300px" onClick={handleEnterAccountButton}/>
          </div>
      </div>

      <div className="z-10 lg:flex absolute text-xs text-zinc-400 p-4 justify-center inset-x-0 bottom-0 [&>span]:mx-2 [&>span:hover]:underline">
        <span>About</span>
        <span>Download the Y App</span>
        <span>Help Central</span>
        <span>Terms of Service</span>
        <span>Privacy Policy</span>
        <span>Cookie Policy</span>
        <span>Acessibility</span>
        <span>Ad Policy</span>
        <span>Blog</span>
        <span>Carrers</span>
        <span>Trademark</span>
        <span>Advertising</span>
        <span>Marketing</span>
        <span>Y for Companies</span>
        <span>Developers</span>
        <span>Directory</span>
        <span>Settings</span>
        <span className="no-underline">© 2024 Y Corp.</span>
      </div>
      
      {/* Pop Ups here */}
      {popupCreateAccountVisible &&
        <div className='absolute h-full w-full bg-black z-10 bg-blue-600 bg-opacity-25'>
          <div className='absolute flex p-4 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-zinc-950 rounded-xl'>
            <div><button onClick={()=>setPopupCreateAccountVisible(false)}><X size={24}/></button></div>
            <form className='w-[440px]' onSubmit={handleRegister}>
              <div>
                <img src="/assets/y-logo-white.svg" className="w-[30px] mx-auto" alt="Y logo"/>
              </div>
              <div className='text-3xl align-left'>
                Create Your Account
              </div>

              <Input placeholder='Name' value={visibleName} onChange={(e) => setVisibleName(e.target.value)} />
              <Input placeholder='@username' value={username} onChange={(e) => setUsername(e.target.value)}/>
              <Input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              
              <div className="p-3 px-5">
                <Button type="submit" label="Continue" textColor='#000000' bgColor='#ffffff' borderColor='#ffffff' minWidth='300px' scale={1.3} />
              </div>
            </form>
            <div className='w-[50px]'>
            </div>
          </div>
        </div>
      }

      {popupEnterAccountVisible &&
        <div className='absolute h-full w-full bg-black z-10 bg-blue-600 bg-opacity-25'>
          <div className='absolute flex p-4 text-center transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 bg-zinc-950 rounded-xl'>
            <div><button onClick={()=>setPopupEnterAccountVisible(false)}><X size={24}/></button></div>
            <form className='w-[440px]' onSubmit={handleLogin}>
              <div>
                <img src="/assets/y-logo-white.svg" className="w-[30px] mx-auto" alt="Y logo"/>
              </div>
              <div className='text-3xl align-left'>
                Log In
              </div>
              <div>
                <Input placeholder='@username'  value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
              <div>
                <Input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div>
                <Button type="submit" label="Continue" textColor='#000000' bgColor='#ffffff' borderColor='#ffffff' minWidth='300px' scale={1.3} />
              </div>
            </form>
            <div className='w-[50px]'>

            </div>
          </div>
        </div>
      }

    </main>
  );
}
