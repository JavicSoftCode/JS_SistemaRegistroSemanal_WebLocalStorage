// EDITAR_DATOS.js

const ID_TbodyAsist = document.getElementById('ID_TbodyAsist');

function BorrarFilaED(index) {
    localStorage.removeItem(`totalAcumulado_${index}`);
    for (const day of ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sabado']) {
        localStorage.removeItem(`checkboxState_${index}_${day}`);
    }

    ID_TbodyAsist.deleteRow(index);

    const KEY_Informacion_Almacenada = JSON.parse(localStorage.getItem('KEY_Informacion_Almacenada')) || [];
    KEY_Informacion_Almacenada.splice(index, 1);
    localStorage.setItem('KEY_Informacion_Almacenada', JSON.stringify(KEY_Informacion_Almacenada));

    for (let i = index; i < KEY_Informacion_Almacenada.length; i++) {
        localStorage.setItem(`totalAcumulado_${i}`, localStorage.getItem(`totalAcumulado_${i + 1}`));
        for (const day of ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']) {
            localStorage.setItem(`checkboxState_${i}_${day}`, localStorage.getItem(`checkboxState_${i + 1}_${day}`));
        }
    }
    localStorage.removeItem(`totalAcumulado_${KEY_Informacion_Almacenada.length}`);
}


function MostrarFormularioEdicionED(index) {
    const datos = JSON.parse(localStorage.getItem('KEY_Informacion_Almacenada'))[index];
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    const form = document.createElement('form');
    form.className = 'edit-form';
    form.innerHTML = `
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

        <h2 style="font-size: 75px; color: #001b84;">Editar Asistencia</h2>
        
        <label for="edit_ID_CI">&nbsp;<i class="fas fa-id-card"></i>&nbsp;Cédula</label>
        <input type="text" id="edit_ID_CI" value="${datos.KEY_CI}" placeholder="C.I 01223334444..." onclick="SeleccionarTextoED(this)" required>
        
        <label for="edit_ID_NameLastname">&nbsp;<i class="fas fa-user-tie"></i>&nbsp;Trabajador</label>
        <input type="text" id="edit_ID_NameLastname" value="${datos.KEY_NameLastname}" placeholder="Nombre && Apellido..." onclick="SeleccionarTextoED(this)" required>
        
        <label for="edit_ID_Area">&nbsp;<i class="fas fa-briefcase"></i>&nbsp;Area</label>
        <input type="text" id="edit_ID_Area" value="${datos.KEY_Area}" placeholder="Su desempeño..." onclick="SeleccionarTextoED(this)" required><br>
        
          <label for="edit_ID_ValorDia">&nbsp;<i class="fas fa-dollar-sign"></i>&nbsp;Valor del día</label>
        <input type="number" id="edit_ID_ValorDia" value="${datos.KEY_ValorDia}" placeholder="Dia $..." onclick="SeleccionarTextoED(this)" required>
         
       <label for="edit_ID_Cell">&nbsp;<i class="fas fa-mobile-alt"></i>&nbsp;Teléfono</label>
        <input type="text" id="edit_ID_Cell" value="${datos.KEY_Cell}" placeholder="+593 999999999... ✆" onclick="SeleccionarTextoED(this)" required>
        
        <button type="submit">Guardar</button>
        <button type="button" class="cancel-button">Cancelar</button>
    `;

    overlay.appendChild(form);
    document.body.appendChild(overlay);

    form.addEventListener('submit', event => {
        event.preventDefault();
        const edit_ID_CI = document.getElementById('edit_ID_CI').value;
        const edit_ID_NameLastname = document.getElementById("edit_ID_NameLastname").value;
        const edit_ID_Area = document.getElementById('edit_ID_Area').value;
        const edit_ID_ValorDia = parseInt(document.getElementById('edit_ID_ValorDia').value);
        const edit_ID_Cell = parseInt(document.getElementById('edit_ID_Cell').value);

        if (edit_ID_CI && edit_ID_NameLastname && edit_ID_Area && edit_ID_ValorDia && edit_ID_Cell) {
            const KEY_Informacion_Almacenada = JSON.parse(localStorage.getItem('KEY_Informacion_Almacenada'));
            KEY_Informacion_Almacenada[index] = {
                KEY_CI: edit_ID_CI,
                KEY_NameLastname: edit_ID_NameLastname,
                KEY_Area: edit_ID_Area,
                KEY_ValorDia: edit_ID_ValorDia,
                KEY_Cell: edit_ID_Cell,
            };
            localStorage.setItem('KEY_Informacion_Almacenada', JSON.stringify(KEY_Informacion_Almacenada));

            const newRow = ID_TbodyAsist.rows[index];
            newRow.cells[0].textContent = edit_ID_Area;
            newRow.cells[1].textContent = `$ ${edit_ID_ValorDia}`;
            document.body.removeChild(overlay);
        }
    });

    const cancelButton = form.querySelector('.cancel-button');
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(overlay);
    });
}

function SeleccionarTextoED(input) {
    input.select();
}

function CargarDatosED() {
    const KEY_Informacion_Almacenada = JSON.parse(localStorage.getItem('KEY_Informacion_Almacenada')) || [];
    KEY_Informacion_Almacenada.forEach((datos, index) => {
        const newRow = ID_TbodyAsist.insertRow();
        newRow.innerHTML = `
             <td style="font-size: 35px; color: blue; font-weight: bold; text-align:center; display: none">${datos.KEY_CI}</td>
            <td style="font-size: 35px; color: blue; font-weight: bold; text-align:center; display: none">${datos.KEY_NameLastname}</td>
            <td style="font-size: 35px; color: blue; font-weight: bold; text-align:center;">${datos.KEY_Area}</td>
            <td style="font-size: 35px; color: blue; font-weight: bold; text-align:center;">$ ${datos.KEY_ValorDia}</td>
            <td><label><input type="checkbox" name="dias" value="lunes"></label></td>
            <td><label><input type="checkbox" name="dias" value="martes"></label></td>
            <td><label><input type="checkbox" name="dias" value="miércoles"></label></td>
            <td><label><input type="checkbox" name="dias" value="jueves"></label></td>
            <td><label><input type="checkbox" name="dias" value="viernes"></label></td>
            <td><label><input type="checkbox" name="dias" value="sabado"></label></td>
            <td style="font-size: 35px; color: blue; font-weight: bold; text-align:center;"><p>$ <span class="total" >0</span></p></td>
            <td style="font-size: 35px;">
                <div class="btn">
                    <button id="rue-${index}" class="mtr_btn" type="button">⚙️</button>
                    <div class="buttons-container" id="buttons-container-${index}">
                        <button class="reset-button">Reiniciar</button>
                        <button class="delete-button">Borrar</button>
                        <button class="edit-button">Editar</button>
                        <button class="print-button">Imprimir</button>
                        <button class="close-button">❌</button>
                    </div>
                </div>
            </td>`;

        const rueButton = document.getElementById(`rue-${index}`);
        const resetButton = newRow.querySelector('.reset-button');
        const deleteButton = newRow.querySelector('.delete-button');
        const editButton = newRow.querySelector('.edit-button');
        const printButton = newRow.querySelector('.print-button');
        const closeButton = newRow.querySelector('.close-button');
        const checkboxes = newRow.querySelectorAll('input[type="checkbox"]');
        const totalElement = newRow.querySelector('.total');


        let totalAcumulado = 0;
        const storedTotal = parseInt(localStorage.getItem(`totalAcumulado_${index}`)) || 0;

        totalElement.textContent = totalAcumulado;

        checkboxes.forEach(checkbox => {
            checkbox.checked = JSON.parse(localStorage.getItem(`checkboxState_${index}_${checkbox.value}`)) || false;

            checkbox.addEventListener('change', () => {
                const valor = datos.KEY_ValorDia;
                if (checkbox.checked) {
                    totalAcumulado += valor;
                } else {
                    totalAcumulado -= valor;
                }
                totalElement.textContent = totalAcumulado;

                localStorage.setItem(`checkboxState_${index}_${checkbox.value}`, checkbox.checked);
                localStorage.setItem(`totalAcumulado_${index}`, totalAcumulado);
            });
        });

        resetButton.addEventListener('click', () => {
            checkboxes.forEach(checkbox => {
                checkbox.checked = false;
                localStorage.setItem(`checkboxState_${index}_${checkbox.value}`, false);
            });
            totalAcumulado = 0;
            totalElement.textContent = totalAcumulado;
            localStorage.setItem(`totalAcumulado_${index}`, totalAcumulado);
        });

        deleteButton.addEventListener('click', () => {
            BorrarFilaED(index);
        });

        editButton.addEventListener('click', () => {
            event.preventDefault();
            MostrarFormularioEdicionED(index);
        });


        rueButton.addEventListener('click', () => MostrarBtnsCrudED(index));
        closeButton.addEventListener('click', () => CerrarBtnsCrudED(index));

        function MostrarBtnsCrudED(index) {
            const buttonsContainer = document.getElementById(`buttons-container-${index}`);
            buttonsContainer.style.display = 'block';
        }

        function CerrarBtnsCrudED(index) {
            const buttonsContainer = document.getElementById(`buttons-container-${index}`);
            buttonsContainer.style.display = 'none';
        }

        printButton.addEventListener('click', () => {
            DescargarArchExelED(datos, totalAcumulado, checkboxes);
        });

        totalAcumulado = storedTotal;
        totalElement.textContent = totalAcumulado;
    });

    function DescargarArchExelED(data, totalAcumulado, checkboxes) {
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

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                fila.push(' ✅');
            } else {
                fila.push(' ❌');
            }
        });

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

    const rows = ID_TbodyAsist.getElementsByTagName("tr");
    let found = false;

    for (let i = 0; i < rows.length; i++) {
        const ci = rows[i].cells[0].textContent.toLowerCase(); // Suponiendo que la cédula está en la primera celda
        const nameLastname = rows[i].cells[1].textContent.toLowerCase(); // Suponiendo que el nombre y apellido están en la segunda celda

        if (ci.includes(InputBusquedad) || nameLastname.includes(InputBusquedad)) {
            rows[i].scrollIntoView({behavior: 'smooth', block: 'start'}); // Hace scroll hasta la fila encontrada
            setTimeout(() => {
                rows[i].classList.add("fila-encontrada"); // Agrega la clase para aplicar los estilos
                setTimeout(() => {
                    rows[i].classList.remove("fila-encontrada"); // Quita la clase después de un tiempo
                }, 7000); // Restablece los estilos después de 7 segundos (ajustar según lo que prefieras)
            }, 500); // Espera 0.5 segundos antes de resaltar la fila (ajustar según lo que prefieras)
            found = true;
        } else {
            rows[i].style.backgroundColor = ""; // Restablece el color de fondo de las filas que no coinciden
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
    CargarDatosED();
});
