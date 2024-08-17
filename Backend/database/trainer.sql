CREATE TABLE trainer(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sexo INT,
    nombre VARCHAR(100),
    edad INT,
    dob DATE,
    estado INT
);

INSERT INTO trainer (sexo, nombre, edad, dob,estado) VALUES (0, 'Ash', 10, '2000-05-22',1);
INSERT INTO trainer (sexo, nombre, edad, dob,estado) VALUES (1, 'maria', 13, '2003-07-15',1);

ALTER TABLE trainer ADD COLUMN estado INT;


UPDATE trainer SET sexo = ?, nombre = ?, edad = ?, dob = ? WHERE id = ?;
