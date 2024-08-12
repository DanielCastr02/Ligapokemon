import pool from "../pool.js";

export const getPokemon = (req, res) => {
    pool.query('SELECT * FROM pokemon;', (error, results) => {
        if(error){
            console.error('Error getting pokemon:', error);
            res.status(500).send('Error getting pokemon');
        } else {
            console.log('Fetching pokemon...');
            res.status(201).json({message : 'pokemones fetched succesfully', pokemon: results});
        }
    });
}

export const getPokemonById = (req, res) => {
    const id = req.params.id;
    pool.query('SELECT * FROM pokemon WHERE id = ?;', [id], (error, results) => {
        if(error){
            console.error('Error getting pokemon:', error);
            res.status(500).send('Error getting pokemon');
        } else {
            console.log('Fetching pokemon...');
            res.status(201).json({message : 'Pokemon fetched succesfully', pokemon: results});
        }
    });
}

export const createPokemon = (req, res) => {
    const pokemon = req.body;
    pool.query('INSERT INTO pokemon SET ?;', pokemon, (error) => {
        if(error){
            console.error('Error creating pokemon:', error);
            res.status(500).send('Error creating pokemon');
        } else {
            console.log('Creating pokemon...');
            res.status(201).json({message : 'Pokemon created succesfully', pokemon: pokemon});
        }
    });
}

export const deletePokemon = (req, res) => {
    const id = req.params.id;
    pool.query('DELETE FROM pokemon WHERE id = ?;', [id], (error) => {
        if(error){
            console.error('Error deleting pokemon:', error);
            res.status(500).send('Error deleting pokemon');
        } else {
            console.log('Deleting pokemon...');
            res.status(201).json({message : 'Pokemon deleted succesfully'});
        }
    });
}
