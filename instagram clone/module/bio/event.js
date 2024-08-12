import { addEntryToDb } from "../../database"

const addBioEventListener = () => {
    const editBioForm = document.querySelector(".edit-bio-form");
    /*const nameInput = document.querySelector("#name").value;
    const nameOutPut = document.querySelector(".name");
    */

    editBioForm.addEventListener("submit", () => {
    event.preventDefault();
        const bioName = document.querySelector("#bioName").value;
        const bioDescription = document.querySelectorAll("#bioDescription").value;
        const nameOutPut = document.querySelector(".name");
        console.log({bioName})

        nameOutPut.innerText = bioName;
        addEntryToDb("bio", { bioName, bioDescription });
    
});
}
