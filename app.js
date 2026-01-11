const express = require("express");
const app = express();
const usuarios = require("./data");

//Funcion para sacar todos los usuarios
const mostrarTodos = (lista) => {
  return lista
    .map(
      (usuario) => `
    <div>
    <p>Nombre: ${usuario.name}</p>
    <p>Edad: ${usuario.age}</p>
    <p>Especialidad: ${usuario.specialty}</p>
    </div>
    `
    )
    .join("");
};

const mostrarPorEspecialidad = (lista, especialidad) => {
  return lista
    .filter((usuario) => usuario.specialty === especialidad)
    .map(
      (usuario) => `
     <div>
    <p>Nombre: ${usuario.name}</p>
    <p>Edad: ${usuario.age}</p>
    <p>Especialidad: ${usuario.specialty}</p>
    </div>
    `
    )
    .join("");
};

app.get("/", (req, res) => {
  const mostrarUsuarios = mostrarTodos(usuarios);
  res.send(
    '<h1>Página principal</h1> <a href="/developers">Developers</a> <a href="/marketing">Marketing</a> <a href="/ventas">Ventas</a> <a href="/QAs">QAs</a>' +
      `<h2>Todos los usuarios</h2> 
      ${mostrarUsuarios}
      `
  );
});

app.get("/developers", (req, res) => {
  const mostrarDevelopers = mostrarPorEspecialidad(usuarios, "developers");
  res.send(
    '<h1>Página de developers</h1> <a href="/">Volver</a>' +
      `<h2>Developers</h2> 
      ${mostrarDevelopers}`
  );
});

app.get("/marketing", (req, res) => {
  const mostrarMarketing = mostrarPorEspecialidad(usuarios, "marketing");
  res.send(
    '<h1>Página de marketing</h1> <a href="/">Volver</a>' +
      `<h2>Personal Marketing</h2> 
      ${mostrarMarketing}`
  );
});

app.get("/ventas", (req, res) => {
  const mostrarVentas = mostrarPorEspecialidad(usuarios, "ventas");
  res.send(
    '<h1>Página de ventas</h1> <a href="/">Volver</a>' +
      `<h2>Personal Ventas</h2> 
      ${mostrarVentas}`
  );
});

app.get("/QAs", (req, res) => {
  const mostrarQA = mostrarPorEspecialidad(usuarios, "QAs");
  res.send(
    '<h1>Página de QAs</h1> <a href="/">Volver</a>' +
      `<h2>Personal QAs</h2> 
      ${mostrarQA}`
  );
});

app.use((req, res) => {
  res.status(404).send('<h1>Página no encontrada</h1> <a href="/">Volver</a>');
});

app.listen(3000, () => {
  console.log("App.js está escuchando en el puerto 3000");
});
