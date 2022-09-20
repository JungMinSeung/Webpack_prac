import "./app.css"; // 얘를 가져오려면 css파일이 모듈이 되어야하는데 webpack의 css-loader가 css파일을 모듈로 만들어줌
import nyancat from "./nyancat.jpg";

document.addEventListener("DOMContentLoaded", () => {
  document.body.innerHTML = `
    <img src="${nyancat}" />
  `;
});

console.log(process.env.NODE_ENV);
console.log(TWO);
console.log(STRING_TWO);
console.log(api.domain);
