const propertyForm = document.getElementById('propertyForm');
const propertyList = document.getElementById('propertyList');
let editingPropertyId = null;

// Obtener todas las propiedades al cargar la página
window.onload = async function () {
    await fetchProperties();
};

// Manejar el formulario de envío (Crear o Actualizar Propiedad)
propertyForm.onsubmit = async function (event) {
    event.preventDefault();

    const property = {
        address: document.getElementById('address').value,
        price: parseFloat(document.getElementById('price').value),
        size: parseFloat(document.getElementById('size').value),
        description: document.getElementById('description').value
    };

    if (editingPropertyId) {
        // Actualizar propiedad
        await updateProperty(editingPropertyId, property);
    } else {
        // Crear nueva propiedad
        await createProperty(property);
    }

    propertyForm.reset();
    editingPropertyId = null;
    await fetchProperties();
};

// Función para obtener todas las propiedades
async function fetchProperties() {
    const response = await fetch('http://localhost:8080/properties');
    const properties = await response.json();
    displayProperties(properties);
}

// Función para mostrar propiedades en la tabla
function displayProperties(properties) {
    propertyList.innerHTML = ''; // Limpiar la lista

    properties.forEach(property => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${property.address}</td>
            <td>${property.price}</td>
            <td>${property.size} m²</td>
            <td>${property.description}</td>
            <td>
                <button onclick="editProperty(${property.id})" class="btn btn-warning btn-sm">
                    <i class="bi bi-brush"></i> Editar
                </button>
                <button onclick="deleteProperty(${property.id})" class="btn btn-danger btn-sm">
                    <i class="bi bi-trash3"></i> Eliminar
                </button>
            </td>
        `;

        propertyList.appendChild(row);
    });
}


// Función para crear una nueva propiedad
async function createProperty(property) {
    await fetch('http://localhost:8080/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property)
    });
}

// Función para actualizar una propiedad existente
async function updateProperty(id, property) {
    await fetch(`http://localhost:8080/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(property)
    });
}

// Función para eliminar una propiedad
async function deleteProperty(id) {
    await fetch(`http://localhost:8080/properties/${id}`, {
        method: 'DELETE'
    });
    await fetchProperties(); // Actualizar la lista después de eliminar
}

// Función para editar una propiedad (rellena el formulario con los datos)
async function editProperty(id) {
    const response = await fetch(`http://localhost:8080/properties/${id}`);
    const property = await response.json();

    document.getElementById('address').value = property.address;
    document.getElementById('price').value = property.price;
    document.getElementById('size').value = property.size;
    document.getElementById('description').value = property.description;
    
    editingPropertyId = id;
}
