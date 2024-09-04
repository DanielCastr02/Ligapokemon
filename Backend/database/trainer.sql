CREATE TABLE trainer (
    id SERIAL PRIMARY KEY,
    sexo INT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    edad INT,
    dob DATE,
    estado INT DEFAULT 0,
    email VARCHAR(100) DEFAULT 'werox115@gmail.com',
);

ALTER TABLE trainer ADD COLUMN estado INT;
ALTER TABLE trainer ALTER estado INT DEFAULT 0;
ALTER TABLE trainer ALTER sexo INT NOT NULL;
ALTER TABLE trainer ALTER nombre VARCHAR(100) NOT NULL;
ALTER TABLE trainer ADD COLUMN email VARCHAR(100)  DEFAULT 'werox115@gmail.com';

--FUNCIONES POSTGRES LANGUAGE PLPGSQL

--Get all trainers
CREATE FUNCTION getTrainers()
RETURNS TABLE(
    id INT,
    sexo INT,
    nombre VARCHAR,
    edad INT,
    dob DATE,
    estado INT,
    email VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        trainer.id, 
        trainer.sexo, 
        trainer.nombre, 
        trainer.edad, 
        trainer.dob, 
        trainer.estado,
        trainer.email
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
    estado INT,
    email VARCHAR
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT 
    trainer.id, 
    trainer.sexo, 
    trainer.nombre, 
    trainer.edad, 
    trainer.dob, 
    trainer.estado, 
    trainer.email
    FROM trainer WHERE trainer.id = trainer_id;
END;
$$
LANGUAGE plpgsql;

--Post trainer
CREATE FUNCTION createTrainer(p_trainer JSON)
RETURNS VOID
AS $$
BEGIN
    INSERT INTO trainer (sexo, nombre, edad, dob, email)
    VALUES (
        (p_trainer->>'sexo')::INT,
        p_trainer->>'nombre',
        (p_trainer->>'edad')::INT,
        (p_trainer->>'dob')::DATE,
        p_trainer->>'email'
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
    estado = (p_trainer->>'estado')::INT,
    email = p_trainer->>'email'  
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




--Get Trainer Filtro
CREATE FUNCTION getTrainersFiltro(
    trainer_sexo INT DEFAULT NULL,
    trainer_nombre VARCHAR DEFAULT NULL,
    trainer_edad INT DEFAULT NULL,
    trainer_dobInicio DATE DEFAULT NULL,
    trainer_dobFin DATE DEFAULT NULL,
    trainer_estado INT DEFAULT NULL,
    trainer_email VARCHAR DEFAULT NULL,
    trainer_limit INT DEFAULT NULL,
    trainer_offset INT DEFAULT NULL
)
RETURNS TABLE(
    id INT,
    sexo INT,
    nombre VARCHAR,
    edad INT,
    dob DATE,
    estado INT,
    email VARCHAR,
    total_count BIGINT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        trainer.id, 
        trainer.sexo, 
        trainer.nombre, 
        trainer.edad, 
        trainer.dob, 
        trainer.estado,
        trainer.email,
        (SELECT COUNT(*) 
         FROM trainer t
         WHERE (trainer_sexo IS NULL OR t.sexo = trainer_sexo)
           AND (trainer_nombre IS NULL OR t.nombre ILIKE '%' || trainer_nombre || '%')
           AND (trainer_edad IS NULL OR t.edad = trainer_edad)
           AND (trainer_dobInicio IS NULL OR t.dob BETWEEN trainer_dobInicio AND trainer_dobFin)
           AND (trainer_estado IS NULL OR t.estado = trainer_estado)
           AND (trainer_email IS NULL OR t.email ILIKE '%' || trainer_email || '%')
        ) AS total_count
    FROM trainer
    WHERE (trainer_sexo IS NULL OR trainer.sexo = trainer_sexo)
      AND (trainer_nombre IS NULL OR trainer.nombre ILIKE '%' || trainer_nombre || '%')
      AND (trainer_edad IS NULL OR trainer.edad = trainer_edad)
      AND (trainer_dobInicio IS NULL OR trainer.dob BETWEEN trainer_dobInicio AND trainer_dobFin)
      AND (trainer_estado IS NULL OR trainer.estado = trainer_estado)
      AND (trainer_email IS NULL OR trainer.email ILIKE '%' || trainer_email || '%')
    ORDER BY trainer.id ASC
    LIMIT trainer_limit OFFSET trainer_offset;
END;
$$
LANGUAGE plpgsql;

--funcion para pdf
CREATE FUNCTION getTrainersPDF(
    trainer_sexo INT DEFAULT NULL,
    trainer_nombre VARCHAR DEFAULT NULL,
    trainer_edad INT DEFAULT NULL,
    trainer_dobInicio DATE DEFAULT NULL,
    trainer_dobFin DATE DEFAULT NULL,
    trainer_estado INT DEFAULT NULL,
    trainer_email VARCHAR DEFAULT NULL
)
RETURNS TABLE(
    id INT,
    sexo INT,
    nombre VARCHAR,
    edad INT,
    dob DATE,
    estado INT,
    email VARCHAR,
    total_count BIGINT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        trainer.id, 
        trainer.sexo, 
        trainer.nombre, 
        trainer.edad, 
        trainer.dob, 
        trainer.estado,
        trainer.email,
        (SELECT COUNT(*) 
         FROM trainer t
         WHERE (trainer_sexo IS NULL OR t.sexo = trainer_sexo)
           AND (trainer_nombre IS NULL OR t.nombre ILIKE '%' || trainer_nombre || '%')
           AND (trainer_edad IS NULL OR t.edad = trainer_edad)
           AND (trainer_dobInicio IS NULL OR t.dob BETWEEN trainer_dobInicio AND trainer_dobFin)
           AND (trainer_estado IS NULL OR t.estado = trainer_estado)
           AND (trainer_email IS NULL OR t.email ILIKE '%' || trainer_email || '%')
        ) AS total_count
    FROM trainer
    WHERE (trainer_sexo IS NULL OR trainer.sexo = trainer_sexo)
      AND (trainer_nombre IS NULL OR trainer.nombre ILIKE '%' || trainer_nombre || '%')
      AND (trainer_edad IS NULL OR trainer.edad = trainer_edad)
      AND (trainer_dobInicio IS NULL OR trainer.dob BETWEEN trainer_dobInicio AND trainer_dobFin)
      AND (trainer_estado IS NULL OR trainer.estado = trainer_estado)
      AND (trainer_email IS NULL OR trainer.email ILIKE '%' || trainer_email || '%')
    ORDER BY trainer.id ASC;
END;
$$
LANGUAGE plpgsql;

