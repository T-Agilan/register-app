import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { inputData } from "./App";

interface FormHTMLProps {
  formData: inputData;
  editingIndex: number | null;
  editingData: inputData | null;  
  setFormData: React.Dispatch<React.SetStateAction<inputData>>|undefined; 
  handleInputChange: (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (event:React. FormEvent<HTMLFormElement>) => void;
}

const FormHTML: React.FC<FormHTMLProps> = ({
  formData,
  editingIndex,
  editingData,
  setFormData,
  handleInputChange,
  handleSubmit,
}) => {
  const [isEditMode, setIsEditMode] = useState(false); 
  const dataToDisplay = editingData || formData;
  useEffect(() => {
    if (setFormData) {
      setFormData(dataToDisplay);
    }
  }, [dataToDisplay, setFormData]);
  
  // const resetForm = () => {
  //   if (setFormData) {
  //     setFormData(dataToDisplay);
  //   }
  // };

  // useEffect(() => {
  //   resetForm();
  // }, [dataToDisplay, setFormData]);

  
  return (
    <div>
      <h2>Merchant Form</h2>
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
                value={dataToDisplay.fname}
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
                value={dataToDisplay.mail}
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
                value={dataToDisplay.number}
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
                value={dataToDisplay.website}
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
                value={dataToDisplay.contactName}
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
                value={dataToDisplay.contactPhone}
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
                value={dataToDisplay.contactMail}
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
                value={dataToDisplay.notes}
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
                checked={dataToDisplay.type === "Small Business"}
                onChange={handleInputChange}
              />
              <label htmlFor="text">Small Business</label>
              <input
                type="radio"
                id="type-variety"
                name="type"
                value="Enterprise"
                checked={dataToDisplay.type === "Enterprise"}
                onChange={handleInputChange}
              />
              <label htmlFor="text">Enterprise</label>
              <input
                type="radio"
                id="type-variety"
                name="type"
                value="Entrepreneur"
                checked={dataToDisplay.type === "Entrepreneur"}
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
                value={dataToDisplay.category}
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
                value={dataToDisplay.percentage}
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
                value={dataToDisplay.activeFrom}
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
                value="yes"
                checked={dataToDisplay.criticalAccount === true}
                onChange={handleInputChange}
              />
              <label htmlFor="yes">YES</label>
              <input
                type="radio"
                id="no"
                name="criticalAccount"
                value="no"
                checked={dataToDisplay.criticalAccount === false}
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
                checked={dataToDisplay.paymentOptions === "Cash on Delivery"}
                onChange={handleInputChange}
              />
              <label>Cash on delivery</label>
              <input
                type="radio"
                id="online"
                name="paymentOptions"
                value="UPI"
                checked={dataToDisplay.paymentOptions === "UPI"}
                onChange={handleInputChange}
              />
              <label>UPI</label>
              <input
                type="radio"
                id="card"
                name="paymentOptions"
                value="Card payment"
                checked={dataToDisplay.paymentOptions === "Card payment"}
                onChange={handleInputChange}
              />
              <label>Card payment</label>
            </td>
          </tr>
          <tr />
          <tr>
            <td>
            <button type="submit">{isEditMode ? "Update" :"submit"}</button>
              <button type="reset" id="reset" className="re-set">
                Reset
              </button>
            </td>
          </tr>
        </table>
      </form>
    </div>
  );
};

export default FormHTML;
