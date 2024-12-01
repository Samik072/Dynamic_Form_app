import React, { useState } from "react";

const TableDisplay = ({ data, onSave, onDelete }) => {
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedRow, setEditedRow] = useState(null);

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditedRow({ ...data[index] }); // Copy the data of the row being edited
  };

  const handleSave = () => {
    onSave(editingIndex, editedRow); // Save the edited data
    setEditingIndex(null); // Exit edit mode
    setEditedRow(null); // Clear edited row state
  };

  const handleCancel = () => {
    setEditingIndex(null); // Exit edit mode without saving
    setEditedRow(null); // Clear edited row state
  };

  const handleChange = (e, field) => {
    setEditedRow({
      ...editedRow,
      [field]: e.target.value, // Update the edited field value
    });
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {data.length > 0 &&
              Object.keys(data[0]).map((key) => <th key={key}>{key}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              {Object.keys(row).map((key) => (
                <td key={key}>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editedRow[key]}
                      onChange={(e) => handleChange(e, key)}
                    />
                  ) : (
                    row[key]
                  )}
                </td>
              ))}
              <td>
                {editingIndex === index ? (
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(index)}>Edit</button>
                )}
                <button onClick={() => onDelete(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDisplay;
