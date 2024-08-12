CREATE TABLE detalle(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idtrainer INT,
    idpokemon INT,
    FOREIGN KEY (idtrainer) REFERENCES trainer(id),
    FOREIGN KEY (idpokemon) REFERENCES pokemon(id)
);

INSERT INTO detalle (id, idtrainer, idpokemon) VALUES (1, 1, 1);
INSERT INTO detalle (id, idtrainer, idpokemon) VALUES (2, 1, 2);


SELECT 
    t.id AS trainer_id,
    t.nombre AS trainer_nombre,
    t.sexo AS trainer_sexo,
    t.edad AS trainer_edad,
    t.dob AS trainer_dob,
    p.id AS pokemon_id,
    p.nombre AS pokemon_nombre,
    p.tipo AS pokemon_tipo,
    p.apodo AS pokemon_apodo,
    p.sexo AS pokemon_sexo
FROM 
    detalle d
JOIN 
    trainer t ON d.idtrainer = t.id
JOIN 
    pokemon p ON d.idpokemon = p.id;
