import axios from "axios";
import "./App.css";
import React, { useState, ChangeEvent, FormEvent,useEffect } from "react";
// import OutputTable, { inputData } from "./outputtable";
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
  const [data, setData] = useState([]);
  const [filterPaymentOption, setFilterPaymentOption] = useState<string | null>(
    null
  );
  
  localStorage.setItem('submittedData', JSON.stringify(submittedData));

  const [filteredData, setFilteredData] = useState<inputData[]>(submittedData);
  useEffect(() => {
    const storedSubmittedData = localStorage.getItem('submittedData');
    if (storedSubmittedData) {
      setSubmittedData(JSON.parse(storedSubmittedData));
    }
  }, []);
  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };
  
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    console.log("hii")
    event.preventDefault();
    
    const updatedData = [...submittedData, formData];
    setSubmittedData(updatedData);

    // Save to local storage
    localStorage.setItem('submittedData', JSON.stringify(updatedData));

    setformData(initialFormData);
    try {
      const response = await axios.post("http://localhost:3002/", formData);
      console.log(response.data, "success");
    } catch (error) {
      console.error(error, "error");
    }
    setformData(initialFormData);
  };
  
  const handleEdit = (data: inputData, index: number) => {
    setformData(data);
    setEditingIndex(index);
  };
  const handleDelete = (index: number) => {
    const updatedData = [...submittedData];
    updatedData.splice(index, 1);
    setSubmittedData(updatedData);
  };
  const handlePaymentOptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFilterPaymentOption(event.target.value);
  };
  const applyFilter = () => {
    let filteredDataByType = submittedData;

    if (filterType !== null) {
      filteredDataByType = submittedData.filter((data) => data.type === filterType);
    }

    let filteredDataByPaymentOption = filteredDataByType;

    if (filterPaymentOption !== null) {
      filteredDataByPaymentOption = filteredDataByType.filter((data) => data.paymentOptions === filterPaymentOption);
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
      <div>
        <h2>Merchant Fgvfhgorm</h2>
        <form onSubmit={handleSubmit} id="form">
          <table className="table1">
            <tr>
              <td>
                <label htmlFor="fname">
                  <b>Name:</b>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  id="fname"
                  name="fname"
                  value={formData.fname}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="mobile">
                  <b>Email:</b>
                </label>
              </td>
              <td>
                <input
                  type="email"
                  id="mail"
                  name="mail"
                  value={formData.mail}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="tel">
                  <b>Mobile Number:</b>
                </label>
              </td>
              <td>
                <input
                  type="tel"
                  id="number"
                  name="number"
                  value={formData.number}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="website">
                  <b>Website:</b>
                </label>
              </td>
              <td>
                <input
                  type="url"
                  id="website"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="contact">
                  <b>Contact name:</b>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  id="contact-Name"
                  name="contactName"
                  value={formData.contactName}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="number">
                  {" "}
                  <b>Contact Number:</b>
                </label>
              </td>
              <td>
                <input
                  type="tel"
                  id="contact-number"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="e-mail">
                  <b>Contact email:</b>
                </label>
              </td>
              <td>
                <input
                  type="email"
                  id="Contact-email"
                  name="contactMail"
                  value={formData.contactMail}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="notes">
                  <b>Notes:</b>
                </label>
              </td>
              <td>
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  placeholder="Comment your thoughts..!"
                  value={formData.notes}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="text" className="type">
                  <b>Type:</b>
                </label>
              </td>
              <td>
                <input
                  type="radio"
                  id="type-variety"
                  name="type"
                  value="Small Business"
                  checked={formData.type === "Small Business"}
                  onChange={handleInputChange}
                />
                <label htmlFor="text">Small Business</label>
                <input
                  type="radio"
                  id="type-variety"
                  name="type"
                  value="Enterprise"
                  checked={formData.type === "Enterprise"}
                  onChange={handleInputChange}
                />
                <label htmlFor="text">Enterprise</label>
                <input
                  type="radio"
                  id="type-variety"
                  name="type"
                  value="Entrepreneur"
                  checked={formData.type === "Entrepreneur"}
                  onChange={handleInputChange}
                />
                <label htmlFor="text">Entrepreneur</label>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="text">
                  <b>Category:</b>
                </label>
                <br />
              </td>
              <td>
                <select
                  id="category-variety"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                >
                  <option value="Clothes">Clothes</option>
                  <option value="Toys">Toys</option>
                  <option value="Groceries">Groceries</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Digital">Digital</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="percentage">
                  <b>Commission percentage:</b>
                </label>
              </td>
              <td>
                <input
                  type="number"
                  id="percentage"
                  name="percentage"
                  min="0"
                  max="100"
                  value={formData.percentage}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="ActiveFrom" className="activeFrom">
                  <b>Active from:</b>
                </label>
              </td>
              <td>
                <input
                  type="date"
                  id="duration"
                  name="activeFrom"
                  value={formData.activeFrom}
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="image" className="Logo">
                  <b>Logo:</b>
                </label>
              </td>
              <td>
                <input
                  type="file"
                  id="image"
                  name="Logo"
                  onChange={handleInputChange}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <b>Critical Account:</b>
                </label>
              </td>
              <td>
                <input
                  type="radio"
                  id="yes"
                  name="criticalAccount"
                  value="YES"
                  checked={formData.criticalAccount === "YES"}
                  onChange={handleInputChange}
                />
                <label htmlFor="yes">YES</label>
                <input
                  type="radio"
                  id="no"
                  name="criticalAccount"
                  value="NO"
                  checked={formData.criticalAccount === "NO"}
                  onChange={handleInputChange}
                />
                <label>NO</label>
                <sup>*</sup>If YES, we can provide extra care in case of any
                queries.
              </td>
            </tr>
            <tr>
              <td>
                <label>
                  <b>Payment options:</b>
                </label>
              </td>
              <td>
                <input
                  type="radio"
                  id="cash"
                  name="paymentOptions"
                  value="Cash on Delivery"
                  checked={formData.paymentOptions === "Cash on Delivery"}
                  onChange={handleInputChange}
                />
                <label>Cash on delivery</label>
                <input
                  type="radio"
                  id="online"
                  name="paymentOptions"
                  value="UPI"
                  checked={formData.paymentOptions === "UPI"}
                  onChange={handleInputChange}
                />
                <label>UPI</label>
                <input
                  type="radio"
                  id="card"
                  name="paymentOptions"
                  value="Card payment"
                  checked={formData.paymentOptions === "Card payment"}
                  onChange={handleInputChange}
                />
                <label>Card payment</label>
              </td>
            </tr>
            <tr />
            <tr>
              <td>
                <button type="submit" id="Submit">
                  Submit
                </button>
                <button type="reset" id="reset" className="re-set">
                  Reset
                </button>
              </td>
            </tr>
          </table>
        </form>
      </div>
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
        {/* <button onClick={clearFilter}>Clear Filter</button> */}
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
      <OutputTable
        submittedData={filteredData.length ? filteredData : submittedData}
        setSubmittedData={setSubmittedData}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  );
};
export default Multiple;

export interface inputData {
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
interface PropsType {
  submittedData: inputData[];
  setSubmittedData: React.Dispatch<React.SetStateAction<inputData[]>>;
  onEdit: (data: inputData, index: number) => void;
  onDelete: (index: number) => void;
}

const OutputTable: React.FC<PropsType> = ({
  submittedData,
  // setSubmittedData,
  onEdit,
  onDelete,
}) => {
  return (
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
          {/* <th>Logo</th> */}
          <th>Critical Account</th>
          <th>Payment Options</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {submittedData.map((data, index) => (
          <tr key={index}>
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
        ))}
      </tbody>
    </table>
  );
};
