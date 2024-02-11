const { ipcRenderer } = require("electron");

let ordenes;
let minbtn;

window.onload = function () {
   ordenes = document.getElementById("ordenes");
   minbtn=document.getElementById("minBtn");
   minbtn.addEventListener("click", () => {
      console.log("minbtn");
      renderGetMinBtn();      
   });
   maxbtn=document.getElementById("maxBtn");
   maxbtn.addEventListener("click", () => {
      console.log("masxbtn");
      renderGetMaxBtn();      
   });
   closebtn=document.getElementById("closeBtn");
   closebtn.addEventListener("click", () => {
      console.log("closebtn");
      renderGetCloseBtn();      
   });
   renderGetOrdenes();
};
// invocaicon electron (puente)
function renderGetMinBtn() {
   ipcRenderer.invoke("getMinBtn");

}
function renderGetMaxBtn() {
   ipcRenderer.invoke("getMaxBtn");

}
function renderGetCloseBtn() {
   ipcRenderer.invoke("getCloseBtn");

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