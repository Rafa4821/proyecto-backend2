import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

// Registrar un nuevo usuario
export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;

    // Verificar si el usuario ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Usuario ya registrado" });
    }

    // Crear un nuevo usuario
    const user = await User.create({
      first_name,
      last_name,
      email,
      age,
      password,
    });

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        age: user.age,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error al registrar usuario", error });
  }
};

// Iniciar sesión del usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Generar un token JWT
    const token = generateToken(user);

    res.status(200).json({
      message: "Inicio de sesión exitoso",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al iniciar sesión", error });
  }
};

// Obtener datos del usuario autenticado
export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      _id: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
      role: user.role,
    });
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};
