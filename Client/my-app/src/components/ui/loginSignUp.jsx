"use client";
import { z } from 'zod';
import React, {useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Label } from "./label"
import { Button } from "./button"
import { Input } from "./input"
import { UsersAuth } from '../../context/AuthContext.js';
import { FcGoogle } from "react-icons/fc";
import { FaTwitter } from "react-icons/fa";
import Hamburger from './hamburgerMenu.jsx';
export default function LoginSignUp() {
  const { user,signInWithTwitter, googleSignIn, logOut } = UsersAuth();
  const [hamburgerState, sethamburgerState] = useState(true);
  const handleSignInGoogle = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  }
  const handleSignInTwitter = async () => {
    try {
      await signInWithTwitter();
    } catch (error) {
      console.log(error);
    }
  }
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  }
  const loginSchema = z.object({
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).max(50),
    password: z.string().regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least 8 characters, including letters, numbers, and special characters"
    ).max(20),
  });
  const registerSchema = z.object({
    employeeId: z.string().max(50).min(1),
    name: z.string().max(50).min(1),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/).max(50),
    password: z.string().regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Password must contain at least 8 characters, including letters, numbers, and special characters"
    ).max(20),
    confirmPassword: z.string().max(20),
  }).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
  const [RegisterformData, setRegisterFormData] = useState({
    employeeId: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [LoginformData, setLoginFormData] = useState({
    email: '',
    password: ''
  });
  const [Loginerrors, setLoginErrors] = useState({
    email: 0,
    password: 0
  });
  const [Registererrors, setRegisterErrors] = useState({
    employeeId: 0,
    name: 0,
    email: 0,
    password: 0,
    confirmPassword: 0,
  });
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...LoginformData, [name]: value };
    setLoginFormData(updatedFormData);
    let result = loginSchema.safeParse(updatedFormData);
    let newError = { email: 0, password: 0 };
    if (!result.success) {
      result.error.errors.forEach(err => {
        if (err.path.includes("email")) newError.email = 1;
        if (err.path.includes("password")) newError.password = 1;
      });
    }
    setLoginErrors(newError);
  };
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...RegisterformData, [name]: value };
    setRegisterFormData(updatedFormData);
    console.log(updatedFormData);
    let result = registerSchema.safeParse(updatedFormData);
    console.log(result);
    let newError = {
      employeeId: 0,
      name: 0,
      email: 0,
      password: 0,
      confirmPassword: 0,
    };
    if (!result.success) {
      result.error.errors.forEach(err => {
        if (err.path.includes("employeeId")) newError.employeeId = 1;
        if (err.path.includes("name")) newError.name = 1;
        if (err.path.includes("email")) newError.email = 1;
        if (err.path.includes("password")) newError.password = 1;
        if (err.path.includes("confirmPassword")) newError.confirmPassword = 1;
      });
    }
    setRegisterErrors(newError);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let result = loginSchema.safeParse(LoginformData);
    console.log(result);
    if (result.success) {
      console.log("form submitted");
    } else {
      let newError = { email: 0, password: 0 };
      result.error.errors.forEach(err => {
        if (err.path.includes("email")) newError.email = 1;
        if (err.path.includes("password")) newError.password = 1;
      });
      setLoginErrors(newError);
    }
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    let result = registerSchema.safeParse(RegisterformData);
    console.log(result);
    if (result.success) {
      console.log("form submitted");
    } else {
      let newError = {
        employeeId: 0,
        name: 0,
        email: 0,
        password: 0,
        confirmPassword: 0,
      };
      result.error.errors.forEach(err => {
        if (err.path.includes("employeeId")) newError.employeeId = 1;
        if (err.path.includes("name")) newError.name = 1;
        if (err.path.includes("email")) newError.email = 1;
        if (err.path.includes("password")) newError.password = 1;
        if (err.path.includes("confirmPassword")) newError.confirmPassword = 1;
      });
      setRegisterErrors(newError);
    }
  };
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const handleSwitchToRegister = () => {
    setLoginOpen(false);
    setRegisterOpen(true);
  };

  const handleHamburger=()=>{
    sethamburgerState(!hamburgerState);
  }
  return (
    <><div
    className={`fixed z-2 top-0 right-0 w-80 h-screen bg-gray-900 transition-transform duration-500
      ${hamburgerState ? "translate-x-full" : "translate-x-0"}
      md:translate-x-0 md:static md:flex md:h-30 md:justify-center md:items-center md:bg-gray-700 md:w-full`}
  >
        <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setLoginOpen(true)}>Login</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className='text-center text-2xl'>Login</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-3">
              <div className="grid grid-cols-4 items-center gap-4 mb-3">
                <Label htmlFor="registerEmail" className="text-right">
                  Email
                </Label>
                <Input id="registerEmail" name="email" type="email" className="col-span-3" placeholder='JohnDoe@gmail.com' onChange={handleLoginChange} required="" />
              </div>
              {Loginerrors.email ? <p className="text-red-500 text-xs">Enter valid email.</p> : <></>}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registerPassword" className="text-right">
                  Password
                </Label>
                <Input id='registerPassword' name="password" type="password" className="col-span-3" placeholder='••••••••' onChange={handleLoginChange} required="" />
              </div>
              {Loginerrors.password ? <p className="text-red-500 text-xs">Password must contain at least 8 characters, including letters, numbers, and special characters</p> : <></>}
            </div>
            <DialogDescription></DialogDescription>
            <DialogFooter>
              <Button className="cursor-pointer bg-gray-50 hover:bg-gray-200" type="submit" onClick={handleLoginSubmit}>Submit</Button>
            </DialogFooter>
            <div className='m-auto h-0.5 w-5/6 bg-gray-500'></div>
            <Button className='cursor-pointer bg-gray-200' onClick={handleSignInGoogle}>SignIn with Google <FcGoogle size={24} /></Button>
            <Button className='cursor-pointer bg-gray-200' onClick={handleSignInTwitter}>SignIn with Twitter <FaTwitter size={24} /></Button>
            <p className="text-sm text-center font-light text-gray-500 dark:text-gray-400">
              Don&apos;t have an account yet? &nbsp;
              <span
                className="font-medium text-[#2563eb] hover:underline dark:text-[#60a5fa] cursor-pointer"
                onClick={handleSwitchToRegister}
              >
                Register
              </span>
            </p>
          </DialogContent>
        </Dialog>
        {/* Register Dialog */}
        <Dialog open={registerOpen} onOpenChange={setRegisterOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setRegisterOpen(true)}>Register</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className='text-center'>Register</DialogTitle>
            </DialogHeader>
            <DialogDescription></DialogDescription>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registerEmployeeId" className="text-right">
                  Employee Id
                </Label>
                <Input id="registerEmployeeId" name="employeeId" type="text" className="col-span-3" onChange={handleRegisterChange} required="" />
              </div>
              {Registererrors.employeeId ? <p className="text-red-500 w-auto text-xs">Enter valid Employee Id.</p> : <></>}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registerName" className="text-right">
                  Name
                </Label>
                <Input id="registerName" name="name" type="text" className="col-span-3" onChange={handleRegisterChange} required="" />
              </div>
              {Registererrors.name ? <p className="text-red-500 text-xs">Enter valid Name.</p> : <></>}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registerEmail" className="text-right">
                  Email
                </Label>
                <Input id="registerEmail" name="email" type="email" className="col-span-3" placeholder='JohnDoe@gmail.com' onChange={handleRegisterChange} required="" />
              </div>
              {Registererrors.email ? <p className="text-red-500 text-xs">Enter valid email.</p> : <></>}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registerPassword" className="text-right">
                  Password
                </Label>
                <Input id='registerPassword' name="password" type="password" className="col-span-3" placeholder='••••••••' onChange={handleRegisterChange} required="" />
              </div>
              {Registererrors.password ? <p className="text-red-500 text-xs">Password must contain at least 8 characters, including letters, numbers, and special characters</p> : <></>}
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="registerConfirmPassword" className="text-left">
                  Confirm Password
                </Label>
                <Input id="registerConfirmPassword" name="confirmPassword" type="password" className="col-span-3" placeholder='••••••••' onChange={handleRegisterChange} required="" />
              </div>
              {Registererrors.confirmPassword ? <p className="text-red-500 text-xs">Passwords Don&apos;t match </p> : <></>}
            </div>
            <DialogFooter>
              <Button className="cursor-pointer bg-gray-50 hover:bg-gray-200" type="submit" onClick={handleRegisterSubmit}>Submit</Button>
            </DialogFooter>
            <div className='m-auto h-0.5 w-5/6 bg-gray-500'></div>
            <Button className='cursor-pointer bg-gray-200' onClick={handleSignInGoogle}>SignIn with Google <FcGoogle size={24} /></Button>
            <Button className='cursor-pointer bg-gray-200' onClick={handleSignInTwitter}>SignIn with Twitter <FaTwitter size={24} /></Button>
          </DialogContent>
        </Dialog>
      </div>
      <Hamburger handleHamburger={handleHamburger} hamburgerState={hamburgerState} />
      </>
  );
}
