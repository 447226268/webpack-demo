import { add, miuns } from "./helper/math.js";
import helloWorld from "./helper/tools.js";
import imgsrc from "./assets/1-png.png";
import svgsrc from "./assets/1-svg.svg";
import txtsrc from "./assets/1-txt.txt";
import jpgsrc from "./assets/1-jpg.jpg";
import csvsrc from "./assets/1-csv.csv";
import xmlsrc from "./assets/1-xml.xml";

import "./style.css"; // 引入 CSS 文件
import "./style.less"; // 引入 LESS 文件

console.log(add(1, 2)); // 3
console.log(miuns(3, 2)); // 1

const img1 = document.createElement("img");
img1.src = imgsrc; // 使用导入的图片资源
document.body.appendChild(img1); // 将图片添加到页面中

const img2 = document.createElement("img");
img2.style.cssText = "width: 100px; height: 100px;"; // 设置图片宽度
img2.src = svgsrc; // 使用导入的图片资源
document.body.appendChild(img2); // 将图片添加到页面中

const div1 = document.createElement("div");
div1.style.cssText = "width: 200px; height: 200px; background-color: red; color: white; font-size: 20px; text-align: center;"; // 设置div样式
div1.classList.add("block-bg"); // 添加 CSS 类
div1.textContent = txtsrc; // 使用导入的文本资源
document.body.appendChild(div1); // 将文本添加到页面中

const img3 = document.createElement("img");
img3.src = jpgsrc; // 使用导入的图片资源
document.body.appendChild(img3); // 将图片添加到页面中

document.body.classList.add("hello"); // 添加 CSS 类

const span = document.createElement("span");
span.classList.add("icon"); // 添加 CSS 类
span.innerText = "ABCD"
document.body.appendChild(span); // 将文本添加到页面中

console.log(csvsrc); // 打印 CSV 文件路径
console.log(xmlsrc); // 打印 XML 文件路径

helloWorld();