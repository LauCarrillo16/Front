const apiUrl = `${BASE_URL}/member`;


// document.addEventListener('DOMContentLoaded', function () {
//     // Get the meta tag by name
//     const metaTag = document.querySelector('meta[name="api-port"]');

//     if (metaTag) {
//         // Get the port number from the 'content' attribute
//         const apiPort = metaTag.getAttribute('content');

//         // Construct the full API URL dynamically using the port
//         const apiUrl = `http://localhost:${apiPort}/api/member`;

//         // Now you can use the apiUrl for API calls
//         fetch(apiUrl)
//             .then(response => response.json())
//             .then(data => {
//                 console.log(data); // Handle the fetched data here
//             })
//             .catch(error => console.error('Error fetching data:', error));
//     } else {
//         console.error("Meta tag for API port not found.");
//     }
// });


// Load members when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchMembers();
});

// Fetch all members and display them in the table
function fetchMembers() {
    fetch(apiUrl) // apiUrl = `${BASE_URL}/member`
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch members");
            return response.json(); // Parse JSON
        })
        .then(data => {
            const tableBody = document.getElementById("membersTable");
            tableBody.innerHTML = ""; // Clear the table

            // Populate table rows
            data.forEach(member => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${member.id}</td>
                    <td>${member.name}</td>
                    <td>${member.age}</td>
                    <td>${member.weight}</td>
                    <td>${member.height}</td>
                    <td>${member.phone}</td>
                    <td>${member.address}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editMember(${member.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteMember(${member.id})">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row); // Append row to table
            });
        })
        .catch(error => console.error("Error fetching members:", error));
}


// Save a new member
document.getElementById("saveMember").addEventListener("click", () => {
    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const height = document.getElementById("height").value;
    const weight = document.getElementById("weight").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (!name || !age || !height || !weight || !phone || !address) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const newMember = { name, age, height, weight, phone, address };

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
    })
        .then(response => {
            if (!response.ok) throw new Error("Failed to save member");
            return response.json();
        })
        .then(() => {
            alert("Miembro agregado exitosamente.");
            fetchMembers(); // Refresh the table
        })
        .catch(error => console.error("Error saving member:", error));
});

// Edit a member
function editMember(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(member => {
            document.getElementById("name").value = member.name;
            document.getElementById("age").value = member.age;
            document.getElementById("height").value = member.height;
            document.getElementById("weight").value = member.weight;
            document.getElementById("phone").value = member.phone;
            document.getElementById("address").value = member.address;

            // Update the save button to update the member
            const saveButton = document.getElementById("saveMember");
            saveButton.textContent = "Actualizar";
            saveButton.onclick = () => updateMember(id);
        })
        .catch(error => console.error("Error fetching member:", error));
}

function updateMember(id) {
    const updatedMember = {
        name: document.getElementById("name").value,
        age: parseInt(document.getElementById("age").value),
        height: parseFloat(document.getElementById("height").value),
        weight: parseFloat(document.getElementById("weight").value),
        phone: document.getElementById("phone").value,
        address: document.getElementById("address").value
    };

    fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedMember)
    })
        .then(response => {
            if (response.ok) {
                fetchMembers(); // Refresh the list
                alert("Miembro actualizado correctamente");
                resetForm();
            } else {
                alert("Error al actualizar miembro");
            }
        })
        .catch(error => console.error("Error updating member:", error));
}

// Delete a member
function deleteMember(id) {
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
    })
        .then(response => {
            if (!response.ok) throw new Error("Failed to delete member");
            alert("Miembro eliminado exitosamente.");
            fetchMembers(); // Refresh the table
        })
        .catch(error => console.error("Error deleting member:", error));
}

// Reset the form and restore the save button
function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("height").value = "";
    document.getElementById("weight").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    const saveButton = document.getElementById("saveMember");
    saveButton.textContent = "Guardar";
    saveButton.onclick = () => addMember();
}

// Edit a member (not implemented in the form yet, placeholder function)
// function editMember(id) {
//     alert(`Editar miembro con ID: ${id} - Esta funcionalidad está en desarrollo.`);
// }
