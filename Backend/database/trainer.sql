CREATE TABLE trainer(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    sexo INT,
    nombre VARCHAR(100),
    edad INT,
    dob DATE
);

INSERT INTO trainer (sexo, nombre, edad, dob) VALUES (0, 'Ash', 10, '2000-05-22');
INSERT INTO trainer (sexo, nombre, edad, dob) VALUES (1, 'ahsa', 13, '2003-07-15');


UPDATE trainer SET sexo = ?, nombre = ?, edad = ?, dob = ? WHERE id = ?;
