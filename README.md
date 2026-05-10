

Este proyecto es una API RESTful desarrollada para la asignatura, que gestiona dos entidades independientes: **Estaciones de Clima** y **Membresías de Gimnasio**.

* **Backend:** Node.js con Express.
* **Base de Datos:** MySQL (mysql2/promise).
* **Pruebas:** Postman.

El código sigue una arquitectura ordenada por capas:
 `/controllers`: Contiene la lógica de negocio y las consultas SQL a la base de datos.
 `/routes`: Define los endpoints (URLs) de la API.
 `db.js`: Configura el pool de conexiones a MySQL.
 `app.js`: Archivo principal que levanta el servidor Express.
