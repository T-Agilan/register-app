import axios from "axios";
import "./App.css";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
// import OutputTable from "./outputtable";
import FormHTML from "./FormComponent";
import FilterComponent from "./FilterComponent";
import { Link, useLocation, useNavigate } from "react-router-dom";

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
interface MultipleProps {}
const Multiple: React.FC<MultipleProps> = () => {
  const [submittedData, setSubmittedData] = useState<inputData[]>([]);
  const [formData, setformData] = useState<inputData>(initialFormData);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [isEditMode, setIsEditMode] = useState(false);
  // const [fetchedData, setFetchedData] = useState<inputData[]>([]);
  // const [filteredData, setFilteredData] = useState<inputData[]>(submittedData);
  // const [clearFormData, setClearFormData] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const editingData = location.state?.editingData;

  useEffect(() => {
    if (editingData) {
      setformData(editingData);
    } else {
      // If no editing data is provided, reset the form data
      setformData(initialFormData);
    }
  }, [editingData]);

  // useEffect(() => {
  //   getData();
  // }, []);

  // const getData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3002/");
  //     setFetchedData(response.data);
  //     setSubmittedData(response.data);
  //   } catch (error) {
  //     console.error(error, "error fetching data");
  //   }
  // };

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
    console.log(formData);
    console.log(isEditMode);
    if (formData?._id) {
      try {
        // Use axios.put to update the existing data
        const response = await axios.put(
          `http://localhost:3002/${formData._id}`,
          formData
        );
        console.log("Updated data:", response);

        // Update the local state with the updated data
        setSubmittedData((prevData) => {
          const updatedData = [...prevData];
          const indexToUpdate = updatedData.findIndex(
            (item) => item._id === formData._id
          );
          navigate("/output");
          updatedData[indexToUpdate] = response.data;
          return updatedData;
        });

        // Reset form data and exit edit mode
        setformData(initialFormData);
        setIsEditMode(false);
      } catch (error) {
        console.error("Error updating data:", error);
      }
    } else {
      try {
        // Use axios.post to add new data
        const response = await axios.post("http://localhost:3002/", formData);
        console.log("New data added:", response.data);

        // Add the new data to the local state immediately
        setSubmittedData((prevData) => [...prevData, response.data]);
        navigate("/output");
        // Reset form data
        setformData(initialFormData);
      } catch (error) {
        console.error("Error adding new data:", error);
      }
    }
  };

  const handleEdit = (index: number) => {
    const dataToEdit = submittedData[index];
    setformData(dataToEdit);
    setEditingIndex(index);
    setIsEditMode(true);
  };

  // setFilteredData(filteredDataByPaymentOption);

  return (
    <>
      <FormHTML
        formData={formData}
        editingIndex={editingIndex}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        editingData={null}
        setFormData={setformData}
      />

      {/* <OutputTable
        // submittedData={filteredData.length ? filteredData : fetchedData}
        // setSubmittedData={setFetchedData}
        onEdit={handleEdit}
        onDelete={handleDelete} submittedData={[]}      /> */}
      {/* <OutputTable submittedData={submittedData} onEdit={handleEdit} onDelete={function (index: number): void {
        throw new Error("Function not implemented.");
      } } /> */}
      {/* <Link to="/output">Go to Output Page</Link> */}
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
