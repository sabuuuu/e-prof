import React, { useState, useEffect,useContext } from 'react';

import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import Add from '/assets/add.png'
import AddModal from './AddModal'
import moment from 'moment';
import { ThemeContext } from '../context/ThemeContext';

import { useSnackbar } from 'notistack';
import axios from 'axios';
import useAuthContext  from '../hooks/useAuthContext';
function AjouterDisp() {
    const [showModal, setShowModal] = useState(false);
    const [disp , setDisp] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { user } = useAuthContext();
    const { theme } = useContext(ThemeContext);

    const id = user.user._id;
    useEffect(() => {
        setLoading(true);
        if (!user) {
          setError('You must be logged in to view this page');
          setLoading(false);
          return;
        }
        axios
          .get(`https://eplan-backend.onrender.com/profs/dispo/${id}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
          .then((response) => {
            setDisp(response.data.disponibilities);
            setLoading(false);
            console.log(response.data.disponibilities);
          })
          .catch((error) => {
            console.error(error);
            setLoading(false);
          });
    }, []);
    
    const handleDelete = async (idDisp) => {
      console.log(idDisp)
      try {
        await axios.delete(`https://eplan-backend.onrender.com/profs/prof/${user.user._id}/dispo/${idDisp}` , {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        }); 
        const updatedDispos = disp.filter((disp) => disp._id !== idDisp);
        setDisp(updatedDispos);
        enqueueSnackbar('Disponibilité supprimée avec succès', { variant: 'success' });
      } catch (error) {
        console.error('Error deleting disponibility:', error);
        enqueueSnackbar('Une erreur est survenue', { variant: 'error' });
      }
    };
    return (
      <div className={`font-body flex flex-col min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-gray-200' : 'bg-gray-200 text-gray-800'}`}>
        <Navbar />
        <div className='flex items-center justify-around px-28 py-6'>
            <div></div>
            <h1 className='sm:text-2xl text-2xl font-bold font-body'>
                Mes disponibilités 🎯 :
            </h1>
            <button onClick={() => setShowModal(true)}>
            <img src={Add} alt=""  className={`py-1 font-body font-semibold  border-0  px-1 focus:outline-none rounded-lg ${theme === 'dark' ? 'hover:bg-indigo-800' : 'bg-blue-800 hover:bg-blue-700'}`}/>
            </button>
        </div>
        <div className={`rounded-xl mb-8 border  shadow  mx-auto  lg:col-span-8 xl:p-6 p-4 md:w-1/2 md:mt-4 justify-center ${theme === 'dark' ? 'border-gray-200' : 'border-gray-700'}`}>
        {loading ? (
                    <p>Loading...</p>
                  ) : (
                    disp.length > 0 ? (
                        <div className='flex flex-col items-center justify-center'>
                        {disp.map((disponibility) => (
                          <div className={`flex items-center justify-center ml-8 border rounded px-8 py-2 border-opacity-45 mb-2 ${theme === 'dark' ? 'border-gray-400' : 'border-gray-700 font-medium'}`} key={disponibility._id}>
                            <p className='w-full self-center font-body  '>📍 {moment(disponibility.jour).format('DD/MM/YYYY')}  :  {disponibility.debut} - {disponibility.fin}</p>
                            <button className='bg-red-800 text-sm font-body text-gray-200 ml-8 border border-opacity-45 rounded px-6 py-1 border-gray-400' onClick={() => handleDelete(disponibility._id)}>supprimer</button>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <h1 className='text-md font-bold font-body text-gray-500 ml-8 border rounded p-2 border-gray-400'>Pas encore de disponibilité</h1>
                    )
                  )}

                {error && <p>{error}</p>}
        </div>
        <Footer />
        {showModal && (
              <AddModal onClose={() => setShowModal(false)} />
            )}
        </div>
    )
}

export default AjouterDisp