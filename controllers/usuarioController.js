import Usuario from "../models/Usuario.js";
import generarJWT from "../helpers/generarJWT.js";

const registrar = async (req, res) => {
  //Evitar duplicados
  const { username } = req.body;
  const existeUsuario = await Usuario.findOne({ username });

  if (existeUsuario) {
    return res.status(400).json({ msg: "El usuario ya existe" });
  }

  try {
    const usuario = new Usuario(req.body);
    const usuarioAlamacenado = await usuario.save();
    return res.json({ msg: "Usuario Registrado" });
  } catch (error) {
   
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

const autenticar = async (req, res) => {
  const { username, password } = req.body;

  //Comprobar si el usuario existe
  const usuario = await Usuario.findOne({ username });
  if (!usuario) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  //comprobar password

  if (await usuario.compararPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      username: usuario.username,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("Password incorrecto");
    return res.status(400).json({ msg: error.message });
  }
};

const perfil = async (req, res) => {
  try {
    const { usuario } = req;

    if (!usuario) {
      // Manejar caso en el que el usuario no está autenticado
      return res.status(401).json({ msg: "Usuario no autenticado" });
      return;
    }

    res.json(usuario);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error en el servidor" });
  }
};

export { registrar, autenticar, perfil };
