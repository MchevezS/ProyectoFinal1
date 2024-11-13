// Metodo post: Guarda los datos.
async function post(dataRegister, endpoint) {
    try {
        const response = await fetch(`http://localhost:3001/${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataRegister)
        });
        const data = await response.json()
        // console.log(data);
        return data
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}
export{post}




//Metodo Get: Obtiene informacio
async function get( endpoint) {
    try { 
        const response = await fetch(`http://localhost:3001/${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        });
        
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        const data = await response.json()
        return data;
    } catch (error) {
        // console.error('Error fetching users:', error);
        throw error;
    }
}
export { get};

// Metodo Put: Actualiza datos
async function update( endpoint, id) {
    try {
        const response = await fetch(`http://localhost:3001/${endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify() 
        });

        if (!response.ok) {
            throw new Error('Error al actualizar el producto');
        }

        return await response.json();
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        throw error;
    }
}


export{update}


// Metodo Delete: Elimina datos.
async function eliminar(endpoint, id) {
    try {
        const response = await fetch(`http://localhost:3001/${endpoint}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Error deleting user with id ${id}`);
        }

        return { message: `User with id ${id} deleted successfully` };
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export { eliminar };