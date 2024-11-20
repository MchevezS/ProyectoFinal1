import { useState } from 'react'
import { mostrarAlerta } from './MostrarAlerta';

function FormLogin() {
const [nombreUsuarioL, setNombreUsuarioL] = useState('');
const [emailL, setEmailL] = useState('');

const espaciosVacios = () => {
    if (nombreUsuarioL.trim()==="" || emailL.trim()==="") {
        mostrarAlerta("error", "Llenar espacios vacios");
        return;
    }
    
}
espaciosVacios()
  return (
    <div>
        <input type='username' placeholder='Nombre' className='nombreUsuarioL' value={nombreUsuarioL} onChange={(e) => setNombreUsuarioL(e.target.value)} required/>
        <input type='email' placeholder='Email' className='emailL' value={emailL} onChange={(e) => setEmailL(e.target.value)} required/>
    </div>
  )
}

export default FormLogin