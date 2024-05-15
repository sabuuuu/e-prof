import React, { useState, useEffect } from 'react';

import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import Add from '/assets/add.png'
import AddModal from './AddModal'
import moment from 'moment';

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
    const id = user.user._id

    useEffect(() => {
        setLoading(true);
        if (!user) {
          setError('You must be logged in to view this page');
          setLoading(false);
          return;
        }
        axios
          .get(`http://localhost:5555/profs/dispo/${id}`, {
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
    
    const handleDeleteDisponibility = (disponibilityId) => {
        axios
          .delete(`http://localhost:5555/profs/dispo/${disponibilityId}`, {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          })
          .then(() => {
            enqueueSnackbar('Disponibilité supprimée avec succès', { variant: 'success' });
            setDisp(disp.filter((disponibility) => disponibility._id !== disponibilityId));
            console.log('Disponibility deleted successfully');
          })
          .catch((error) => {
            console.error('Error deleting disponibility:', error);
          });
      };
    return (
        <div className='flex min-h-screen flex-col text-gray-400 bg-gray-900 body-font'>
        <Navbar />
        <div className='flex items-center justify-around px-28 py-6'>
            <div></div>
            <h1 className='sm:text-2xl text-2xl font-bold font-body text-white'>
                Mes disponibilités
            </h1>
            <button onClick={() => setShowModal(true)}>
            <img src={Add} alt=""  className='py-1 text-white font-body font-semibold bg-indigo-500 border-0  px-1 focus:outline-none hover:bg-indigo-600 rounded ' />
            </button>
        </div>
        <div className='rounded-xl mb-8 border border-gray-200 shadow  mx-auto  lg:col-span-8 xl:p-6 p-4 md:w-1/2 md:mt-4 justify-center '>
        {loading ? (
                    <p>Loading...</p>
                  ) : (
                    disp.length > 0 ? (
                        <div className='flex flex-col items-center justify-center'>
                        {disp.map((disponibility) => (
                          <div className='flex items-center justify-center' key={disponibility._id}>
                            <p className='w-full self-center font-bold font-body text-gray-200 ml-8 border rounded mb-2 px-8 py-4 border-gray-400'>{moment(disponibility.jour).format('DD/MM/YYYY')}  :  {disponibility.debut} - {disponibility.fin}</p>
                            <button className='bg-red-800 font-bold font-body text-gray-200 ml-8 border rounded p-2 border-gray-400' onClick={() => handleDeleteDisponibility(disponibility._id)}>Delete</button>
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