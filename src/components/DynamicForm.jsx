import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { fetchFormFields } from "../api/mockApi";
import ProgressBar from "./ProgressBar";
import TableDisplay from "./TableDisplay";

const DynamicForm = () => {
  const [formType, setFormType] = useState("User Information");
  const [formFields, setFormFields] = useState([]);
  const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
  const [submittedData, setSubmittedData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const loadFormFields = async () => {
      const response = await fetchFormFields(formType);
      setFormFields(response.fields || []);
    };
    loadFormFields();
  }, [formType]);

  const onSubmit = (data) => {
    if (editingIndex !== null) {
      // Edit existing entry
      const updatedData = [...submittedData];
      updatedData[editingIndex] = data;
      setSubmittedData(updatedData);
      alert("Changes saved successfully!");
    } else {
      // Add new entry
      setSubmittedData([...submittedData, data]);
      alert("Form submitted successfully!");
    }
    reset(); // Reset form after submission
    setEditingIndex(null); // Clear the editing index
  };

  const calculateProgress = () => {
    const filledFields = formFields.filter(
      (field) => watch(field.name)?.length > 0
    ).length;
    setProgress((filledFields / formFields.length) * 100);
  };

  useEffect(() => {
    calculateProgress();
  }, [watch()]);

  const handleSave = (index, updatedRow) => {
    const updatedData = [...submittedData];
    updatedData[index] = updatedRow;
    setSubmittedData(updatedData);
  };

  const handleDelete = (index) => {
    const updatedData = submittedData.filter((_, i) => i !== index);
    setSubmittedData(updatedData);
    alert("Entry deleted successfully!");
  };

  return (
    <div>
      <h1>Dynamic Form</h1>
      <select onChange={(e) => setFormType(e.target.value)} value={formType}>
        <option>User Information</option>
        <option>Address Information</option>
        <option>Payment Information</option>
      </select>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formFields.map((field) => (
          <div key={field.name}>
            <label>{field.label}</label>
            {field.type === "dropdown" ? (
              <select {...register(field.name, { required: field.required })}>
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type}
                {...register(field.name, { required: field.required })}
              />
            )}
            {errors[field.name] && <span>{field.label} is required</span>}
          </div>
        ))}
        <button type="submit">{editingIndex !== null ? "Save Changes" : "Submit"}</button>
      </form>
      <ProgressBar progress={progress} />
      <TableDisplay
        data={submittedData}
        onSave={handleSave}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default DynamicForm;
