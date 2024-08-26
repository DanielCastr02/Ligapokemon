CREATE TABLE trainer (
    id SERIAL PRIMARY KEY,
    sexo INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    edad INT,
    dob DATE,
    estado INT DEFAULT 0
);

INSERT INTO trainer (sexo, nombre, edad, dob,estado) VALUES (0, 'Ash', 10, '2000-05-22',1);
INSERT INTO trainer (sexo, nombre, edad, dob,estado) VALUES (1, 'maria', 13, '2003-07-15',1);

ALTER TABLE trainer ADD COLUMN estado INT;
ALTER TABLE trainer MODIFY estado INT DEFAULT 0;
ALTER TABLE trainer MODIFY sexo INT NOT NULL;
ALTER TABLE trainer MODIFY nombre VARCHAR(100) NOT NULL;


--FUNCIONES POSTGRES LANGUAGE PLPGSQL

--Get all trainers
CREATE FUNCTION getTrainers()
RETURNS TABLE(
    id INT,
    sexo INT,
    nombre VARCHAR,
    edad INT,
    dob DATE,
    estado INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        trainer.id, 
        trainer.sexo, 
        trainer.nombre, 
        trainer.edad, 
        trainer.dob, 
        trainer.estado
    FROM trainer
    ORDER BY trainer.id ASC;
END;
$$ LANGUAGE plpgsql;




--Get trainer by id
CREATE FUNCTION getTrainerById(trainer_id INT)
RETURNS TABLE(
    id INT,
    sexo INT,
    nombre VARCHAR,
    edad INT,
    dob DATE,
    estado INT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT trainer.id, trainer.sexo, trainer.nombre, trainer.edad, trainer.dob, trainer.estado 
    FROM trainer WHERE trainer.id = trainer_id;
END;
$$
LANGUAGE plpgsql;

--Post trainer
CREATE FUNCTION createTrainer(p_trainer JSON)
RETURNS VOID
AS $$
BEGIN
    INSERT INTO trainer (sexo, nombre, edad, dob)
    VALUES (
        (p_trainer->>'sexo')::INT,
        p_trainer->>'nombre',
        (p_trainer->>'edad')::INT,
        (p_trainer->>'dob')::DATE
    );
END;
$$ LANGUAGE plpgsql;

--Update Trainer
CREATE FUNCTION updateTrainer(trainer_id INT, p_trainer JSON)
RETURNS VOID
AS $$
BEGIN
    UPDATE trainer 
    SET sexo = (p_trainer->>'sexo')::INT, 
    nombre = p_trainer->>'nombre', 
    edad = (p_trainer->>'edad')::INT, 
    dob = (p_trainer->>'dob')::DATE, 
    estado = (p_trainer->>'estado')::INT  
    WHERE id = trainer_id;
END;
$$
LANGUAGE plpgsql;

--DELETE trainer
CREATE FUNCTION deleteTrainer(trainer_id INT)
RETURNS VOID
AS $$
BEGIN 
    DELETE FROM trainer WHERE id = trainer_id;
END;
$$
LANGUAGE plpgsql;

--Get Trainer detalle
CREATE FUNCTION getTrainerDetalle(p_trainer_id INT)
RETURNS TABLE (
    trainer_id INT,
    trainer_nombre VARCHAR,
    pokemon_id INT,
    pokemon_nombre VARCHAR,
    pokemon_tipo VARCHAR,
    pokemon_apodo VARCHAR,
    pokemon_sexo INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT
           t.id AS trainer_id, 
           t.nombre AS trainer_nombre, 
           p.id AS pokemon_id, 
           p.nombre AS pokemon_nombre, 
           p.tipo AS pokemon_tipo, 
           p.apodo AS pokemon_apodo, 
           p.sexo AS pokemon_sexo
    FROM registro r
    JOIN trainer t ON r.idtrainer = t.id
    JOIN pokemon p ON r.idpokemon = p.id
    WHERE t.id = p_trainer_id;
END;
$$
LANGUAGE plpgsql;

--FILTROS
CREATE FUNCTION getTrainersByGender(trainer_sexo INT)
RETURNS TABLE(
    id INT,
    sexo INT,
    nombre VARCHAR,
    edad INT,
    dob DATE,
    estado INT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT trainer.id, trainer.sexo, trainer.nombre, trainer.edad, trainer.dob, trainer.estado 
    FROM trainer WHERE trainer.sexo = trainer_sexo
    ORDER BY trainer.id ASC;
END;
$$
LANGUAGE plpgsql;

CREATE FUNCTION getTrainerByName(trainer_nombre VARCHAR)
RETURNS TABLE(
    id INT,
    sexo INT,
    nombre VARCHAR,
    edad INT,
    dob DATE,
    estado INT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT trainer.id, trainer.sexo, trainer.nombre, trainer.edad, trainer.dob, trainer.estado 
    FROM trainer WHERE trainer.nombre like '%' || trainer_nombre || '%'
    ORDER BY trainer.id ASC;
END;
$$
LANGUAGE plpgsql;

CREATE FUNCTION getTrainerByAge(trainer_edad INT)
RETURNS TABLE(
    id INT,
    sexo INT,
    nombre VARCHAR,
    edad INT,
    dob DATE,
    estado INT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT trainer.id, trainer.sexo, trainer.nombre, trainer.edad, trainer.dob, trainer.estado 
    FROM trainer WHERE trainer.edad = trainer_edad
    ORDER BY trainer.id ASC;
END;
$$
LANGUAGE plpgsql;


