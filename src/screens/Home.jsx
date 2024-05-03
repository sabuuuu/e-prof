import React ,{ useState ,useEffect ,useMemo} from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import AxiosInstance from './Axios.jsx'
import Combobox from './Combo.jsx'
import Table from './Table.jsx'
const faculteOptions = [
  { label: "Choisir Faculté" },
  { value: "Sciences exactes", label: "Sciences exactes" },
  { value: "Technologie", label: "Technologie" },
  { value: "Sciences de la nature et de la vie", label: "Sciences de la nature et de la vie" },
];

const specialiteOptions = [
  {  label: "Choisir Specialité" },
  { value: "Informatique", label: "Informatique" },
  { value: "Chimie", label: "Chimie" },
  { value: "Physique et SM", label: "Physique et SM" },
  { value: "Recherche Opérationnelle", label: "Recherche Opérationnelle"},
  { value: "Mathématiques", label: "Mathématiques"},

];

const filiereOptions = [
  { label: "Choisir Filière" },
  { value: "Ingéniorat", label: "Ingéniorat" },
  { value: "Informatique", label: "Informatique" },
  { value: "Informatique LMD", label: "Informatique RN" },
  { value: "Informatique MI", label: "Informatique MI" },
  { value: "Informatique RN-SI", label: "Informatique RN-SI" },
  { value: "Informatique RN-RS", label: "Informatique RN-RS" },
  { value: "ASR", label: "ASR" },
  { value: "GL", label: "GL" },
  { value: "IA", label: "IA" },
  { value: "RS", label: "RS" },
  { value: "SIA", label: "SIA" },
];

const anneeOptions = [
  {  label: "Choisir Année" },
  { value: "L1", label: "L1" },
  { value: "L2", label: "L2" },
  { value: "L3", label: "L3" },
  { value: "M1", label: "M1" },
  { value: "M2", label: "M2" },
];
function Home() {
  const [plannings, setPlannings] = useState([]);
  const [filters, setFilters] = useState({
      faculte : '',
      specialite : '',
      filiere : '',
      annee : '',
      semestre : '',
      type : '',
      session : '',
  });
  
  const GetData = async () => {
    try {
      const response = await AxiosInstance.get(`planning/`, { params: filters });
      setPlannings(response.data);
      console.log('Data:', response.data);
    } catch (error) {
      console.log('Fetch error:', error);
    } 
  }  

  const salles = plannings.map((planning) => planning.exams.map((exam) => exam.salle));
  const exams = useMemo(() => {
    return plannings.map((planning) => planning.exams);
  })
  const handleGetSchedule = () => {
    GetData();
  };

  return (
    <div className='h-screen bg-gray-900 font-body'>
      <Navbar />
      <div className=' w-full flex flex items-center justify-center bg-gray-900'>
        {/* space to add the filtering combobox */}
        <div className="w-full md:w-1/3 p-4">
          <div className="flex flex-col items-center justify-center">
          <Combobox
              options={faculteOptions}  
              selectedValue={filters.faculte}
              onChange={(value) => setFilters({ ...filters, faculte: value })}
            />

            <Combobox
              options={specialiteOptions} 
              selectedValue={filters.specialite}
              onChange={(value) => setFilters({ ...filters, specialite: value })}
            />

            <Combobox
              options={filiereOptions}  
              selectedValue={filters.filiere}
              onChange={(value) => setFilters({ ...filters, filiere: value })}
            />
            <Combobox
              options={anneeOptions}  
              selectedValue={filters.filiere}
              onChange={(value) => setFilters({ ...filters, filiere: value })}
            />
            <Combobox
              options={[
                { label: "Choisir Semestre" },
                { value: "1", label: "1" },
                { value: "2", label: "2" },
              ]}
              selectedValue={filters.filter1} 
              onChange={(value) => setFilters({ ...filters, filter1: value })}  
            />
            <Combobox
              options={[
                { label: "Choisir Type" },
                { value: "Normale", label: "Normale" },
                { value: "Remplacement", label: "Remplacement" },
              ]}
              selectedValue={filters.filter2} 
              onChange={(value) => setFilters({ ...filters, filter2: value })}  
            />
            <Combobox
              options={[
                { label: "Choisir Session" },
                { value: "Normale", label: "Normale" },
                { value: "Rattrappage", label: "Rattrappage" },
              ]}
              selectedValue={filters.filter3}  
              onChange={(value) => setFilters({ ...filters, filter3: value })} 
            />
             <button
                className="w-3/4 py-2 mt-2 text-white font-body font-semibold bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                onClick={handleGetSchedule}
              >
                Rechercher
              </button>
          </div>
        </div>

        {/* space to add the table */}
        <div className="w-full md:w-2/3 p-4 flex items-center justify-center">
          <Table exams={exams} salles={salles}/>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Home