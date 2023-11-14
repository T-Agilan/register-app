import axios from "axios";
import "./App.css";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import OutputTable from "./outputtable";
import FormHTML from "./FormComponent";
import FilterComponent from "./FilterComponent";

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
const Multiple: React.FC = () => {
  const [submittedData, setSubmittedData] = useState<inputData[]>([]);
  const [formData, setformData] = useState<inputData>(initialFormData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterPaymentOption, setFilterPaymentOption] = useState<string | null>(
    null
  );
  const [fetchedData, setFetchedData] = useState<inputData[]>([]);
  const [filteredData, setFilteredData] = useState<inputData[]>(submittedData);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/");
      setFetchedData(response.data);
      setSubmittedData(response.data);
    } catch (error) {
      console.error(error, "error fetching data");
    }
  };
  
  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    if (editingIndex !== null) {
      try {
        await axios.put(`http://localhost:3002/${formData._id}`, formData);
  
        // Update the local state by replacing the existing data at editingIndex
        setSubmittedData((prevData) => {
          const updatedData = [...prevData];
          updatedData[editingIndex] = formData;
          return updatedData;
        });
  
        getData();
      } catch (error) {
        console.error(error, "error");
      }
    } else {
      try {
        const response = await axios.post("http://localhost:3002/", formData);
        console.log(response.data, "success");
  
        // Add the new data to the local state immediately
        setSubmittedData((prevData) => [...prevData, response.data]);
        getData();
      } catch (error) {
        console.error(error, "error");
      }
    }
  
    setformData(initialFormData);
    setEditingIndex(null);
  };
  

  const handleEdit = (data: inputData, index: number) => {
    console.log(data);
    if (data && data._id) {
      setformData(data);
      setEditingIndex(index);
    } else {
      console.error("The data object does not have an _id property.");
    }
  };
  const handleDelete = async (index: number) => {

    // Check if index is valid
    if (index < 0 || index >= submittedData.length) {
      console.error('Invalid index:', index);
      return;
    }
    console.log('Deleting item at index:', index);
    console.log('Filtered data before deletion:', filteredData);
  
    // Get the item to be deleted
    const itemToDelete = submittedData[index];
    const idToDelete = itemToDelete?._id;
    // Check if item is valid
 
    
    
  
    try {
      // Check if idToDelete is defined before making the delete request
      if (idToDelete !== undefined) {
        // Send a delete request to the server
        await axios.delete(`http://localhost:3002/${idToDelete}`);
        console.log('Item deleted successfully.');
  
        // Update the local state after a successful deletion
        setFilteredData((prevData) => {
          const updatedData = [...prevData];
          updatedData.splice(index, 1);
          return updatedData;
        });
  
        // If editingIndex is not null, check if the deleted index affects the editingIndex
        if (editingIndex !== null) {
          if (index === editingIndex) {
            // Reset the form and editing index if the currently edited item is deleted
            setformData(initialFormData);
            setEditingIndex(null);
          }
        }
      } else {
        console.error('Item id is undefined at index:', index);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };
  
  
  const handlePaymentOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterPaymentOption(event.target.value);
  };
  const applyFilter = () => {
    let filteredDataByType = submittedData;

    if (filterType !== null) {
      filteredDataByType = submittedData.filter(
        (data) => data.type === filterType
      );
    }

    let filteredDataByPaymentOption = filteredDataByType;

    if (filterPaymentOption !== null) {
      filteredDataByPaymentOption = filteredDataByType.filter(
        (data) => data.paymentOptions === filterPaymentOption
      );
    }

    setFilteredData(filteredDataByPaymentOption);
  };
  const clearFilter = () => {
    setFilterType(null);
    setFilterPaymentOption(null);
    setFilteredData([]);
  };
  return (
    <>
      <FormHTML
        formData={formData}
        editingIndex={editingIndex}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
      <FilterComponent
        filterType={filterType}
        setFilterType={setFilterType}
        filterPaymentOption={filterPaymentOption}
        handlePaymentOptionChange={handlePaymentOptionChange}
        applyFilter={applyFilter}
        clearFilter={clearFilter}
      />
      <OutputTable
        submittedData={filteredData.length ? filteredData : fetchedData}
        // setSubmittedData={setFetchedData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};
export default Multiple;

export interface inputData {
  [x: string]: any;
  fname: string;
  mail: string;
  number: string;
  website: string;
  contactName: string;
  contactPhone: string;
  contactMail: string;
  notes: string;
  type: string;
  category: string;
  percentage: number;
  activeFrom: string;
  // Logo:image;
  criticalAccount: string;
  paymentOptions: string;
}
