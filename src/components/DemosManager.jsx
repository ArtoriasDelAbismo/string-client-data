import { useState } from "react";

export default function DemosManager({ demosOptions, onAdd, onRemove }) {
  const [open, setOpen] = useState(false);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [existingBrand, setExistingBrand] = useState("");
  const [existingModel, setExistingModel] = useState("");

  const handleAddToExisting = () => {
    const m = existingModel.trim();
    if (!existingBrand || !m) return;
    onAdd(existingBrand, m);
    setExistingModel("");
  };

  const handleAddNew = () => {
    const b = brand.trim();
    const m = model.trim();
    if (!b || !m) return;
    onAdd(b, m);
    setBrand("");
    setModel("");
  };

  const handleRemoveModel = (brand, model) => {
    onRemove(brand, model);
  };

  const inputStyle = { padding: "6px", borderRadius: "6px", width: "160px" };
  const sectionStyle = {
    backgroundColor: "#2a2a2a",
    borderRadius: "6px",
    padding: "12px",
    marginBottom: "12px",
  };

  return (
    <div style={{ width: "60%", margin: "20px auto", color: "white" }}>
      <h2
        onClick={() => setOpen(!open)}
        style={{ cursor: "pointer", userSelect: "none", color: "#ffc107" }}
      >
        Manage Demo Rackets {open ? "▲" : "▼"}
      </h2>

      <div style={{
        backgroundColor: "#333",
        borderRadius: "8px",
        overflow: "hidden",
        maxHeight: open ? "1000px" : "0",
        opacity: open ? 1 : 0,
        transition: "max-height 0.35s ease, opacity 0.25s ease",
      }}>
        <div style={{ padding: "16px" }}>

          <div style={sectionStyle}>
            <p style={{ margin: "0 0 8px 0", fontWeight: "bold", textAlign: "left" }}>Add model to existing brand</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <select
                value={existingBrand}
                onChange={(e) => setExistingBrand(e.target.value)}
                style={{ padding: "6px", borderRadius: "6px" }}
              >
                <option value="">Select brand</option>
                {demosOptions.map((b) => (
                  <option key={b.brand} value={b.brand}>{b.brand}</option>
                ))}
              </select>
              <input
                placeholder="Model name"
                value={existingModel}
                onChange={(e) => setExistingModel(e.target.value)}
                style={inputStyle}
                onKeyDown={(e) => e.key === "Enter" && handleAddToExisting()}
              />
              <button onClick={handleAddToExisting} style={{ backgroundColor: "#4caf50", color: "white" }}>
                + Add
              </button>
            </div>
          </div>

          <div style={sectionStyle}>
            <p style={{ margin: "0 0 8px 0", fontWeight: "bold", textAlign: "left" }}>Add new brand + model</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <input
                placeholder="Brand name"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                style={inputStyle}
              />
              <input
                placeholder="Model name"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                style={inputStyle}
                onKeyDown={(e) => e.key === "Enter" && handleAddNew()}
              />
              <button onClick={handleAddNew} style={{ backgroundColor: "#4caf50", color: "white" }}>
                + Add
              </button>
            </div>
          </div>

          <div>
            {demosOptions.map((b) => (
              <div key={b.brand} style={{ marginBottom: "12px", textAlign: "left" }}>
                <strong style={{ color: "#ffc107", display: "block" }}>{b.brand}</strong>
                <ul style={{ listStyle: "none", padding: 0, margin: "4px 0 0 0" }}>
                  {b.models.map((m) => (
                    <li key={m} style={{ display: "flex", alignItems: "center", marginBottom: "4px", width: "300px" }}>
                      <span style={{ flex: 1 }}>{m}</span>
                      <button
                        onClick={() => handleRemoveModel(b.brand, m)}
                        style={{ backgroundColor: "#c0392b", color: "white", padding: "2px 8px", fontSize: "0.8em", flexShrink: 0 }}
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
