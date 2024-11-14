import Swal from 'sweetalert2'
import '/src/style/MostrarAlerta.css'

const Toast = Swal.mixin({
    toast: true,
    position: 'center',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast',
    },
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
})

const mostrarAlerta = async (icon, title)=>{
    await Toast.fire({
        icon: icon,
        title: title,
    })
}
export {mostrarAlerta}


