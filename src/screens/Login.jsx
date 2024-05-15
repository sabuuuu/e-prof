import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin'
import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import Logo from '/assets/logo.png'
import E from '/assets/e.png'

function Login() {
  const [matricule, setMatricule] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const {login, error, isLoading} = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(matricule, birthdate);
  }


  return (
    <section className="h-full md:h-full flex flex-col lg:flex-row lg:h-screen text-gray-400 lg:bg-[url('/assets/bg.jpg')] bg-[url('/assets/6.jpg')] bg-cover body-font">
      {/* First div */}
      <div className="flex justify-center items-center lg:w-1/2 m-8">
        <div className="text-center">
          <img src={Logo} alt="" className="w-64 mx-auto" />
          <h1 className="mt-6 mb-4 text-4xl text-grey-400 font-body font-bold">
            Bienvenue sur votre site de planning d’examens
          </h1>
          <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            <a href='https://www.facebook.com/search/top?q=dou%20bejaia%20%D9%85%D8%AF%D9%8A%D8%B1%D9%8A%D8%A9%20%D8%A7%D9%84%D8%AE%D8%AF%D9%85%D8%A7%D8%AA%20%D8%A7%D9%84%D8%AC%D8%A7%D9%85%D8%B9%D9%8A%D8%A9%20%D8%A8%D8%AC%D8%A7%D9%8A%D8%A9' target='_blank' class="text-gray-400">
              <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a href="https://www.instagram.com/university.bejaia/"  target="_blank" class="ml-3 text-gray-400">
              <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a href="https://elearning.univ-bejaia.dz/" target="_blank" class="ml-3 text-white">
              <img src={E} alt="" className="w-6 h-6" />
            </a>
          </span>
        </div>
      </div>
      {/* Second div */}
      <div className="p-10  mt-10 mb-10 xl:p-12 lg:w-2/6 md:p-8 justify-center bg-black border border-black rounded-lg bg-opacity-30 border-opacity-90">
            <a href="/" title="Home Page" class="flex items-center justify-center text-white text-2xl font-bold font-body">
              LOG IN
            </a>
            <h1 class="mt-6 mb-4 text-xl text-center text-grey-400 font-body title-font mb-5 opacity-96">Connectez-vous a votre compte</h1>

            <form className='pb-1 space-y-4 justify-center items-center mt-6 ' onSubmit={handleSubmit}>
              <div className='block'>
                <label className='block mb-1 text-sm font-body text-gray-400'>Matricule : </label>
                <input className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type='text' value={matricule} onChange={e => setMatricule(e.target.value)} />
              </div>

              <div className='block'>
                <label className='block mb-1 text-sm font-body text-gray-400'>Date de naissance : </label>
                <input  className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out' type='password' value={birthdate} onChange={e => setBirthdate(e.target.value)} />
              </div>
              <div class="flex items-center">
                <button className='w-full py-2 mt-3 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg' type='submit' >Connexion</button>
              </div>
              

              {error && <div className='text-sm mt-3 text-red-700  text-center font-body'>{error}</div>}
            </form>
      </div>
    </section>
  )
}

export default Login