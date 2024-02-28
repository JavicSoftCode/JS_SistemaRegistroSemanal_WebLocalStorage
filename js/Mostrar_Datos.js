// MOSTRAR_DATOS.js

const ID_TbodyPagos = document.getElementById('ID_TbodyPagos');

function BorrarFilaMD(index) {
    localStorage.removeItem(`totalAcumulado_${index}`);
    ID_TbodyPagos.deleteRow(index);

    const KEY_Informacion_Almacenada = JSON.parse(localStorage.getItem('KEY_Informacion_Almacenada')) || [];
    KEY_Informacion_Almacenada.splice(index, 1);
    localStorage.setItem('KEY_Informacion_Almacenada', JSON.stringify(KEY_Informacion_Almacenada));

    for (let i = index; i < KEY_Informacion_Almacenada.length; i++) {
        localStorage.setItem(`totalAcumulado_${i}`, localStorage.getItem(`totalAcumulado_${i + 1}`));
    }
}

function MostrarDatosMD(index) {
    const datos = JSON.parse(localStorage.getItem('KEY_Informacion_Almacenada'))[index];
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    const form = document.createElement('form');
    form.className = 'edit-form';
    form.innerHTML = `
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        <h2 style="font-size: 75px; color: #001b84;">Datos del Trabajador</h2>
       
        <label>&nbsp;<i class="fas fa-id-card"></i>&nbsp;Cédula</label>
        <input value="${datos.KEY_CI}" readonly><br>
      
        <label>&nbsp;<i class="fas fa-user-tie"></i>&nbsp;Trabajador</label>
        <input value="${datos.KEY_NameLastname}" readonly><br>
      
        <label>&nbsp;<i class="fas fa-briefcase"></i>&nbsp;Area</label>
        <input value="${datos.KEY_Area}" readonly><br>
        
        <label>&nbsp;<i class="fas fa-dollar-sign"></i>&nbsp;Valor del día</label>
        <input value="${datos.KEY_ValorDia}" readonly><br>
   
       <label>&nbsp;<i class="fas fa-mobile-alt"></i>&nbsp;Teléfono</label>
       <input value="${datos.KEY_Cell}"  readonly><br>
          
        <button type="button" class="cancel-button">Cancelar</button>
    `;

    overlay.appendChild(form);
    document.body.appendChild(overlay);

    const cancelButton = form.querySelector('.cancel-button');
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
}

function CargarDatosMD() {
    const KEY_Informacion_Almacenada = JSON.parse(localStorage.getItem('KEY_Informacion_Almacenada')) || [];
    KEY_Informacion_Almacenada.forEach((datos, index) => {
        const newRow = ID_TbodyPagos.insertRow();
        newRow.innerHTML = `
            <td><button type="button" style="font-size: 35px; color: blue; font-weight: bold; text-align:center;" class="CI-button">CI</button> </td>
            <td style="font-size: 35px; color: blue; font-weight: bold; text-align:center;">${datos.KEY_Area}</td>
             <td style="font-size: 35px; color: blue; font-weight: bold; text-align:center; display: none">${datos.KEY_CI}</td>
            <td style="font-size: 35px; color: blue; font-weight: bold; text-align:center; display: none">${datos.KEY_NameLastname}</td>
            
            <td style="font-size: 35px; color: blue; font-weight: bold; text-align:center;">
            <button type="button" id="llamadas" class="phone-button" style="color: blue;">✆</button></td>   
               
            <td style="font-size: 35px; color: blue; font-weight: bold; text-align:center;"><p>$ <span class="total">0</span></p></td>
          
            <td style="font-size: 35px;">
              
                <div class="btn">
                    <button id="rue-${index}" class="mtr_btn" type="button">⚙️</button>
                    
                    <div class="buttons-container" id="buttons-container-${index}">
                        <button class="delete-button">Borrar</button>
                        <button class="edit-button">Mostrar Datos</button>
                        <button class="print-button">Imprimir</button>
                        <button class="close-button">❌</button>
                        
                    </div>
                </div>
            </td>`;

        const rueButton = document.getElementById(`rue-${index}`);
        const closeButton = newRow.querySelector('.close-button');
        rueButton.addEventListener('click', () => MostrarBtnsCrudMD(index));
        closeButton.addEventListener('click', () => CerrarBtnsCrudMD(index));

        function MostrarBtnsCrudMD(index) {
            const buttonsContainer = document.getElementById(`buttons-container-${index}`);
            buttonsContainer.style.display = 'block';
        }

        function CerrarBtnsCrudMD(index) {
            const buttonsContainer = document.getElementById(`buttons-container-${index}`);
            buttonsContainer.style.display = 'none';
        }

        const CIButtons = newRow.querySelectorAll('.CI-button');
        CIButtons.forEach((CIButton) => {
            CIButton.addEventListener("click", function () {
                const containerDivCI = document.createElement('div');
                containerDivCI.style.textAlign = 'center';
                containerDivCI.style.position = 'fixed';
                containerDivCI.style.top = '50%';
                containerDivCI.style.left = '50%';
                containerDivCI.style.transform = 'translate(-50%, -50%)';
                containerDivCI.style.width = '50%';
                containerDivCI.style.border = '3px solid rgba(0, 27, 132, 0.73)';
                containerDivCI.style.boxShadow = '0 0 35px rgb(0, 27, 132)';
                containerDivCI.style.fontSize = '50px';
                containerDivCI.style.borderRadius = '20px';
                containerDivCI.style.color = '#0000FFFF';
                containerDivCI.style.fontWeight = 'bold';
                containerDivCI.style.backgroundColor = 'white';

                const ceduDiv = document.createElement('div');
                ceduDiv.id = 'cedu';
                ceduDiv.textContent = 'C.I ' + datos.KEY_CI;

                const nombreDiv = document.createElement('div');
                nombreDiv.id = 'nombre';
                nombreDiv.textContent = datos.KEY_NameLastname;
                nombreDiv.style.marginBottom = '10px';

                const closeButton = document.createElement('button');
                closeButton.style.border = '2px solid rgba(0, 27, 132, 0.73)';
                closeButton.style.boxShadow = '0 0 20px rgb(0, 27, 132)';
                closeButton.style.width = '100%';
                closeButton.style.height = '20%';
                closeButton.style.fontSize = '50px';
                closeButton.style.borderRadius = '10px';
                closeButton.style.fontWeight = 'bold';
                closeButton.style.borderTop = 'none';
                closeButton.style.borderBottom = 'none';
                closeButton.style.backgroundColor = '#FF0000FF';
                closeButton.textContent = '❌';

                closeButton.addEventListener('click', function () {
                    document.body.removeChild(containerDivCI);
                });

                containerDivCI.appendChild(nombreDiv);
                containerDivCI.appendChild(ceduDiv);
                containerDivCI.appendChild(closeButton);
                document.body.appendChild(containerDivCI);
            });
        });

        const phoneButtons = newRow.querySelectorAll('.phone-button');
        phoneButtons.forEach((phoneButton) => {
            phoneButton.addEventListener("click", function () {
                const containerDiv = document.createElement('div');
                containerDiv.style.textAlign = 'center';
                containerDiv.style.position = 'fixed';
                containerDiv.style.top = '50%';
                containerDiv.style.left = '50%';
                containerDiv.style.transform = 'translate(-50%, -50%)';
                containerDiv.style.border = '3px solid rgba(0, 27, 132, 0.73)';
                containerDiv.style.boxShadow = '0 0 35px rgb(0, 27, 132)';
                containerDiv.style.fontSize = '50px';
                containerDiv.style.borderRadius = '20px';
                containerDiv.style.color = '#0000FFFF';
                containerDiv.style.fontWeight = 'bold';
                containerDiv.style.backgroundColor = 'white';

                const closeButton = document.createElement('button');
                closeButton.style.border = '2px solid rgba(0, 27, 132, 0.73)';
                closeButton.style.boxShadow = '0 0 20px rgb(0, 27, 132)';
                closeButton.style.width = '100%';
                closeButton.style.height = '20%';
                closeButton.style.fontSize = '50px';
                closeButton.style.borderRadius = '10px';
                closeButton.style.fontWeight = 'bold';
                closeButton.style.borderTop = 'none';
                closeButton.style.borderBottom = 'none';
                closeButton.style.marginTop = '15px';
                closeButton.style.backgroundColor = '#FF0000FF';
                closeButton.textContent = '❌';

                closeButton.addEventListener('click', function () {
                    document.body.removeChild(containerDiv);
                });

                const whatsappButton = document.createElement('button');
                whatsappButton.textContent = 'WhatsApp';
                whatsappButton.style.width = '50%';
                whatsappButton.style.fontWeight = 'bold';
                whatsappButton.style.marginTop = '20px';
                whatsappButton.style.border = '5px solid rgb(135, 29, 29)';
                whatsappButton.style.boxShadow = '0 0 10px rgba(0, 27, 132, 0.7)';
                whatsappButton.style.fontSize = '40px';
                whatsappButton.style.fontFamily = "'Times New Roman', Times, serif";
                whatsappButton.style.borderTop = 'none';
                whatsappButton.style.borderBottom = 'none';
                whatsappButton.style.borderRadius = '10px';
                whatsappButton.style.color = '#0000ff';
                whatsappButton.style.backgroundColor = 'white';


                whatsappButton.addEventListener('click', function () {
                    const link = 'https://wa.me/' + datos.KEY_Cell + '?text=Buen%20Día';
                    window.open(link);
                });

                const callButton = document.createElement('button');
                callButton.textContent = 'Teléfono';
                callButton.style.width = '50%';
                callButton.style.marginTop = '20px';
                callButton.style.border = '5px solid rgb(135, 29, 29)';
                callButton.style.boxShadow = '0 0 10px rgba(0, 27, 132, 0.7)';
                callButton.style.fontSize = '40px';
                callButton.style.fontWeight = 'bold';
                callButton.style.fontFamily = "'Times New Roman', Times, serif";
                callButton.style.borderTop = 'none';
                callButton.style.borderBottom = 'none';
                callButton.style.borderRadius = '10px';
                callButton.style.color = '#0000ff';
                callButton.style.backgroundColor = 'white';

                callButton.addEventListener('click', function () {
                    const telLink = 'tel:' + datos.KEY_Cell;
                    window.open(telLink);
                });

                containerDiv.appendChild(whatsappButton);
                containerDiv.appendChild(callButton);
                containerDiv.appendChild(closeButton);
                document.body.appendChild(containerDiv);
            });
        });

        const deleteButton = newRow.querySelector('.delete-button');
        const editButton = newRow.querySelector('.edit-button');
        const printButton = newRow.querySelector('.print-button');
        const totalElement = newRow.querySelector('.total');
        let totalAcumulado = 0;
        const storedTotal = parseInt(localStorage.getItem(`totalAcumulado_${index}`)) || 0;

        totalElement.textContent = totalAcumulado;

        deleteButton.addEventListener('click', () => {
            BorrarFilaMD(index);
        });

        editButton.addEventListener('click', (event) => {
            event.preventDefault();
            MostrarDatosMD(index);
        });

        printButton.addEventListener('click', () => {
            DescargarExcelMD(datos, totalAcumulado);
        });

        totalAcumulado = storedTotal;
        totalElement.textContent = totalAcumulado;
    });

    function DescargarExcelMD(data, totalAcumulado) {
        const encabezados = [
            'Trabajador',
            'Dia $',
            'Lunes',
            'Martes',
            'Miércoles',
            'Jueves',
            'Viernes',
            'Sábado',
            'Semana $'
        ];

        const fila = [
            data.KEY_Area,
            data.KEY_ValorDia,
        ];

        fila.push(totalAcumulado);

        const tablaHTML = `
            <table>
                <thead>
                    <tr>
                        ${encabezados.map(encabezado => `<th>${encabezado}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        ${fila.map(valor => `<td>${valor}</td>`).join('')}
                    </tr>
                </tbody>
            </table>
        `;

        const contenido = `<html lang=""><head><meta charset="UTF-8"><title></title></head><body>${tablaHTML}</body></html>`;

        const archivo = new Blob([contenido], {type: 'application/vnd.ms-excel'});
        const a = document.createElement('a');
        const url = URL.createObjectURL(archivo);

        a.href = url;
        a.download = `Registro_Del_${data.KEY_Area}_${data.KEY_NameLastname}.xls`;
        document.body.appendChild(a);
        a.click();

        setTimeout(() => {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    }
}


function SeleccionarTextoED(input) {
    input.select();
}


// Función para manejar la pulsación de tecla en el campo de búsqueda
function EnterBusquedad(event) {
    // Si la tecla presionada es Enter
    if (event.keyCode === 13) {
        event.preventDefault(); // Detener el comportamiento predeterminado del formulario
        SeleccionarTextoED(this);
        buscar(); // Llamar a la función de búsqueda
    }
}

// Agregar el evento keydown al campo de búsqueda
const InputBusquedad = document.getElementById("searchInput");
InputBusquedad.addEventListener("keydown", EnterBusquedad, document.activeElement.blur());


const notificacionDiv = document.createElement("div");
notificacionDiv.classList.add("notificacion");
document.body.appendChild(notificacionDiv);

function buscar() {
    const InputBusquedad = document.getElementById("searchInput").value.trim().toLowerCase();

    // Verifica si el campo de búsqueda está vacío
    if (InputBusquedad === "") {
        mostrarNotificacion("BÚSQUEDAD VACÍA ⚠️");
        return;
    }

    const rows = ID_TbodyPagos.getElementsByTagName("tr"); // Cambiar ID_TbodyAsist por ID_TbodyPagos
    let found = false;

    for (let i = 0; i < rows.length; i++) {
        const ci = rows[i].cells[1].textContent.toLowerCase(); // Suponiendo que la cédula está en la primera celda
        const nameLastname = rows[i].cells[2].textContent.toLowerCase(); // Suponiendo que el nombre y apellido están en la segunda celda

        if (ci.includes(InputBusquedad) || nameLastname.includes(InputBusquedad)) {
            rows[i].scrollIntoView({behavior: 'smooth', block: 'start'}); // Hace scroll hasta la fila encontrada
            rows[i].classList.add("fila-encontrada"); // Agrega la clase para aplicar los estilos
            setTimeout(() => {
                rows[i].classList.remove("fila-encontrada"); // Quita la clase después de un tiempo
            }, 7000); // Restablece los estilos después de 7 segundos (ajustar según lo que prefieras)
            found = true;
        } else {
            rows[i].classList.remove("fila-encontrada"); // Quita la clase si no hay coincidencia
        }
    }

    // Si no se encuentra ninguna coincidencia, muestra una notificación
    if (!found) {
        mostrarNotificacion(" NO ENCONTRADO 🚫");
    }
}


function mostrarNotificacion(mensaje) {
    const notificacion = document.querySelector(".notificacion");
    notificacion.textContent = mensaje;
    notificacion.style.opacity = "1";
    setTimeout(() => {
        notificacion.style.opacity = "0";
    }, 3000);
}


window.addEventListener('load', () => {
    CargarDatosMD();
});
