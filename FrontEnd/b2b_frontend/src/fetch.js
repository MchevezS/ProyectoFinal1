const url = `http://127.0.0.1:8000/api/`; //url del backend

// Función asíncrona que hace la solicitud POST
const post = async (endpoint, obj) => {
  // Realizamos la solicitud fetch
  const response = await fetch(`${url}${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(obj), 
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export default post;


