import axios from "axios";
import "./App.css";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import OutputTable from "./outputtable";
import FormHTML from "./FormComponent";

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
  const getData = () => {
    axios
      .get("http://localhost:3002/")
      .then((response) => {
        setFetchedData(response.data);
      })
      .catch((error) => {
        console.error(error, "error fetching data");
      });
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
      const updatedData = [...submittedData];
      updatedData[editingIndex] = formData;
      setSubmittedData(updatedData); // Update the local state immediately

      try {
        await axios.put(`http://localhost:3002/${formData._id}`, formData);
        getData();
      } catch (error) {
        console.error(error, "error");
      }
    } else {
      try {
        const response = await axios.post("http://localhost:3002/", formData);
        console.log(response.data, "success");
        setSubmittedData([...submittedData, response.data]); // Add the new data to the local state immediately
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
  const handleDelete = (index: number) => {
    const updatedData = [...submittedData];
    updatedData.splice(index, 1);
    getData();
    setSubmittedData(updatedData);
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
