import bio from "./module/bio/bio.js";
import gallery from "./module/gallery/gallery.js";
import nav from "./module/nav/Nav.js";
import { request, addEntryToDb, getEntryFromDb } from "./database.js";

const app = () => {
  return `
        ${nav()}
        ${bio()}
        <hr/> 
        ${gallery()}
         
   
    `;
};
document.getElementById("root").innerHTML = app();
request.onsuccess = () => {
  addEntryToDb("bio", { name: "jane butters", description: `hey am jane` });
  getEntryFromDb("bio");
};

const editBioForm = document.querySelector(".edit-bio-form");
const nameInput = document.querySelector("#name").value;
const nameOutPut = document.querySelector(".name");
editBioForm.addEventListener("submit", () => {
  event.preventDefault();
  const nameInput = document.querySelector("#name").value;
  const nameOutPut = document.querySelector(".name");

  nameOutPut.innerText = nameInput;
});


const PhotoInput = document.querySelector("#photoInput");
PhotoInput.addEventListener("change", () => {
  console.log(PhotoInput.value);
});
