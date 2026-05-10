-- Script para la creación de la base de datos y tablas - EVA 2
CREATE DATABASE IF NOT EXISTS eva2_db;
USE eva2_db;

-- 1. Tabla Estaciones de Clima
CREATE TABLE IF NOT EXISTS estaciones_clima (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_estacion VARCHAR(100) NOT NULL,
    latitud DECIMAL(10, 6),
    longitud DECIMAL(10, 6),
    altitud_metros DECIMAL(10, 2),
    ciudad VARCHAR(100),
    activa BOOLEAN DEFAULT TRUE
);

-- 2. Tabla Membresías de Gimnasio
CREATE TABLE IF NOT EXISTS membresias_gimnasio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    socio_nombre VARCHAR(100) NOT NULL,
    plan VARCHAR(50),
    fecha_inicio DATE,
    fecha_fin DATE,
    costo_mensual DECIMAL(10, 2),
    acceso_ilimitado BOOLEAN DEFAULT FALSE
);
