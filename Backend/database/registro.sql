CREATE TABLE registro(
    id SERIAL PRIMARY KEY,
    idtrainer INT,
    idpokemon INT,
    estado INT DEFAULT 1,
    FOREIGN KEY (idtrainer) REFERENCES trainer(id),
    FOREIGN KEY (idpokemon) REFERENCES pokemon(id)
);


INSERT INTO registro (idtrainer, idpokemon, estado) VALUES (1, 1,0);
INSERT INTO registro (idtrainer, idpokemon) VALUES (1, 2);

ALTER TABLE registro ADD COLUMN estado INT;
ALTER TABLE registro MODIFY estado INT DEFAULT 1;


--Get all registros
CREATE FUNCTION getRegistros()
RETURNS TABLE(
    id INT,
    idtrainer INT,
    idpokemon INT,
    estado INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        registro.id,
        registro.idtrainer,
        registro.idpokemon,
        registro.estado
    FROM registro
    ORDER BY registro.id ASC;
END;
$$ LANGUAGE plpgsql;




--Get registro by id
CREATE FUNCTION getRegistroById(registro_id INT)
RETURNS TABLE(
    id INT,
    idtrainer INT,
    idpokemon INT,
    estado INT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT registro.id, registro.idtrainer, registro.idpokemon, registro.estado
    FROM registro WHERE registro.id = registro_id;
END;
$$
LANGUAGE plpgsql;

--Post registro
CREATE FUNCTION createRegistro(p_registro JSON)
RETURNS VOID
AS $$
BEGIN
    INSERT INTO registro (idtrainer, idpokemon )
    VALUES (
        (p_registro->>'idtrainer')::INT,
        (p_registro->>'idpokemon')::INT
    );
END;
$$ 
LANGUAGE plpgsql;

--Update registro
CREATE FUNCTION updateRegistro(registro_id INT, p_registro JSON)
RETURNS VOID
AS $$
BEGIN
    UPDATE registro SET 
    idtrainer = (p_registro->>'idtrainer')::INT,
    idpokemon = (p_registro->>'idpokemon')::INT,
    estado = (p_registro->>'estado')::INT
    WHERE id = registro_id;
END;
$$
LANGUAGE plpgsql;

--DELETE registro
CREATE FUNCTION deleteRegistro(registro_id INT)
RETURNS VOID
AS $$
BEGIN 
    DELETE FROM registro WHERE id = registro_id;
END;
$$
LANGUAGE plpgsql;

--GET detalle registro
CREATE FUNCTION getRegistroDetalle(registro_id INT)
RETURNS TABLE(
    id INT,
    trainer_id INT,
    trainer_sexo INT,
    trainer_nombre VARCHAR,
    trainer_edad INT,
    trainer_dob DATE,
    pokemon_id INT,
    pokemon_nombre VARCHAR,
    pokemon_tipo VARCHAR,
    pokemon_apodo VARCHAR,
    pokemon_sexo INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT r.id AS id, 
            t.id AS trainer_id, t.sexo AS trainer_sexo, t.nombre AS trainer_nombre, t.edad AS trainer_edad, t.dob AS trainer_dob,
            p.id AS pokemon_id, p.nombre AS pokemon_nombre, p.tipo AS pokemon_tipo, p.apodo AS pokemon_apodo, p.sexo AS pokemon_sexo 
    FROM registro r 
    JOIN trainer t ON r.idtrainer = t.id 
    JOIN pokemon p ON r.idpokemon = p.id 
    WHERE r.id = registro_id;
END;
$$
LANGUAGE plpgsql;

--GET registros de un trainer
CREATE FUNCTION getRegistrosByTrainerId(trainer_id INT)
RETURNS TABLE(
    id INT,
    idtrainer INT,
    idpokemon INT,
    estado INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT * FROM registro WHERE registro.idtrainer = trainer_id;
END;
$$
LANGUAGE plpgsql;

--DELETE registros de un trainer 
CREATE FUNCTION deleteRegistrosByTrainerId(trainer_id INT)
RETURNS VOID
AS $$
BEGIN
    DELETE FROM registro WHERE idtrainer = trainer_id;
END;
$$
LANGUAGE plpgsql;

--DELETE registros de un pokemon
CREATE FUNCTION deleteRegistrosByPokemonId(pokemon_id INT)
RETURNS VOID
AS $$
BEGIN
    DELETE FROM registro WHERE idpokemon = pokemon_id;
END;
$$
LANGUAGE plpgsql;