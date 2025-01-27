const apiUrl = `${BASE_URL}/equipment`;

// Load all equipment when the page loads
window.onload = fetchEquipment;

// Function to fetch all equipment
function fetchEquipment() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById("equipmentTable");
            tableBody.innerHTML = "";
            data.forEach(equipment => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${equipment.id}</td>
                    <td>${equipment.name}</td>
                    <td>${equipment.statusJson}</td>
                    <td>
                        <button class="btn btn-warning" onclick="editEquipment(${equipment.id})">Editar</button>
                        <button class="btn btn-danger" onclick="deleteEquipment(${equipment.id})">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error fetching equipment:", error));
}

// Function to add a new equipment
function addEquipment(equipment) {
    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(equipment)
    })
    .then(response => response.json())
    .then(() => {
        fetchEquipment(); // Refresh equipment list
        alert('Equipo agregado con éxito');
    })
    .catch(error => console.error('Error adding equipment:', error));
}

// Function to edit an equipment
function editEquipment(id) {
    // Get current equipment data
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('equipmentName').value = data.name;
            document.getElementById('equipmentState').value = data.statusJson;
            
            // Change the submit button behavior to update the equipment
            const submitButton = document.getElementById('addEquipment');
            submitButton.textContent = "Actualizar Equipo";
            submitButton.onclick = () => updateEquipment(id);
        })
        .catch(error => console.error('Error fetching equipment for editing:', error));
}

// Function to update an equipment
function updateEquipment(id) {
    const updatedEquipment = {
        name: document.getElementById('equipmentName').value,
        statusJson: document.getElementById('equipmentState').value
    };

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedEquipment)  // Send updated data excluding ID
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Failed to update equipment');
    })
    .then(() => {
        fetchEquipment(); // Refresh equipment list
        alert('Equipo actualizado con éxito');
        
        // Reset the form
        document.getElementById('addEquipmentForm').reset();
        const submitButton = document.getElementById('addEquipment');
        submitButton.textContent = "Agregar Equipo";
        submitButton.onclick = () => addEquipment(updatedEquipment); // Reset to Add functionality
    })
    .catch(error => {
        console.error('Error updating equipment:', error);
        alert('Error al actualizar el equipo');
    });
}


// Function to delete an equipment
function deleteEquipment(id) {
    if (confirm('¿Estás seguro de eliminar este equipo?')) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
        .then(() => {
            fetchEquipment(); // Refresh equipment list
            alert('Equipo eliminado con éxito');
        })
        .catch(error => console.error('Error deleting equipment:', error));
    }
}

// Event listener for adding equipment
document.getElementById('addEquipment').addEventListener('click', () => {
    const equipment = {
        name: document.getElementById('equipmentName').value,
        statusJson: document.getElementById('equipmentState').value,
    };
    addEquipment(equipment);
});


