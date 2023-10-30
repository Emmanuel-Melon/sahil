import Image from "next/image";
import React from "react";
import logo from "../../../public/logo.png";
import Link from "next/link";
import {
  HiOutlineBriefcase,
  HiOutlineQueueList,
  HiOutlineTruck,
  HiOutlineBuildingOffice,
} from "react-icons/hi2";

const links = [
  {
    name: "Businesses",
    href: "/businesses",
    icon: <HiOutlineBriefcase />,
  },
  {
    name: "Couriers",
    href: "/couriers",
    icon: <HiOutlineTruck />,
  },
  {
    name: "Orders",
    href: "/orders",
    icon: <HiOutlineQueueList />,
  },
  {
    name: "Suppliers",
    href: "/suppliers",
    icon: <HiOutlineBuildingOffice />,
  },
];

const Navbar = () => {
  return (
    <header className='navbar bg-white shadow'>
      <div className='navbar-start'>
        <Link href='/' className='font-semibold flex items-center text-base lg:text-lg'>
          <Image
            src={logo}
            alt='Sahil'
            loading='eager'
            className='h-10 w-8 object-contain md:w-16'
          />
          Sahil Agent
        </Link>
      </div>
      <nav className="navbar-end">
        <ul className="menu menu-horizontal px-1 hidden lg:flex lg:items-center lg:gap-4">
          {links.map(({ name, href, icon }) => {
            return (
              <li key={name}>
                <Link href={href} className='text-base font-semibold transition-[0.4s] hover:text-green-dark'>{name}</Link>
              </li>
            );
          })}
        </ul>
        <div className="dropdown dropdown-end">
          <label tabIndex={1} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://avatars.githubusercontent.com/u/91534137?v=4"
                alt="hello"
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path 
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            {links.map(({ name, href }) => {
              return (
                <li key={name}>
                  <Link href={href} className='text-base font-semibold'>{name}</Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
