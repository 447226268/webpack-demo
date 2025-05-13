import * as style from "./app.css";
console.log(style);

const div = document.createElement("div");
div.innerHTML = "Hello World";
div.classList.add(style.box);
document.body.appendChild(div);