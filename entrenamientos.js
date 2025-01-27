const apiUrl = `${BASE_URL}/training`;

// Mapping training types to their respective IDs
const trainingTypeMapping = {
    abdomen: 1,
    arms: 2,
    legs: 3,
    biceps: 4,
    cardio: 5,
    HIIT: 6,
};

// Fetch and display all training records
function fetchTrainings() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(trainings => {
            const tableBody = document.getElementById("trainingTableBody");
            tableBody.innerHTML = "";

            trainings.forEach(training => {
                const row = `
                    <tr>
                        <td>${training.member.name}</td>
                        <td>${training.staff.name}</td>
                        <td>${training.equipment.name}</td>
                        <td>${training.training_Type.name}</td>
                        <td>${training.sessions}</td>
                        <td>${training.hours}</td>
                        <td>
                            <button class="btn btn-warning btn-sm" onclick="editTraining(${training.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteTraining(${training.id})">Eliminar</button>
                        </td>
                    </tr>
                `;
                tableBody.insertAdjacentHTML("beforeend", row);
            });
        })
        .catch(error => console.error("Error fetching trainings:", error));
}

// Add a new training record
function addTraining() {
    const training = getTrainingFormData();

    if (!training) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(training),
    })
        .then(response => {
            if (response.ok) {
                fetchTrainings();
                resetForm();
                alert("Entrenamiento agregado exitosamente.");
            } else {
                alert("Error al agregar entrenamiento.");
            }
        })
        .catch(error => console.error("Error adding training:", error));
}

// Edit an existing training record
function editTraining(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(training => {
            document.getElementById("memberId").value = training.member.id;
            document.getElementById("memberId").disabled = true; // Prevent changes to member ID
            document.getElementById("trainerId").value = training.staff.id;
            document.getElementById("equipmentId").value = training.equipment.id;
            document.getElementById("trainingType").value = Object.keys(trainingTypeMapping).find(
                key => trainingTypeMapping[key] === training.training_Type.id
            );
            document.getElementById("sessions").value = training.sessions;
            document.getElementById("hours").value = training.hours;

            const saveButton = document.getElementById("addTraining");
            saveButton.textContent = "Actualizar";
            saveButton.onclick = () => updateTraining(id);
        })
        .catch(error => console.error("Error fetching training:", error));
}

// Update an existing training record
function updateTraining(id) {
    const training = getTrainingFormData();

    if (!training) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    fetch(`${apiUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(training),
    })
        .then(response => {
            if (response.ok) {
                fetchTrainings();
                resetForm();
                alert("Entrenamiento actualizado exitosamente.");
            } else {
                alert("Error al actualizar entrenamiento.");
            }
        })
        .catch(error => console.error("Error updating training:", error));
}

// Delete a training record
function deleteTraining(id) {
    if (!confirm("¿Estás seguro de que deseas eliminar este entrenamiento?")) return;

    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(response => {
            if (response.ok) {
                fetchTrainings();
                alert("Entrenamiento eliminado exitosamente.");
            } else {
                alert("Error al eliminar entrenamiento.");
            }
        })
        .catch(error => console.error("Error deleting training:", error));
}

// Get form data and map to training object
function getTrainingFormData() {
    const memberId = document.getElementById("memberId").value;
    const trainerId = document.getElementById("trainerId").value;
    const equipmentId = document.getElementById("equipmentId").value;
    const trainingType = document.getElementById("trainingType").value;
    const sessions = document.getElementById("sessions").value;
    const hours = document.getElementById("hours").value;

    if (!memberId || !trainerId || !equipmentId || !trainingType || !sessions || !hours) {
        return null;
    }

    return {
        member: { id: parseInt(memberId) },
        staff: { id: parseInt(trainerId) },
        equipment: { id: parseInt(equipmentId) },
        training_Type: { id: trainingTypeMapping[trainingType] },
        sessions: parseInt(sessions),
        hours: parseInt(hours),
    };
}

// Reset form and restore default state
function resetForm() {
    document.getElementById("memberId").value = "";
    document.getElementById("memberId").disabled = false;
    document.getElementById("trainerId").value = "";
    document.getElementById("equipmentId").value = "";
    document.getElementById("trainingType").value = "";
    document.getElementById("sessions").value = "";
    document.getElementById("hours").value = "";

    const saveButton = document.getElementById("addTraining");
    saveButton.textContent = "Agregar Entrenamiento";
    saveButton.onclick = addTraining;
}

// Initial fetch of training records
fetchTrainings();
