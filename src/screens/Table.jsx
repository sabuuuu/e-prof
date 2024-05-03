import React, { useMemo } from 'react';

const Table = ({exams, salles }) => {
    const examsName = useMemo(() => {
        return Array.from(new Set(exams.flat().map((exam) => exam.nom)));
      }, [exams]);

      const examsDate = useMemo(() => {
        return Array.from(new Set(exams.flat().map((exam) => exam.dateM)));
      })
  
      const examsHeureDeb = useMemo(() => {
        return Array.from(new Set(exams.flat().map((exam) => exam.heure_deb)));
      })
      const examsHeureFin = useMemo(() => {
        return Array.from(new Set(exams.flat().map((exam) => exam.heure_fin)));
      })
        const numeroSalle = useMemo(() => {
            return Array.from(new Set(salles.map((salle) => salle.numero)));
        })
        const typesSalle = useMemo(() => {
            return Array.from(new Set(salles.map((salle) => salle.type)))
        })   
    return (
        <div className="w-full overflow-x-auto rounded-lg">
            <div className="align-middle inline-block min-w-full ">
                <table className="min-w-full ">
                <thead>
                    <tr>
                        <th className="px-6 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Nom</th>
                        <th className="px-6 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Date</th>
                        <th className="px-6 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider border-r border-black">Horraire</th>
                        <th className="px-6 py-3 bg-indigo-950 text-center text-xs leading-4 font-medium text-gray-200 uppercase tracking-wider">Lieu</th>
                    </tr>
                </thead>
                <tbody className="bg-indigo-900 divide-y divide-gray-200">
                    <tr>
                    <td className="px-6 py-4 whitespace-no-wrap ">
                        <ul className="list-inside text-white">
                        {examsName.map((name) => (
                            <li key={name} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 font-semibold'>{name}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                        <ul className=" list-inside">
                        {examsDate.map((date) => (
                            <li key={date} className='border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 font-semibold'>{date}</li>
                        ))}
                        </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    <ul className="">
                        {exams.flat().map((exam) => (
                        <li key={exam.idM} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 font-semibold">
                            {exam.heure_deb} - {exam.heure_fin}
                        </li>
                        ))}
                    </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap">
                    <ul className="">
                        {salles.flat().map((salle, index) => (
                        <li key={index} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 hover:text-gray-400 font-semibold">
                            {salle.typeSalle}-{salle.numSalle} 
                        </li>
                        ))}
                    </ul>
                    </td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    );
  };
  
  export default Table;
  