import { getScrapping } from "../scrapper.js";

document.addEventListener('DOMContentLoaded', () => {
    const scrappingResult = getScrapping();
    console.log(scrappingResult);
})