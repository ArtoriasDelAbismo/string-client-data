import React from "react";
import { caliberOptions } from "../data";
import { tensionOptions } from "../data";
import { demosOptions } from "../data";

export default function DemosForm({
  handleChange,
  handleSubmit,
  formData,
}) {
  const selectFields = {
    caliber: caliberOptions,
    tension: tensionOptions,
    demos: demosOptions,
  };

  return (
    <form className="demos-form" onSubmit={handleSubmit}>
      {[
        { label: "Full Name", name: "fullname", type: "text" },
        { label: "Mail", name: "mail", type: "email" },
        { label: "Phone", name: "phone", type: "text" },
        { label: "Notes", name: "notes", type: "text" },
      ].map(({ label, name, type }) => (
        <div key={name} className="form-field">
          <label>
            <h2>{label}</h2>
            {selectFields[name] ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                {selectFields[name].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : type === "notes" ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
              />
            ) : (
              <input
                name={name}
                type={type}
                value={formData[name]}
                onChange={handleChange}
                required
              />
            )}
          </label>
        </div>
      ))}
      <div
        style={{
          fontWeight: "bold",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <label style={{ marginBottom: "2px" }} htmlFor="select">
          Demo
        </label>
        <select
          name="demo"
          id="demos"
          style={{ height: "40px" }}
          onChange={handleChange}
          value={formData.demo}
          required
        >
          <option value="" disabled>
            Select a demo
          </option>
          {demosOptions.map((brandData) => (
            <optgroup key={brandData.brand} label={brandData.brand}>
              {brandData.models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      <div className="submit-button">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
