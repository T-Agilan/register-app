// OutputPage.tsx
import React, { useEffect, useState } from "react";
import { OutputTable } from "./outputtable"; // Import your OutputTable component
import axios from "axios";
import { inputData } from "./App";
import { useNavigate } from "react-router-dom";

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
  const [submittedData, setSubmittedData] = useState<inputData[]>([]);
  const [data, setData] = useState<inputData[]>([]);
  const [formData, setformData] = useState<inputData>(initialFormData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filteredData, setFilteredData] = useState<inputData[]>(submittedData);
   const [fetchedData, setFetchedData] = useState<inputData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3002/");
        setData(response.data);
      } catch (error) {
        console.error(error, "error fetching data");
      }
    };

    fetchData();
  }, []);

  const handleEdit = (data: inputData, index: number) => {
    console.log(data);
    if (data._id) {
      setformData(data);
      setEditingIndex(index);

      // Navigate to the form page with the editing data
      navigate("/", { state: { editingData: data, editingIndex: index } });
    } else {
      console.error("The data object does not have an _id property.");
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/");
      setFetchedData(response.data);
      setSubmittedData(response.data);
    } catch (error) {
      console.error(error, "error fetching data");
    }
  };

  const handleDelete = async (index: number) => {
    console.log("delete is clicked")
    if (index < 0 || index >= submittedData.length) {
      console.error("Invalid index:", index);
      getData();
      return;
    }
    // Get the item to be deleted
    const itemToDelete = submittedData[index];
    const idToDelete = itemToDelete?._id;

    try {
      if (idToDelete !== undefined) {
        await axios.delete(`http://localhost:3002/${idToDelete}`);
        console.log("Item deleted successfully.");
        // Update the local state after a successful deletion
        setSubmittedData((prevData) => {
          const updatedData = [...prevData];
          updatedData.splice(index, 1);
          return updatedData;
        });
        setFilteredData((prevData) => {
          const updatedData = [...prevData];
          updatedData.splice(index, 1);
          return updatedData;
        });
        if (editingIndex !== null) {
          if (index === editingIndex) {
            setformData(initialFormData);
            setEditingIndex(null);
          }
        }
      } else {
        console.error("Item id is undefined at index:", index);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  
  return (
    <div>
      <h2>Output Page</h2>
      <button onClick={()=>navigate('/')}>Add new data</button>
      <OutputTable
        submittedData={data}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default OutputPage;
