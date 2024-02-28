// GUARDAR_DATOS.js

const notificacionDiv = document.createElement("div");
notificacionDiv.classList.add("notificacion");
document.body.appendChild(notificacionDiv);

const btn_ID_Btn_GuardarInformacion = document.getElementById("ID_Btn_GuardarInformacion");
btn_ID_Btn_GuardarInformacion.addEventListener('click', (event) => {
    event.preventDefault();
    InformacionAlmacenada();
    Notificacion();
    LimpiarInputs();
    document.getElementById("ID_Area").focus();
});

function InformacionAlmacenada() {
    const ID_CI = document.getElementById("ID_CI").value;
    const ID_NameLastname = document.getElementById("ID_NameLastname").value;
    const ID_Area = document.getElementById("ID_Area").value;
    const ID_ValorDia = parseInt(document.getElementById("ID_ValorDia").value);
    const ID_Cell = document.getElementById("ID_Cell").value;

    if (ID_CI && ID_NameLastname && ID_Area && ID_ValorDia && ID_Cell) {
        const KEY_Informacion_Almacenada = JSON.parse(localStorage.getItem('KEY_Informacion_Almacenada')) || [];
        KEY_Informacion_Almacenada.push({
            KEY_CI: ID_CI,
            KEY_NameLastname: ID_NameLastname,
            KEY_Area: ID_Area,
            KEY_ValorDia: ID_ValorDia,
            KEY_Cell: ID_Cell,
        });
        localStorage.setItem('KEY_Informacion_Almacenada', JSON.stringify(KEY_Informacion_Almacenada));
    }
}

function Notificacion() {
    const notificacion = document.querySelector(".notificacion");
    const camposRellenados = Inputs_Inf();

    notificacion.textContent = camposRellenados ? "DATOS GUARDADOS✅" : "AGREGAR DATOS⚠️";

    notificacion.style.opacity = "1";
    setTimeout(() => {
        notificacion.style.opacity = "0";
    }, 3000);
}

function Inputs_Inf() {
    const campos = [
        "ID_CI",
        "ID_NameLastname",
        "ID_Area",
        "ID_ValorDia",
        "ID_Cell",
    ];

    return campos.every(campoId => {
        const campoValue = document.getElementById(campoId)?.value?.trim() || '';
        return campoValue !== "";
    });
}

function LimpiarInputs() {
    const inputIds = [
        "ID_CI",
        "ID_NameLastname",
        "ID_Area",
        "ID_ValorDia",
        "ID_Cell",
    ];

    inputIds.forEach((id) => {
        const inputElement = document.getElementById(id);
        if (inputElement) {
            inputElement.value = "";
        }
    });
}