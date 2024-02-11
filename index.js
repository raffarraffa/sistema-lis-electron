const { ipcRenderer } = require("electron");

let ordenes;
let minbtn;

window.onload = function () {
   ordenes = document.getElementById("ordenes");
   minbtn=document.getElementById("minBtn");
   minbtn.addEventListener("click", () => {
      console.log("ordenes");
      renderGetMinBtn();
      //ipcRenderer.invoke()
//      window.minimize();
   });
   renderGetOrdenes();
};
function renderGetMinBtn() {
   ipcRenderer.invoke("getMinBtn");

}
async function renderGetOrdenes() {
   await ipcRenderer.invoke("get");
}

ipcRenderer.on("ordenes", (event, results) => {
   let template = "";
   const list = results;
   list.forEach((element) => {
      console.log(element.nombre);
      template += `
         <tr>
            <td>${element.nombre}</td>
            <td>${element.apellido}</td>            
            <td>${element.email}</td>            
            <td>${element.observaciones}</td>            
            <td>${element.creado}</td>            
         </tr>
      `;
   });
   ordenes.innerHTML = template;

});