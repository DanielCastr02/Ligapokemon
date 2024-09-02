import pool from "../pool.js";

export const getPokemon = (req, res) => {
    pool.query('SELECT * FROM getPokemones();', (error, results) => {
        if(error){
            console.error('Error getting pokemon:', error);
            res.status(500).send('Error getting pokemon');
        } else {
            console.log('Fetching pokemon...');
            res.status(201).json({message : 'pokemones fetched succesfully', pokemon: results.rows});
        }
    });
}

export const getPokemonById = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM getPokemonById($1);', [id], (error, results) => {
        if(error){
            console.error('Error getting pokemon:', error);
            res.status(500).send('Error getting pokemon');
        } else {
            console.log('Fetching pokemon...');
            res.status(201).json({message : 'Pokemon fetched succesfully', pokemon: results.rows});
        }
    });
}

export const createPokemon = (req, res) => {
    const pokemon = req.body;
    pool.query(
        'SELECT createPokemon($1::json);',
        [pokemon],
        (error) => {
        if(error){
            console.error('Error creating pokemon:', error);
            res.status(500).send('Error creating pokemon');
        } else {
            console.log('Creating pokemon...');
            res.status(201).json({message : 'Pokemon created succesfully', pokemon: pokemon});
        }
    });
}


export const updatePokemon = (req, res) => {
    const id = req.params.id;
    const pokemon = req.body;
    pool.query('SELECT updatePokemon($1, $2::json)', 
        [id, pokemon], 
        (error) => {
        if(error){
            console.error('Error updating pokemon:', error);
            res.status(500).send('Error updating pokemon');
        } else {
            console.log('Updating pokemon...');
            res.status(201).json({message : 'Pokemon updated succesfully', pokemon: pokemon});
        }
    });
}

export const deletePokemon = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT deletePokemon($1);', [id], (error) => {
        if(error){
            console.error('Error deleting pokemon:', error);
            res.status(500).send('Error deleting pokemon');
        } else {
            console.log('Deleting pokemon...');
            res.status(201).json({message : 'Pokemon deleted succesfully'});
        }
    });
}
export const getPokemonesFiltro = (req, res) => {
    const nombre = req.query.nombre === undefined ? null : req.query.nombre;
    const tipo = req.query.tipo === undefined ? null : req.query.tipo;
    const apodo = req.query.apodo === undefined ? null : req.query.apodo;
    const sexo = req.query.sexo === undefined ? null: Number(req.query.sexo);
    const limit = req.query.limit === undefined ? null : Number(req.query.limit);
    const offset = req.query.offset === undefined ? null : Number(req.query.offset);

    console.log({
        nombre: nombre,
        tipo: tipo,
        apodo: apodo,
        sexo: sexo,
        limit: limit,
        offset: offset
    })

    const query = `
        SELECT * FROM getPokemonesFiltro(
            $1::VARCHAR, 
            $2::VARCHAR, 
            $3::VARCHAR, 
            $4::INT,
            $5::INT,
            $6::INT
        );
    `;
    pool.query(
        query,
        [
            nombre ,
            tipo ,  
            apodo , 
            sexo ,  
            limit,
            offset
        ],
        (error, results) => {
            if (error) {
                console.error('Error getting pokemons details:', error);
                res.status(500).send('Error getting pokemon details');
            } else if (results.rows.length === 0) {
                res.status(404).json({ message: 'Pokemon details not found' });
            } else {
                res.status(200).json({ message: 'Pokemon details fetched successfully', pokemon: results.rows });
            }
        }
    );
};

export const getPokemonesPDF = (req, res) => {
    const nombre = req.query.nombre === undefined ? null : req.query.nombre;
    const tipo = req.query.tipo === undefined ? null : req.query.tipo;
    const apodo = req.query.apodo === undefined ? null : req.query.apodo;
    const sexo = req.query.sexo === undefined ? null: Number(req.query.sexo);
    console.log({
        nombre: nombre,
        tipo: tipo,
        apodo: apodo,
        sexo: sexo
    })

    const query = `
        SELECT * FROM getPokemonesPDF(
            $1::VARCHAR, 
            $2::VARCHAR, 
            $3::VARCHAR, 
            $4::INT
        );
    `;
    pool.query(
        query,
        [
            nombre ,
            tipo ,  
            apodo , 
            sexo ,  
        ],
        (error, results) => {
            if (error) {
                console.error('Error getting pokemons details:', error);
                res.status(500).send('Error getting pokemon details');
            } else if (results.rows.length === 0) {
                res.status(404).json({ message: 'Pokemon details not found' });
            } else {
                res.status(200).json({ message: 'Pokemon details fetched successfully', pokemon: results.rows });
            }
        }
    );
};