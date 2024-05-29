import { Fragment ,useContext} from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import axios from 'axios';
import  useAuthContext  from '../hooks/useAuthContext';

import { useLogout } from '../hooks/useLogout'

import Pfp from '/assets/pfp.jpg';
import Logo from "/assets/logo.png";
import { ThemeContext } from '../context/ThemeContext';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar() {
    const { user } = useAuthContext();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const {logout} = useLogout();
    const handleClick = () => {
        logout();
    }
  return (
    <Disclosure as="nav" className={`navbar ${theme === 'dark' ? 'bg-gray-800' : 'bg-blue-800'}`}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 py-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <button className="flex flex-shrink-0 items-center text-white font-body font-bold">
                  <Link className='flex items-center space-x-2' to="/">
                  <img src={Logo} className="h-14" />
                  </Link>
                </button>
                <div className={`flex justify-center items-center h-12 w-12 border-none  rounded ${theme === 'dark' ? 'bg-gray-800 ' : 'bg-blue-800'}`}>
                  <button onClick={toggleTheme}
                    className={`h-12 w-12 rounded p-2 ${theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-blue-700'}`}>
                    <svg className={`fill-violet-950 ${theme === 'dark' ? 'hidden' : 'block'}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                    </svg>
                    <svg className={`fill-yellow-500  ${theme === 'dark' ? 'block' : 'hidden'}`}fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>
              <Link to="/ajouter-disp"
                className={`hidden sm:ml-6 sm:block text-center   rounded-md px-5 py-2  font-medium font-body ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-200 bg-gray-900 hover:text-gray-100' : 'bg-blue-900 hover:bg-blue-700 text-white'}`}>
                  Disponibilités
              </Link>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full"
                        //standad profile pic
                        src={Pfp}
                        alt=""
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={handleClick}
                            className={classNames(active ? 'bg-gray-100 font-body' : '', 'font-body block px-4 py-2 text-sm text-gray-700')}
                          >
                            Déconnexion
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
                <Disclosure.Button
                  className={`block rounded-md px-5 py-2 text-base font-medium font-body ${theme === 'dark' ? 'hover:bg-gray-700 text-gray-200 bg-gray-900 hover:text-gray-100' : 'bg-blue-900 hover:bg-blue-700 text-white'}`}
                >
                  <Link to="/ajouter-disp" className=''>
                  Disponibilités
                  </Link>
                </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
