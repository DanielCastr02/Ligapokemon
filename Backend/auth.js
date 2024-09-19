import jwt from 'jsonwebtoken';

export const autorizar = (req, res, next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: 'No estas autorizado'});
    }
    const verificado = jwt.verify(token, 'llaveprivada');
    console.log(verificado.id);
    console.log(verificado.correo);
    next();
}

