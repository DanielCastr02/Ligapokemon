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

export const getPokemonesByName = (req, res) => {
    const nombre = req.params.nombre;
    pool.query(
        'SELECT * FROM getPokemonesByName($1);',
        [nombre],
        (error, results) => {
            if (error) {
                console.error('Error getting pokemon details:', error);
                res.status(500).send('Error getting pokemon details');
            } else if (results.rows.length === 0) {
                res.status(404).json({ message: 'Pokemon details not found' });
            } else {
                console.log('Fetching pokemon details...');
                res.status(200).json({ message: 'Pokemon details fetched successfully', pokemon: results.rows });
            }
        }
    );
};

export const getPokemonesByType = (req, res) => {
    const tipo = req.params.tipo;
    pool.query(
        'SELECT * FROM getPokemonesByType($1);',
        [tipo],
        (error, results) => {
            if (error) {
                console.error('Error getting pokemon details:', error);
                res.status(500).send('Error getting pokemon details');
            } else if (results.rows.length === 0) {
                res.status(404).json({ message: 'Pokemon details not found' });
            } else {
                console.log('Fetching pokemon details...');
                res.status(200).json({ message: 'Pokemon details fetched successfully', pokemon: results.rows });
            }
        }
    );
};

export const getPokemonesByApodo = (req, res) => {
    const apodo = req.params.apodo;
    pool.query(
        'SELECT * FROM getPokemonesByApodo($1);',
        [apodo],
        (error, results) => {
            if (error) {
                console.error('Error getting pokemon details:', error);
                res.status(500).send('Error getting pokemon details');
            } else if (results.rows.length === 0) {
                res.status(404).json({ message: 'Pokemon details not found' });
            } else {
                console.log('Fetching pokemon details...');
                res.status(200).json({ message: 'Pokemon details fetched successfully', pokemon: results.rows });
            }
        }
    );
};

export const getPokemonesByGender = (req, res) => {
    const sexo = req.params.sexo;
    pool.query(
        'SELECT * FROM getPokemonesByGender($1);',
        [sexo],
        (error, results) => {
            if (error) {
                console.error('Error getting pokemon details:', error);
                res.status(500).send('Error getting pokemon details');
            } else if (results.rows.length === 0) {
                res.status(404).json({ message: 'Pokemon details not found' });
            } else {
                console.log('Fetching pokemon details...');
                res.status(200).json({ message: 'Pokemon details fetched successfully', pokemon: results.rows });
            }
        }
    );
};
