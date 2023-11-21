// OutputPage.tsx
import React, { useEffect, useState } from 'react';
import { OutputTable } from './outputtable'; // Import your OutputTable component
import axios from 'axios';
import { inputData } from './App';
import { useNavigate } from 'react-router-dom';

const initialFormData: inputData = {
  fname: "",
  mail: "",
  number: "",
  website: "",
  contactName: "",
  contactPhone: "",
  contactMail: "",
  notes: "",
  type: "",
  category: "",
  percentage: 0,
  activeFrom: "",
  criticalAccount: "",
  paymentOptions: "",
};

const OutputPage: React.FC = () => {
  const [data, setData] = useState<inputData[]>([]);
  const [formData, setformData] = useState<inputData>(initialFormData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const navigate = useNavigate();

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

  const handleEdit = (data: inputData, index: number) => {
    if (data && data._id) {
      setformData(data);
      setEditingIndex(index);
      // Navigate to the form page with the editing data
      navigate('/', { state: { editingData: data } });
    } else {
      console.error("The data object does not have an _id property.");
    }
  };
  return (
    <div>
      <h2>Output Page</h2>
      <OutputTable submittedData={data} onEdit={handleEdit} onDelete={() => {}} />
    </div>
  );
};

export default OutputPage;
