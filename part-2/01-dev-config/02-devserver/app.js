console.log("hello world");

fetch('/api/hello')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));