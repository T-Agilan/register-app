import React, { ChangeEvent, useState } from "react";
import { inputData } from "./App";
import FilterComponent from "./FilterComponent";

interface PropsType {
  submittedData: inputData[];
  onEdit: (data: inputData, index: number) => void;
  onDelete: (index: number) => void;
}

export const OutputTable: React.FC<PropsType> = ({
  submittedData,
  onEdit,
  onDelete,
}) => {
  const [filterType, setFilterType] = useState<string | null>(null);
  const [filterPaymentOption, setFilterPaymentOption] = useState<string | null>(
    null
  );
  const [filteredData, setFilteredData] = useState<inputData[]>(submittedData);
  const [filtersApplied, setFiltersApplied] = useState(false);

  const handlePaymentOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterPaymentOption(event.target.value);
  };

  const applyFilter = () => {
    let newFilteredData = submittedData;

    if (filterType !== null) {
      newFilteredData = newFilteredData.filter((data) => data.type === filterType);
    }

    if (filterPaymentOption !== null) {
      newFilteredData = newFilteredData.filter(
        (data) => data.paymentOptions === filterPaymentOption
      );
    }

    setFilteredData(newFilteredData);
    setFiltersApplied(true);
  };

  const clearFilter = () => {
    setFilterType(null);
    setFilterPaymentOption(null);
    setFilteredData(submittedData);
    setFiltersApplied(false);
  };

  return (
    <>
      <FilterComponent
        filterType={filterType}
        setFilterType={setFilterType}
        filterPaymentOption={filterPaymentOption}
        handlePaymentOptionChange={handlePaymentOptionChange}
        applyFilter={applyFilter}
        clearFilter={clearFilter}
      />
      <table id="dataTable" className="table-scroll">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Contact Name</th>
            <th>Contact Phone</th>
            <th>Contact Email</th>
            <th>Notes</th>
            <th>Type</th>
            <th>Category</th>
            <th>Commission Percentage</th>
            <th>Active From</th>
            <th>Critical Account</th>
            <th>Payment Options</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtersApplied ? (
            filteredData.map((data, index) => (
              <tr key={data._id}>
                <td>{data.fname}</td>
                <td>{data.mail}</td>
                <td>{data.number}</td>
                <td>{data.website}</td>
                <td>{data.contactName}</td>
                <td>{data.contactPhone}</td>
                <td>{data.contactMail}</td>
                <td>{data.notes}</td>
                <td>{data.type}</td>
                <td>{data.category}</td>
                <td>{data.percentage}</td>
                <td>{data.activeFrom}</td>
                <td>{data.criticalAccount}</td>
                <td>{data.paymentOptions}</td>
                <td>
                  <button onClick={() => onEdit(data, index)}>Edit</button>
                  <button onClick={() => onDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            submittedData.map((data, index) => (
              <tr key={data._id}>
                <td>{data.fname}</td>
                <td>{data.mail}</td>
                <td>{data.number}</td>
                <td>{data.website}</td>
                <td>{data.contactName}</td>
                <td>{data.contactPhone}</td>
                <td>{data.contactMail}</td>
                <td>{data.notes}</td>
                <td>{data.type}</td>
                <td>{data.category}</td>
                <td>{data.percentage}</td>
                <td>{data.activeFrom}</td>
                <td>{data.criticalAccount}</td>
                <td>{data.paymentOptions}</td>
                <td>
                  <button onClick={() => onEdit(data, index)}>Edit</button>
                  <button onClick={() => onDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default OutputTable;
