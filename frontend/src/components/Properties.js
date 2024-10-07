import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

/**
 * Properties component for managing the property list and form for adding/editing properties.
 * 
 * This component allows the user to:
 * - View a list of properties
 * - Add new properties
 * - Edit existing properties
 * - Delete properties
 * 
 * The user must be authenticated to access this page.
 */
function Properties() {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    address: "",
    price: "",
    size: "",
    description: "",
  });
  const [editingProperty, setEditingProperty] = useState(null);
  const navigate = useNavigate();

  /**
   * On component mount, checks if the user is authenticated.
   * If not, redirects to the login page.
   * If authenticated, fetches the list of properties.
   */
  useEffect(() => {
    if (!sessionStorage.getItem("authenticated")) {
      navigate("/login");
    } else {
      fetchProperties();
    }
  }, [navigate]);

  /**
   * Fetches the list of properties from the backend.
   */
  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:8080/properties");
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  /**
   * Handles form input changes by updating the formData state.
   * 
   * @param {object} e - The input change event.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  /**
   * Handles form submission to either create or update a property.
   * 
   * @param {object} e - The form submission event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProperty) {
        // Update an existing property
        await axios.put(
          `http://localhost:8080/properties/${editingProperty.id}`,
          formData
        );
        setEditingProperty(null);
      } else {
        // Create a new property
        await axios.post("http://localhost:8080/properties", formData);
      }
      fetchProperties();
      setFormData({ address: "", price: "", size: "", description: "" });
    } catch (error) {
      console.error("Error creating or updating property:", error);
    }
  };

  /**
   * Populates the form with the selected property's data for editing.
   * 
   * @param {object} property - The property to edit.
   */
  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      address: property.address,
      price: property.price,
      size: property.size,
      description: property.description,
    });
  };

  /**
   * Deletes a property by its ID.
   * 
   * @param {number} id - The ID of the property to delete.
   */
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/properties/${id}`);
      fetchProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  /**
   * Logs the user out and redirects to the login page.
   */
  const handleLogout = () => {
    sessionStorage.removeItem("authenticated");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-4">
        <button onClick={handleLogout} className="btn btn-danger">
          Log Out
        </button>
      </div>

      <div className="card p-4 mb-5">
        <h2 className="text-center mb-4">
          {editingProperty ? "Edit Property" : "Add New Property"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Price</label>
              <input
                type="number"
                name="price"
                className="form-control"
                value={formData.price}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label">Size (m²)</label>
              <input
                type="number"
                name="size"
                className="form-control"
                value={formData.size}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {editingProperty ? "Save Changes" : "Save Property"}
          </button>
        </form>
      </div>

      <h2 className="text-center mb-4">Property List</h2>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Address</th>
              <th>Price</th>
              <th>Size (m²)</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.address}</td>
                <td>{property.price}</td>
                <td>{property.size}</td>
                <td>{property.description}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => handleEdit(property)}
                  >
                    <FontAwesomeIcon icon={faEdit} />{" "}
                    <span className="d-none d-md-inline">Edit</span>
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(property.id)}
                  >
                    <FontAwesomeIcon icon={faTrashAlt} />{" "}
                    <span className="d-none d-md-inline">Delete</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Properties;