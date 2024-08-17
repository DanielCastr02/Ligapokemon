CREATE TABLE registro(
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    idtrainer INT,
    idpokemon INT,
    estado INT,
    FOREIGN KEY (idtrainer) REFERENCES trainer(id),
    FOREIGN KEY (idpokemon) REFERENCES pokemon(id)
);


INSERT INTO registro (idtrainer, idpokemon, estado) VALUES (1, 1,0);
INSERT INTO registro (idtrainer, idpokemon, estado) VALUES (1, 2,0);

ALTER TABLE registro ADD COLUMN estado INT;


SELECT 
    r.id,
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
    registro r
JOIN 
    trainer t ON r.idtrainer = t.id
JOIN 
    pokemon p ON r.idpokemon = p.id
WHERE r.id = ?;


SELECT r.id,t.id AS trainer_id,t.nombre AS trainer_nombre,t.sexo AS trainer_sexo,t.edad AS trainer_edad,t.dob AS trainer_dob,p.id AS pokemon_id,p.nombre AS pokemon_nombre,p.tipo AS pokemon_tipo,p.apodo AS pokemon_apodo,p.sexo AS pokemon_sexo FROM registro r JOIN trainer t ON r.idtrainer = t.id JOIN pokemon p ON r.idpokemon = p.id WHERE r.id = ?;