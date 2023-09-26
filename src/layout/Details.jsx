import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import Papa from 'papaparse';

function parseCSVData(csvData) {
  const parsedData = Papa.parse(csvData, {
    header: true,
  });

  return parsedData.data;
}
const Details = () => {
  const [studentsData, setStudentsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const studentsCollectionRef = collection(db, 'StudentsDetails');
      const querySnapshot = await getDocs(studentsCollectionRef);
      const allData = querySnapshot?.docs?.map(val => ({ ...val?.data(), id: val.id }));

      const csvFileURLs = allData.map(student => student.file);

      const parsedData = await Promise.all(csvFileURLs.map(async (csvFileURL) => {
        const csvData = await fetch(csvFileURL).then(response => response.text());
        const parsedData = parseCSVData(csvData);
        return parsedData;
      }));

      setStudentsData(parsedData.flat());
    };

    fetchData();
  }, []);
  console.log(studentsData, 'data');

  return (
    <div>
      <h1 className='mb-4'>Student Details</h1>
      <table className='w-[100%] border-collapse'>
        <thead>
          <tr>
          <th className='p-[8px] border-2 border-solid border-[#ddd]'>S.No</th>
            <th className='p-[8px] border-2 border-solid border-[#ddd]'>FirstName</th>
            <th className='p-[8px] border-2 border-solid border-[#ddd]'>LastName</th>
            <th className='p-[8px] border-2 border-solid border-[#ddd]'>Gender</th>
            <th className='p-[8px] border-2 border-solid border-[#ddd]'>Entry age</th>
          </tr>
        </thead>
        <tbody>
          {
            studentsData?.map((item,index)=>{
              if (!item.first_name || !item.last_name || !item.gender) {
                return null; 
              }
              return(
                <tr>
                  <td className='p-[8px] border-2 border-solid border-[#ddd]'>{index+1}</td>
                  <td className='p-[8px] border-2 border-solid border-[#ddd]'>{item?.first_name}</td>
                  <td className='p-[8px] border-2 border-solid border-[#ddd]'>{item?.last_name}</td>
                  <td className='p-[8px] border-2 border-solid border-[#ddd]'>{item.gender}</td>
                  <td className='p-[8px] border-2 border-solid border-[#ddd]'>{item.entry_age}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  );
};


export default Details;
