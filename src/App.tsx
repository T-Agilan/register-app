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
  const navigate = useNavigate();
  const location = useLocation();
  const editingData = location.state?.editingData;

  useEffect(() => {
    if (editingData) {
      setformData(editingData);
    }
  }, [editingData]);

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
        setformData(initialFormData);
        setEditingIndex(null);
        // getData();
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
        navigate("/output");
      } catch (error) {
        console.error(error, "error");
      }
    }
  };

  const handleEdit = async (data: inputData, index: number) => {
    if (data && data._id) {
      // Fetch the data from the server using the ID
      try {
        const response = await axios.get(`http://localhost:3002/${data._id}`);
        const editingData = response.data;

        // Set the editing data in the form
        setformData(editingData);
        setEditingIndex(index);
        navigate("/", { state: { editingData } });
      } catch (error) {
        console.error(error, "error fetching editing data");
      }
    } else {
      console.error("The data object does not have an _id property.");
    }
  };

  const handleDelete = async (index: number) => {
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
        editingData={null}
      />
      <FilterComponent
        filterType={filterType}
        setFilterType={setFilterType}
        filterPaymentOption={filterPaymentOption}
        handlePaymentOptionChange={handlePaymentOptionChange}
        applyFilter={applyFilter}
        clearFilter={clearFilter}
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
