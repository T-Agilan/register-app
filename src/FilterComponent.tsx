import React from "react";
interface FilterComponentProps {
  filterType: string | null;
  setFilterType: (filter: string | null) => void;
  filterPaymentOption: string | null;
  handlePaymentOptionChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  applyFilter: () => void;
  clearFilter: () => void;
}
const FilterComponent: React.FC<FilterComponentProps> = ({
  
  filterType,
  setFilterType,
  filterPaymentOption,
  handlePaymentOptionChange,
  applyFilter,
  clearFilter,
}) => {
  
  return (
    <>
      <div className="filter-type">
        <h3>Filter Options:</h3>
        <label>
          <input
            type="radio"
            name="filterType"
            value="Small Business"
            checked={filterType === "Small Business"}
            onChange={() => setFilterType("Small Business")}
          />
          Small Business
        </label>
        <label>
          <input
            type="radio"
            name="filterType"
            value="Enterprise"
            checked={filterType === "Enterprise"}
            onChange={() => setFilterType("Enterprise")}
          />
          Enterprise
        </label>
        <label>
          <input
            type="radio"
            name="filterType"
            value="Entrepreneur"
            checked={filterType === "Entrepreneur"}
            onChange={() => setFilterType("Entrepreneur")}
          />
          Entrepreneur
        </label>
        <button onClick={applyFilter}>Apply Filter</button>
        <div className="filter-payment">
          <h3>Filter by Payment Option:</h3>
          <label>
            <input
              type="radio"
              name="filterPaymentOption"
              value="Cash on Delivery"
              checked={filterPaymentOption === "Cash on Delivery"}
              onChange={handlePaymentOptionChange}
            />
            Cash on Delivery
          </label>
          <label>
            <input
              type="radio"
              name="filterPaymentOption"
              value="UPI"
              checked={filterPaymentOption === "UPI"}
              onChange={handlePaymentOptionChange}
            />
            UPI
          </label>
          <label>
            <input
              type="radio"
              name="filterPaymentOption"
              value="Card payment"
              checked={filterPaymentOption === "Card payment"}
              onChange={handlePaymentOptionChange}
            />
            Card payment
          </label>
          <button onClick={applyFilter}>Apply Filter</button>
          <button onClick={clearFilter}>Clear Filter</button>
        </div>
      </div>
    </>
  );
};
export default FilterComponent;
