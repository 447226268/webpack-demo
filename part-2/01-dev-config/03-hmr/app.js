import './style.css';
import './input.js';

const button = document.createElement('button');
button.innerText = 'Click me';
button.addEventListener('click', () => {
    const div = document.createElement('div');
    div.innerText = 'Hello, world!';
    div.classList.add("square");
    document.body.appendChild(div);
})

document.body.appendChild(button);

if (module.hot) {
    module.hot.accept('./input.js', () => {
        console.log('input.js module updated');
    });
}