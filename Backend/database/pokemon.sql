CREATE TABLE pokemon(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    tipo VARCHAR(50),
    apodo VARCHAR(100),
    sexo INT
);

INSERT INTO pokemon (nombre, tipo, apodo, sexo) VALUES ('pikachu', 'electrico', 'PIKA', 0);
INSERT INTO pokemon (nombre, tipo, apodo, sexo) VALUES ('charmander', 'fuego', 'char', 1);