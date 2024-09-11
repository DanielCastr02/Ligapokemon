CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    correo TEXT NOT NULL,
    contraseña TEXT NOT NULL,
    rol INT NOT NULL
);
--FUNCIONES POSTGRES LANGUAGE PLPGSQL

--Get all Usuarios
CREATE FUNCTION getUsuarios()
RETURNS TABLE(
    id INT,
    correo TEXT,
    contraseña TEXT,
    rol INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        usuario.id,
        usuario.correo, 
        usuario.contraseña,
        usuario.rol
    FROM usuario
    ORDER BY usuario.id ASC;
END;
$$ LANGUAGE plpgsql;

--Get Usuario by id
CREATE FUNCTION getUsuarioById(usuario_id INT)
RETURNS TABLE(
    id INT,
    correo TEXT,
    contraseña TEXT,
    rol INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        usuario.id,
        usuario.correo, 
        usuario.contraseña,
        usuario.rol
    FROM usuario
    WHERE usuario.id = usuario_id
    ORDER BY usuario.id ASC;
END;
$$ LANGUAGE plpgsql;

--Post usuario
CREATE FUNCTION createUsuario(p_usuario JSON)
RETURNS VOID
AS $$
BEGIN
    INSERT INTO usuario (correo, contraseña, rol)
    VALUES (
        (p_usuario->>'correo')::TEXT,
        (p_usuario->>'contraseña')::TEXT,
        (p_usuario->>'rol')::INT
    );
END;
$$ LANGUAGE plpgsql;

--update usuario
CREATE FUNCTION updateUsuario(usuario_id INT, p_usuario JSON)
RETURNS VOID
AS $$
BEGIN
    UPDATE usuario
    SET
    correo = (p_usuario->>'correo')::TEXT, 
    contraseña = (p_usuario->>'contraseña')::TEXT, 
    rol = (p_usuario->>'rol')::INT
    WHERE id = usuario_id;
END;
$$ LANGUAGE plpgsql;

--delete usuario
CREATE FUNCTION deleteUsuario(usuario_id INT)
RETURNS VOID
AS $$
BEGIN
    DELETE FROM usuario
    WHERE id = usuario_id;
END;
$$ LANGUAGE plpgsql;

--Get Usuario by correo
CREATE FUNCTION getInicioSesion(correo TEXT)
RETURNS TABLE(
    id INT,
    correo TEXT,
    contraseña TEXT,
    rol INT
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        usuario.id,
        usuario.correo, 
        usuario.contraseña,
        usuario.rol
    FROM usuario
    WHERE usuario.correo = correo
    ORDER BY usuario.id ASC;
END;