import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

function Properties() {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    address: '',
    price: '',
    size: '',
    description: ''
  });
  const [editingProperty, setEditingProperty] = useState(null); // Estado para manejar la edición
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem('authenticated')) {
      navigate('/login');
    } else {
      fetchProperties();
    }
  }, [navigate]);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:8080/properties');
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProperty) {
        // Si estamos editando una propiedad
        await axios.put(`http://localhost:8080/properties/${editingProperty.id}`, formData);
        setEditingProperty(null); // Limpiar el estado de edición
      } else {
        // Crear nueva propiedad
        await axios.post('http://localhost:8080/properties', formData);
      }
      fetchProperties();  // Actualizar la lista de propiedades
      setFormData({ address: '', price: '', size: '', description: '' });
    } catch (error) {
      console.error('Error creating or updating property:', error);
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property); // Configurar la propiedad a editar
    setFormData({
      address: property.address,
      price: property.price,
      size: property.size,
      description: property.description
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/properties/${id}`);
      fetchProperties(); // Actualizar la lista de propiedades
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    sessionStorage.removeItem('authenticated');  
    navigate('/login'); 
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-end mb-4">
        <button onClick={handleLogout} className="btn btn-danger">Cerrar Sesión</button>
      </div>

      <div className="card p-4 mb-5">
        <h2 className="text-center mb-4">{editingProperty ? 'Editar Propiedad' : 'Agregar Nueva Propiedad'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Dirección</label>
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
              <label className="form-label">Precio</label>
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
              <label className="form-label">Tamaño (m²)</label>
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
            <label className="form-label">Descripción</label>
            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            {editingProperty ? 'Guardar Cambios' : 'Guardar Propiedad'}
          </button>
        </form>
      </div>

      <h2 className="text-center mb-4">Lista de Propiedades</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Dirección</th>
            <th>Precio</th>
            <th>Tamaño (m²)</th>
            <th>Descripción</th>
            <th>Acciones</th>
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
                <button className="btn btn-warning me-2" onClick={() => handleEdit(property)}>
                  <FontAwesomeIcon icon={faEdit} /> Editar
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(property.id)}>
                  <FontAwesomeIcon icon={faTrashAlt} /> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Properties;
