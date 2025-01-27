const apiUrl = `${BASE_URL}/nutrition_plan`;

// Initialize the page by loading the nutrition plans
document.addEventListener('DOMContentLoaded', () => {
    getNutritionPlans();
    document.getElementById('addPlanForm').addEventListener('submit', addNutritionPlan); // Handle form submission
});

// Fetch all nutrition plans and populate the table
async function getNutritionPlans() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const tableBody = document.getElementById("planTable");
        tableBody.innerHTML = ''; // Clear the table

        data.forEach(plan => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${plan.member.name}</td>
                <td>${plan.staff.name}</td>
                <td>${plan.product.name}</td>
                <td>${plan.description}</td>
                <td>
                    <button class="btn btn-warning" onclick="editNutritionPlan(${plan.id})">Editar</button>
                    <button class="btn btn-danger" onclick="deleteNutritionPlan(${plan.id})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching nutrition plans:', error);
    }
}

// Add a new nutrition plan
async function addNutritionPlan(event) {
    event.preventDefault();

    const memberId = document.getElementById('memberId').value;
    const nutritionistId = document.getElementById('nutritionistId').value;
    const productId = document.getElementById('productId').value;
    const description = document.getElementById('description').value;

    const newPlan = {
        member: { id: memberId },
        staff: { id: nutritionistId },
        product: { id: productId },
        description
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPlan)
        });

        if (response.ok) {
            alert('Plan nutricional agregado');
            getNutritionPlans(); // Refresh the list
            document.getElementById('addPlanForm').reset(); // Reset the form
        } else {
            alert('Error al agregar el plan nutricional');
        }
    } catch (error) {
        console.error('Error adding nutrition plan:', error);
    }
}

// Edit an existing nutrition plan
async function editNutritionPlan(id) {
    try {
        const response = await fetch(`${apiUrl}/${id}`);
        const plan = await response.json();

        document.getElementById('memberId').value = plan.member.id; // Can't edit memberId
        document.getElementById('nutritionistId').value = plan.staff.id;
        document.getElementById('productId').value = plan.product.id;
        document.getElementById('description').value = plan.description;

        // Change the submit button to update an existing plan
        const submitButton = document.getElementById('addNutrition');
        submitButton.innerText = 'Actualizar Plan Nutricional';
        submitButton.onclick = (event) => updateNutritionPlan(event, id); // Bind the update function
    } catch (error) {
        console.error('Error fetching nutrition plan:', error);
    }
}

// Update an existing nutrition plan
async function updateNutritionPlan(event, id) {
    event.preventDefault();

    const nutritionistId = document.getElementById('nutritionistId').value;
    const productId = document.getElementById('productId').value;
    const description = document.getElementById('description').value;

    const updatedPlan = {
        member: { id: document.getElementById('memberId').value }, // Member ID can't change
        staff: { id: nutritionistId },
        product: { id: productId },
        description
    };

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedPlan)
        });

        if (response.ok) {
            alert('Plan nutricional actualizado');
            getNutritionPlans(); // Refresh the list
            document.getElementById('addPlanForm').reset(); // Reset the form
            const submitButton = document.getElementById('addNutrition');
            submitButton.innerText = 'Agregar Plan Nutricional'; // Reset the button text
            submitButton.onclick = (event) => addNutritionPlan(event); // Bind the add function
        } else {
            alert('Error al actualizar el plan nutricional');
        }
    } catch (error) {
        console.error('Error updating nutrition plan:', error);
    }
}

// Delete a nutrition plan
async function deleteNutritionPlan(id) {
    if (confirm('¿Estás seguro de que deseas eliminar este plan nutricional?')) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                alert('Plan nutricional eliminado');
                getNutritionPlans(); // Refresh the list
            } else {
                alert('Error al eliminar el plan nutricional');
            }
        } catch (error) {
            console.error('Error deleting nutrition plan:', error);
        }
    }
}


