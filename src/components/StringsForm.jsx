import React from "react";

export default function StringsForm({
  formData,
  handleChange,
  handleSubmit,
  selectFields,
}) {
  return (
    <form
      className="strings-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {[
        { label: "Full Name", name: "fullname", type: "text" },
        { label: "String", name: "string", type: "text" },
        { label: "Caliber", name: "caliber", type: "text" },
        { label: "Tension", name: "tension", type: "text" },
        { label: "Racket", name: "racket", type: "text" },
        { label: "Mail", name: "mail", type: "email" },
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
      <div className="submit-button">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
}
