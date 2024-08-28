CREATE TABLE pokemon(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    tipo VARCHAR(50),
    apodo VARCHAR(100),
    sexo INT
);

INSERT INTO pokemon (nombre, tipo, apodo, sexo) VALUES ('pikachu', 'electrico', 'pikapi', 0);
INSERT INTO pokemon (nombre, tipo, apodo, sexo) VALUES ('charmander', 'fuego', 'char', 1);

--FUNCIONES POSTGRES LANGUAGE PLPGSQL

--Get all pokemones
CREATE FUNCTION getPokemones()
RETURNS TABLE(
    id INT,
    nombre VARCHAR,
    tipo VARCHAR,
    apodo VARCHAR,
    sexo INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pokemon.id, 
        pokemon.nombre,
        pokemon.tipo,
        pokemon.apodo,
        pokemon.sexo
    FROM pokemon
    ORDER BY pokemon.id ASC;
END;
$$ LANGUAGE plpgsql;




--Get pokemon by id
CREATE FUNCTION getPokemonById(pokemon_id INT)
RETURNS TABLE(
    id INT,
    nombre VARCHAR,
    tipo VARCHAR,
    apodo VARCHAR,
    sexo INT
)
AS $$
BEGIN
    RETURN QUERY 
    SELECT pokemon.id, pokemon.nombre, pokemon.tipo, pokemon.apodo, pokemon.sexo
    FROM pokemon WHERE pokemon.id = pokemon_id;
END;
$$
LANGUAGE plpgsql;

--Post pokemon
CREATE FUNCTION createPokemon(p_pokemon JSON)
RETURNS VOID
AS $$
BEGIN
    INSERT INTO pokemon (nombre, tipo, apodo, sexo )
    VALUES (
        p_pokemon->>'nombre',
        p_pokemon->>'tipo',
        p_pokemon->>'apodo',
        (p_pokemon->>'sexo')::INT
    );
END;
$$ LANGUAGE plpgsql;

--Update pokemon
CREATE FUNCTION updatePokemon(pokemon_id INT, p_pokemon JSON)
RETURNS VOID
AS $$
BEGIN
    UPDATE pokemon SET 
    nombre = p_pokemon->>'nombre',
    tipo = p_pokemon->>'tipo',
    apodo = p_pokemon->>'apodo',
    sexo = (p_pokemon->>'sexo')::INT
    WHERE id = pokemon_id;
END;
$$
LANGUAGE plpgsql;

--DELETE pokemon
CREATE FUNCTION deletePokemon(pokemon_id INT)
RETURNS VOID
AS $$
BEGIN 
    DELETE FROM pokemon WHERE id = pokemon_id;
END;
$$
LANGUAGE plpgsql;

--Filtro dinamico:
CREATE FUNCTION getPokemonesFiltro(
    pokemon_nombre VARCHAR DEFAULT NULL,
    pokemon_tipo VARCHAR DEFAULT NULL,
    pokemon_apodo VARCHAR DEFAULT NULL,
    pokemon_sexo INT DEFAULT NULL
)
RETURNS TABLE(
    id INT,
    nombre VARCHAR,
    tipo VARCHAR,
    apodo VARCHAR,
    sexo INT
)
AS $$
BEGIN
    RETURN QUERY
    SELECT pokemon.id, pokemon.nombre, pokemon.tipo, pokemon.apodo, pokemon.sexo
    FROM pokemon
    WHERE (pokemon_nombre IS NULL OR pokemon.nombre ILIKE '%' || pokemon_nombre || '%')
      AND (pokemon_tipo IS NULL OR pokemon.tipo = pokemon_tipo)
      AND (pokemon_apodo IS NULL OR pokemon.apodo ILIKE '%' || pokemon_apodo || '%')
      AND (pokemon_sexo IS NULL OR pokemon.sexo = pokemon_sexo)
    ORDER BY pokemon.id ASC;
END;
$$
LANGUAGE plpgsql;


