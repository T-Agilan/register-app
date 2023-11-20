// OutputPage.tsx
import React, { useEffect, useState } from 'react';
import { OutputTable } from './outputtable'; // Import your OutputTable component
import axios from 'axios';
import { inputData } from './App';

const OutputPage: React.FC = () => {
  const [data, setData] = useState<inputData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3002/');
        setData(response.data);
      } catch (error) {
        console.error(error, 'error fetching data');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Output Page</h2>
      <OutputTable submittedData={data} onEdit={function (data: inputData, index: number): void {
              throw new Error('Function not implemented.');
          } } onDelete={function (index: number): void {
              throw new Error('Function not implemented.');
          } } />
    </div>
  );
};

export default OutputPage;
