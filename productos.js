const apiUrl = `${BASE_URL}/product`;

//------------------ MODULO PRODUCTOS

// Llamar a fetchProducts para cargar los datos al iniciar la página
document.addEventListener("DOMContentLoaded", fetchProducts);

// Función para obtener productos desde la base de datos
async function fetchProducts() {
    try {
        const response = await fetch(`${apiUrl}`); // Updated the endpoint URL to match the API
        if (!response.ok) throw new Error("Error al obtener los productos");
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// Función para renderizar productos en la tabla
function renderProducts(products) {
    const productTable = document.getElementById("productTable");
    productTable.innerHTML = "";

    products.forEach((product) => {
        const row = document.createElement("tr");

        const idCell = document.createElement("td");
        idCell.textContent = product.id; // Display the product ID

        const nameCell = document.createElement("td");
        nameCell.textContent = product.name;

        const priceCell = document.createElement("td");
        priceCell.textContent = `$${product.price.toFixed(2)}`;

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(priceCell);

        // Add Edit and Delete buttons
        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.classList.add("btn", "btn-warning", "me-2");
        editButton.onclick = () => editProduct(product.id);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.onclick = () => deleteProduct(product.id);

        actionCell.appendChild(editButton);
        actionCell.appendChild(deleteButton);
        row.appendChild(actionCell);

        productTable.appendChild(row);
    });
}

// Añadir productos
async function addProduct() {
    const productName = document.getElementById("productName").value.trim();
    const productPrice = parseFloat(document.getElementById("productPrice").value);

    if (!productName || isNaN(productPrice) || productPrice < 0) {
        alert("Por favor, ingresa un nombre válido y un precio positivo.");
        return;
    }

    const newProduct = {
        name: productName,
        price: productPrice,
    };

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        if (!response.ok) throw new Error("Error al agregar el producto");
        document.getElementById("addProductForm").reset(); // Clear the form
        fetchProducts(); // Refresh the list of products
    } catch (error) {
        console.error("Error:", error.message);
    }
}

// EDITAR PRODUCTO
function editProduct(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => response.json())
        .then(product => {
            document.getElementById("productName").value = product.name;
            document.getElementById("productPrice").value = product.price;

            // Update the save button to update the product
            const saveButton = document.getElementById("saveProduct");
            saveButton.textContent = "Actualizar";
            saveButton.onclick = () => updateProduct(id);
        })
        .catch(error => console.error("Error fetching product:", error));
}

// Actualizar un producto
async function updateProduct(id) {
    const updatedProduct = {
        name: document.getElementById("productName").value,
        price: parseFloat(document.getElementById("productPrice").value),
    };

    try {
        const response = await fetch(`${apiUrl}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
            fetchProducts(); // Refresh the list of products
            alert("Producto actualizado correctamente");
            resetForm(); // Reset the form
        } else {
            alert("Error al actualizar el producto");
        }
    } catch (error) {
        console.error("Error updating product:", error);
    }
}

// Reset the form and restore the save button
function resetForm() {
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    const saveButton = document.getElementById("saveProduct");
    saveButton.textContent = "Agregar Producto";
    saveButton.onclick = () => addProduct(); // Set back to adding mode
}

// Función para eliminar un producto
async function deleteProduct(id) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) throw new Error("Error al eliminar el producto");
            fetchProducts(); // Actualizar la lista de productos
        } catch (error) {
            console.error("Error:", error.message);
        }
    }
}


