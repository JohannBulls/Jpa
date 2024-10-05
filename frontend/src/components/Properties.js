import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Properties() {
  const [properties, setProperties] = useState([]);
  const [formData, setFormData] = useState({
    address: '',
    price: '',
    size: '',
    description: ''
  });
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
      await axios.post('http://localhost:8080/properties', formData);
      fetchProperties();  // Actualizar la lista de propiedades
      setFormData({ address: '', price: '', size: '', description: '' }); // Limpiar el formulario
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h1>Gestión de Propiedades</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Dirección</label>
          <input type="text" name="address" value={formData.address} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Precio</label>
          <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Tamaño (m²)</label>
          <input type="number" name="size" value={formData.size} onChange={handleInputChange} required />
        </div>
        <div>
          <label>Descripción</label>
          <textarea name="description" value={formData.description} onChange={handleInputChange} required></textarea>
        </div>
        <button type="submit">Guardar Propiedad</button>
      </form>

      <h2>Lista de Propiedades</h2>
      <ul>
        {properties.map((property) => (
          <li key={property.id}>
            {property.address} - {property.price} - {property.size} m² - {property.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Properties;
