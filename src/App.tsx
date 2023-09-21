// import React from 'react';
import "./App.css";
import React, { useState, ChangeEvent, FormEvent } from "react";

import OutputTable from "./outputtable";
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

const Multiple = () => {
  const [submittedData, setSubmittedData] = useState<inputData[]>([]);
  const [formData, setformData] = useState<inputData>({
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
  });

  const handleInputChange = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmittedData([...submittedData, formData]);
    setformData({
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
    });
  };
  
  return (
    <div>
      <h2>Merchant Form</h2>
      <form onSubmit={handleSubmit}>
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
              <br />
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
              <br />
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
              <br />
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
              <br />
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
              <br />
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
              <br />
            </td>
          </tr>
          <tr>
            <td>
              <label htmlFor="text" className="type">
                <b>Type:</b>
              </label>
              <br />
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
              <br />
              <input
                type="radio"
                id="type-variety"
                name="type"
                value="Enterprise"
                checked={formData.type === "Enterprise"}
                onChange={handleInputChange}
              />
              <label htmlFor="text">Enterprise</label>
              <br />
              <input
                type="radio"
                id="type-variety"
                name="type"
                value="Entrepreneur"
                checked={formData.type === "Entrepreneur"}
                onChange={handleInputChange}
              />
              <label htmlFor="text">Entrepreneur</label>
              <br />
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
                <br />
                <option value="Clothes">Clothes</option>
                <option value="Toys">Toys</option>
                <option value="Groceries">Groceries</option>
                <option value="Electronics">Electronics</option>
                <option value="Digital">Digital</option>
              </select>
              <br />
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
              <br />
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
              <br />
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
              <br />
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
              <br />
              <sup>*</sup>If YES, we can provide extra care in case of any
              queries.
            </td>
          </tr>
          <tr>
            <td>
              <label>
                <b>Payment options:</b>
              </label>
              <br />
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
              <br />
              <input
                type="radio"
                id="online"
                name="paymentOptions"
                value="UPI"
                checked={formData.paymentOptions === "UPI"}
                onChange={handleInputChange}
              />
              <label>UPI</label>
              <br />
              <input
                type="radio"
                id="card"
                name="paymentOptions"
                value="Card payment"
                checked={formData.paymentOptions === "Card payment"}
                onChange={handleInputChange}
              />
              <label>Card payment</label>
              <br />
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
      <OutputTable submittedData={submittedData} setSubmittedData = {setSubmittedData} />
    </div>
  );
};
export default Multiple;
