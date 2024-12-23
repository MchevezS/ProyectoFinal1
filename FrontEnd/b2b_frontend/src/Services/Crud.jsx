// eslint-disable-next-line react-refresh/only-export-components
const URL = 'http://127.0.0.1:8000/api/'

// Metodo post: Guarda los datos.
async function post(dataRegister, endpoint,token) {
    try {
        const response = await fetch(`${URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(dataRegister)
        });
        const data = await response.json()
        console.log(data);
        return data
    } catch (error) {
        console.error('Error posting user:', error);
        throw error;
    }
}
export{post}

const loginPost = async (dataRegister, endpoint) => {
    try {
        const response = await fetch(`${URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataRegister)
        });
        const data = await response.json()
        console.log(data);
        return data
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
export { loginPost }


//Metodo Get: Obtiene informacio
async function get(endpoint,id="") {
    try { 
        const response = await fetch(`${URL}${endpoint}/${id}`)
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
export { get };

async function getFilter(endpoint,id="",filtro) {
    try { 
        const response = await fetch(`${URL}${endpoint}?${filtro}=${id}`)
        if (!response.ok) {
            throw new Error('Error fetching data');
        }
        const data = await response.json()
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

export { getFilter};


// Metodo Put: Actualiza datos
async function update( endpoint, id) {
    try {
        const response = await fetch(`${URL}${endpoint}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
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

// Método PATCH: Actualiza los datos de la empresa
async function patch(endpoint, id = "", data, token) {
    if (!token) {
      throw new Error("Token de autenticación no proporcionado.");
    }
  
    try {
      const response = await fetch(`${URL}${endpoint}${id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // Asegúrate de pasar el token en el encabezado
        },
        body: JSON.stringify(data),  // Los datos que deseas enviar
      });
  
      if (!response.ok) {
        const errorDetails = await response.text();  // Captura detalles de la respuesta
        throw new Error(`Error al actualizar la empresa: ${errorDetails}`);
      }
  
      return await response.json();  // Retorna la respuesta exitosa del servidor
    } catch (error) {
      console.error('Error al actualizar la empresa:', error);
      throw error;  // Propaga el error para que pueda ser manejado por el llamador
    }
  }
  
  export { patch }
  

// Metodo Delete: Elimina datos.
async function eliminar(endpoint, id,token) {
    try {
        const response = await fetch(`${URL}${endpoint}/${id}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
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


const subirImagenPerfil = async(imagen,preset)=>{
    const formData = new FormData();
    formData.append('file',imagen);
    formData.append('upload_preset',preset);
    try{
        const response = await fetch('https://api.cloudinary.com/v1_1/ddw0qbl5o/upload',{
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data;
    }catch(error){
        console.error('Error:',error);
    }
}
export {subirImagenPerfil}