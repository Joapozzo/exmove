-- Crear la base de datos 'exmove' si no existe
CREATE DATABASE exmove;

-- Conectar a la base de datos 'exmove'
\c exmove;

-- Crear la tabla 'productos'
CREATE TABLE peliculas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    duracion NUMBER,
    categoria VARCHAR(50),
    disponibilidad BOOLEAN DEFAULT TRUE,
    imagen VARCHAR(255)
);

-- Insertar películas en la tabla 'peliculas'
INSERT INTO peliculas (nombre, descripcion, duracion, categoria, disponibilidad, imagen)
VALUES 
    ('Avengers-Endgame', 'Los Vengadores se reúnen para derrotar a Thanos.', 180, 'ACCION', TRUE, './src/imgs/portada-avengers.jpg'),
    ('It', 'Un grupo de niños enfrenta sus peores miedos.', 135, 'TERROR', TRUE, './src/imgs/portada-it.jpg'),
    ('Jumanji', 'Un grupo de amigos se adentra en un videojuego peligroso.', 119, 'COMEDIA', TRUE, './src/imgs/portada-jumanji.jpg'),
    ('Inception', 'Un ladrón que roba secretos a través de los sueños.', 148, 'SUSPENSO', TRUE, './src/imgs/portada-inception.jpg'),
    ('Parasite', 'Una familia pobre se infiltra en una familia rica.', 132, 'SUSPENSO', TRUE, './src/imgs/portada-parasite.jpg'),
    ('John Wick', 'Un ex-asesino busca venganza por la muerte de su perro.', 101, 'ACCION', TRUE, './src/imgs/portada-john.jpg'),
    ('The Conjuring', 'Investigadores paranormales ayudan a una familia aterrorizada.', 112, 'TERROR', TRUE, './src/imgs/portada-conjuro.jpg'),
    ('Superbad', 'Dos adolescentes intentan conseguir alcohol para una fiesta.', 113, 'COMEDIA', TRUE, './src/imgs/portada-superbad.jpg'),
    ('Gone Girl', 'Una mujer desaparece y su esposo es el principal sospechoso.', 149, 'SUSPENSO', TRUE, './src/imgs/portada-gonegirl.jpg'),
    ('Mad Max: Fury Road', 'En un mundo postapocalíptico, luchan por la supervivencia.', 120, 'ACCION', TRUE, './src/imgs/portada-mad.jpg'),
    ('Hereditary', 'Una familia es acechada por eventos sobrenaturales.', 127, 'TERROR', TRUE, './src/imgs/portada-hereditary.jpg'),
    ('The Hangover', 'Tres amigos despiertan sin recordar la noche anterior.', 100, 'COMEDIA', TRUE, './src/imgs/portada-hangover.jpg'),
    ('Se7en', 'Dos detectives buscan a un asesino que usa los siete pecados capitales.', 127, 'SUSPENSO', TRUE, './src/imgs/portada-se7en.jpg');


