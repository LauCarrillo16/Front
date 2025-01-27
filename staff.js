const apiUrl = `${BASE_URL}/staff`;

// Initialize staff list on page load
window.onload = () => {
    fetchStaff(); // Fetch all staff and display in the table
};

// Add event listener for the add staff form submission
document.getElementById('addStaffForm').addEventListener('submit', addStaff);

// Function to fetch all staff and display in the table
function fetchStaff() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const staffTable = document.getElementById('staffTable');
            staffTable.innerHTML = ''; // Clear the table before adding new rows
            data.forEach(staff => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${staff.id}</td>
                    <td>${staff.name}</td>
                    <td>${staff.staff_Type.name}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editStaff(${staff.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteStaff(${staff.id})">Eliminar</button>
                    </td>
                `;
                staffTable.appendChild(row);
            });
        })
        .catch(error => console.error('Error fetching staff:', error));
}

// Function to add a new staff member
function addStaff(event) {
    event.preventDefault(); // Prevent form from reloading the page

    const fullName = document.getElementById('fullName').value;
    const employeeType = document.getElementById('employeeType').value;

    // Map the staff type to an ID (1 for Trainer, 2 for Nutritionist, 3 for Admin)
    let staffTypeId;
    if (employeeType === "Entrenador") {
        staffTypeId = 1;
    } else if (employeeType === "Nutricionista") {
        staffTypeId = 2;
    } else if (employeeType === "Admin") {
        staffTypeId = 3;
    } else {
        alert('Tipo de empleado no válido');
        return;
    }

    const newStaff = {
        name: fullName,
        staff_Type: {
            id: staffTypeId
        }
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStaff)
    })
        .then(response => {
            if (response.ok) {
                fetchStaff(); // Refresh the staff list
                document.getElementById('addStaffForm').reset(); // Clear the form
                alert('Staff agregado con éxito');
            } else {
                alert('Error al agregar el staff');
            }
        })
        .catch(error => console.error('Error adding staff:', error));
}

// Function to edit a staff member
function editStaff(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('fullName').value = data.name;
            document.getElementById('employeeType').value = data.staff_Type.name;
            document.getElementById('addStaff').textContent = 'Actualizar Staff'; // Change button text to "Update Staff"
            document.getElementById('addStaffForm').onsubmit = (event) => {
                updateStaff(id, event); // Update staff when the form is submitted
            };
        })
        .catch(error => console.error('Error fetching staff:', error));
}

// Function to update an existing staff member
function updateStaff(id, event) {
    event.preventDefault(); // Prevent form from reloading the page

    const fullName = document.getElementById('fullName').value;
    const employeeType = document.getElementById('employeeType').value;

    // Map the staff type to an ID (1 for Trainer, 2 for Nutritionist, 3 for Admin)
    let staffTypeId;
    if (employeeType === "Entrenador") {
        staffTypeId = 1;
    } else if (employeeType === "Nutricionista") {
        staffTypeId = 2;
    } else if (employeeType === "Admin") {
        staffTypeId = 3;
    } else {
        alert('Tipo de empleado no válido');
        return;
    }

    const updatedStaff = {
        name: fullName,
        staff_Type: {
            id: staffTypeId
        }
    };

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStaff)
    })
        .then(response => {
            if (response.ok) {
                fetchStaff(); // Refresh the staff list
                document.getElementById('addStaff').textContent = 'Agregar Staff'; // Reset the button text to "Add Staff"
                document.getElementById('addStaffForm').reset(); // Clear the form
                alert('Staff actualizado con éxito');
            } else {
                alert('Error al actualizar el staff');
            }
        })
        .catch(error => console.error('Error updating staff:', error));
}

// Function to delete a staff member
function deleteStaff(id) {
    if (confirm('¿Estás seguro de que quieres eliminar a este miembro del staff?')) {
        fetch(`${apiUrl}/${id}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    fetchStaff(); // Refresh the staff list
                    alert('Staff eliminado con éxito');
                } else {
                    alert('Error al eliminar el staff');
                }
            })
            .catch(error => console.error('Error deleting staff:', error));
    }
}


