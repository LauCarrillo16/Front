

// //--------------------- MODULO ENTRENAMIENTOS
// // Función para agregar un entrenamiento a la base de datos usando Java y Spring Boot
// async function addTrainingToDatabase(trainingData) {
//     try {
//         const response = await fetch('/api/trainings', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(trainingData)
//         });

//         if (!response.ok) {
//             throw new Error('Error al agregar el entrenamiento.');
//         }
//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         alert('Hubo un problema al agregar el entrenamiento.');
//     }
// }

// // Función para listar los entrenamientos desde la base de datos usando Java y Spring Boot
// async function fetchTrainingsFromDatabase() {
//     try {
//         const response = await fetch('/api/trainings');

//         if (!response.ok) {
//             throw new Error('Error al listar los entrenamientos.');
//         }

//         return await response.json();
//     } catch (error) {
//         console.error(error);
//         alert('Hubo un problema al listar los entrenamientos.');
//     }
// }

// document.getElementById('addTraining').addEventListener('click', async function () {
//     const trainingData = {
//         memberId: document.getElementById('memberId').value,
//         trainerId: document.getElementById('trainerId').value,
//         equipmentId: document.getElementById('equipmentId').value,
//         trainingType: document.getElementById('trainingType').value,
//         sessions: document.getElementById('sessions').value,
//         hours: document.getElementById('hours').value
//     };

//     if (Object.values(trainingData).some(field => !field)) {
//         alert('Por favor completa todos los campos.');
//         return;
//     }

//     const result = await addTrainingToDatabase(trainingData);
//     if (result && result.success) {
//         alert('Entrenamiento agregado con éxito.');
//         document.getElementById('trainingForm').reset();
//     }
// });

// document.getElementById('listTrainings').addEventListener('click', async function () {
//     const trainings = await fetchTrainingsFromDatabase();

//     if (trainings && Array.isArray(trainings)) {
//         const tableBody = document.getElementById('trainingTableBody');
//         tableBody.innerHTML = '';

//         trainings.forEach(training => {
//             const row = document.createElement('tr');
//             row.innerHTML = `
//                 <td>${training.memberName}</td>
//                 <td>${training.trainerName}</td>
//                 <td>${training.equipmentName}</td>
//                 <td>${training.trainingType}</td>
//                 <td>${training.sessions}</td>
//                 <td>${training.hours}</td>
//             `;
//             tableBody.appendChild(row);
//         });
//     }
// });


// //------------- MODULO EQUIPAMENTO
// // Función para agregar un equipo
// document.getElementById("addEquipment").addEventListener("click", () => {
//     const name = document.getElementById("equipmentName").value;
//     const state = document.getElementById("equipmentState").value;

//     if (!name || !state) {
//         alert("Por favor, completa todos los campos");
//         return;
//     }

//     const data = { name, state };

//     fetch("/api/equipment/add", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//     })
//         .then(response => response.json())
//         .then(result => {
//             alert("Equipo agregado con éxito");
//             cargarEquipos();
//         })
//         .catch(error => console.error("Error al agregar el equipo:", error));
// });

// // Función para editar un equipo
// document.getElementById("editEquipment").addEventListener("click", () => {
//     const id = document.getElementById("equipmentId").value;
//     const state = document.getElementById("editEquipmentState").value;

//     if (!id || !state) {
//         alert("Por favor, completa todos los campos");
//         return;
//     }

//     const data = { id, state };

//     fetch("/api/equipment/edit", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data)
//     })
//         .then(response => response.json())
//         .then(result => {
//             alert("Equipo editado con éxito");
//             cargarEquipos();
//         })
//         .catch(error => console.error("Error al editar el equipo:", error));
// });

// // Función para cargar la tabla con los equipos desde la base de datos
// function cargarEquipos() {
//     fetch("/api/equipment/list")
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById("equipmentTable");
//             tableBody.innerHTML = ""; // Limpiar la tabla

//             data.forEach(equipment => {
//                 const row = document.createElement("tr");

//                 row.innerHTML = `
//                     <td>${equipment.name}</td>
//                     <td>${equipment.state}</td>
//                 `;

//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error("Error al cargar los equipos:", error));
// }

// // Función para filtrar equipos por estado
// function filtrarPorEstado(state) {
//     fetch(`/api/equipment/filter?state=${state}`)
//         .then(response => response.json())
//         .then(data => {
//             const tableBody = document.getElementById("equipmentTable");
//             tableBody.innerHTML = ""; // Limpiar la tabla

//             data.forEach(equipment => {
//                 const row = document.createElement("tr");

//                 row.innerHTML = `
//                     <td>${equipment.name}</td>
//                     <td>${equipment.state}</td>
//                 `;

//                 tableBody.appendChild(row);
//             });
//         })
//         .catch(error => console.error("Error al filtrar los equipos:", error));
// }

// // Cargar la tabla al iniciar
// cargarEquipos();


// //------------ MODULO PLAN NUTRICIONAL
// // Referencias a los elementos del DOM
// const addPlanForm = document.getElementById('addPlanForm');
// const planTable = document.getElementById('planTable');

// // Función para agregar un nuevo plan nutricional
// const agregarPlan = async () => {
//     const memberId = document.getElementById('memberId').value;
//     const nutritionistId = document.getElementById('nutritionistId').value;
//     const productId = document.getElementById('productId').value;
//     const trainingType = document.getElementById('trainingType').value;
//     const description = document.getElementById('description').value;

//     if (!memberId || !nutritionistId || !productId || !trainingType || !description) {
//         alert('Por favor, complete todos los campos.');
//         return;
//     }

//     try {
//         const response = await fetch('/api/planes-nutricionales/add', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ memberId, nutritionistId, productId, trainingType, description }),
//         });

//         if (response.ok) {
//             alert('Plan nutricional agregado con éxito.');
//             addPlanForm.reset();
//             cargarPlanes(); // Recargar la tabla
//         } else {
//             alert('Error al agregar el plan nutricional.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

// // Función para cargar todos los planes nutricionales
// const cargarPlanes = async () => {
//     try {
//         const response = await fetch('/api/planes-nutricionales');
//         if (response.ok) {
//             const planes = await response.json();
//             actualizarTabla(planes);
//         } else {
//             alert('Error al cargar los planes nutricionales.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

// // Función para actualizar la tabla
// const actualizarTabla = (planes) => {
//     planTable.innerHTML = ''; // Limpiar la tabla

//     planes.forEach((plan) => {
//         const fila = document.createElement('tr');
//         fila.innerHTML = `
//             <td>${plan.nombreMiembro}</td>
//             <td>${plan.nombreNutricionista}</td>
//             <td>${plan.nombreProducto}</td>
//             <td>${plan.tipoEntrenamiento}</td>
//             <td>${plan.descripcion}</td>
//         `;
//         planTable.appendChild(fila);
//     });
// };

// // Evento para el formulario
// addPlanForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     agregarPlan();
// });

// // Cargar los planes nutricionales al cargar la página
// document.addEventListener('DOMContentLoaded', cargarPlanes);

// //-------------- MODULO STAFF
// // Referencias a los elementos del DOM
// const addStaffForm = document.getElementById('addStaffForm');
// const staffTable = document.getElementById('staffTable');

// // Función para agregar un nuevo miembro del staff
// const agregarStaff = async () => {
//     const fullName = document.getElementById('fullName').value;
//     const employeeType = document.getElementById('employeeType').value;

//     if (!fullName || !employeeType) {
//         alert('Por favor, complete todos los campos.');
//         return;
//     }

//     try {
//         const response = await fetch('/api/staff/add', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ fullName, employeeType }),
//         });

//         if (response.ok) {
//             alert('Miembro del staff agregado con éxito.');
//             addStaffForm.reset();
//             cargarStaff(); // Recargar la tabla
//         } else {
//             alert('Error al agregar al miembro del staff.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

// // Función para cargar todos los miembros del staff
// const cargarStaff = async () => {
//     try {
//         const response = await fetch('/api/staff');
//         if (response.ok) {
//             const staff = await response.json();
//             actualizarTablaStaff(staff);
//         } else {
//             alert('Error al cargar la lista del staff.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//     }
// };

// // Función para actualizar la tabla
// const actualizarTablaStaff = (staff) => {
//     staffTable.innerHTML = ''; // Limpiar la tabla

//     staff.forEach((miembro) => {
//         const fila = document.createElement('tr');
//         fila.innerHTML = `
//             <td>${miembro.nombre}</td>
//             <td>${miembro.tipoEmpleado}</td>
//         `;
//         staffTable.appendChild(fila);
//     });
// };

// // Evento para el formulario
// addStaffForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     agregarStaff();
// });

// // Cargar los miembros del staff al cargar la página
// document.addEventListener('DOMContentLoaded', cargarStaff);

