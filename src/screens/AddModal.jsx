import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { useSnackbar } from 'notistack';
import axios from 'axios';
import useAuthContext  from '../hooks/useAuthContext';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const heurs = [
  { value: '8:00', label: '8:00' },
  {value :'8:30',label:'8:30'},
  { value: '9:00', label: '9:00' },
  { value: '9:30', label: '9:30' },
  { value: '10:00', label: '10:00' },
  { value: '10:30', label: '10:30' },
  { value: '11:00', label: '11:00' },
  { value: '11:30', label: '11:30' },
  { value: '12:00', label: '12:00' },
  { value: '12:30', label: '12:30' },
  { value: '13:00', label: '13:00' },
  { value: '13:30', label: '13:30' },
  { value: '14:00', label: '14:00' },
  { value: '14:30', label: '14:30' },
  { value: '15:00', label: '15:00' },
  { value: '15:30', label: '15:30' },
  { value: '16:00', label: '16:00' },
  { value: '16:30', label: '16:30' },
]

const AddModal = ({onClose }) => {
  const [date, setDate] = useState({ jour: '', debut: '', fin: '' });
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const id = user.user._id
  const handleDayChange = (selectedDay) => {
    setDate({ ...date, jour: selectedDay });
    console.log(date)
  };
  
  const handleStartTimeChange = (selectedStartTime) => {
    setDate({ ...date, debut: selectedStartTime });
  };
  
  const handleEndTimeChange = (selectedEndTime) => {
    setDate({ ...date, fin: selectedEndTime });
  };
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: '#374151',
      borderRadius: '4px',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#334155' : '#374151',
      color: state.isSelected ? '#e5e7eb' : '#f3f4f6',
      '&:hover': {
        backgroundColor: state.isSelected ? '#334155' : '#6b7280',
        color: state.isSelected ? '#e5e7eb' : '#e5e7eb',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#e5e7eb',  
    }),
  };

  const handleAddDisp = () => {
    axios
      .put(`http://localhost:5555/profs/dispo/${id}`, { dispo: date }, {
        headers: {
          'Authorization': `Bearer ${user.token}`
        }
      })
      .then(() => {
        enqueueSnackbar('Disponibilité ajoutée avec succès', { variant: 'success' });
        onClose();
      })
      .catch((error) => {
        enqueueSnackbar('Une erreur est survenue', { variant: 'error' });
        console.log(error);
      });
  };
  
  return (
    <div
      className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center'
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className='w-[600px] max-w-full h-[400px] bg-gray-800 rounded-xl p-4 flex flex-col relative'
      >
        <AiOutlineClose
          className='absolute right-6 top-6 text-3xl text-red-600 cursor-pointer'
          onClick={onClose}
        />
        <h2 className='text-xl font-body font-medium mt-6 text-white self-center'>Ajouter une disponibilité</h2>
        <div className='my-4 flex flex-col'>
            <label className='font-body font-medium text-gray-400 mb-2'>Jour</label>
            <DatePicker
              className='w-full font-body bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
              showIcon
              selected={date.jour}
              onChange={(date) => handleDayChange(date)}     
              dateFormat="dd/MM/yyyy"        
            />
        </div>
        <div className="flex ">
          <div className="mr-4 w-full">
            <label className="block mb-1 text-sm font-medium font-body text-gray-400">Heure début </label>
            <Select
              onChange={(selectedOption) => handleStartTimeChange(selectedOption.value)}
              options={heurs}
              className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
              styles={{
                ...customStyles, // Merge custom styles
                control: (base) => ({
                  ...base,
                  borderColor: 'gray',
                  color: 'white',
                  backgroundColor: '',
                }),
              }}
              />
          </div>

          <div className="w-full">
            <label className="block mb-1 text-sm font-medium font-body text-gray-400">Heure fin </label>
            <Select
              options={heurs}
              onChange={(selectedOption) => handleEndTimeChange(selectedOption.value)}

              className="basic-multi-select font-body bg-gray-600 bg-opacity-20  focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-black leading-8 transition-colors duration-200 ease-in-out"
              styles={{
                ...customStyles, // Merge custom styles
                control: (base) => ({
                  ...base,
                  borderColor: 'gray',
                  color: 'white',
                  backgroundColor: '',
                }),
              }}
              />
          </div>
        </div>

        <button
          onClick={handleAddDisp}
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-body font-medium py-2 px-4 rounded mt-4" 
        >
          Ajouter Disponibilité
        </button>
      </div>
    </div>
  );
};

export default AddModal;