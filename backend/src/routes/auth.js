const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../middleware/auth');
const path = require('path');
const { ActiveToken } = require('../models/activeToken');

router.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});

router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Verificar si el usuario existe
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(404).json({ error: 'El usuario no existe' });
  }

  // Verificar si la contraseña es correcta
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ error: 'El usuario o la contraseña son incorrectos' });
  }

  // Verificar si ya existe un token activo para el usuario
  const existingActiveToken = await ActiveToken.findOne({ userId: user._id });
  if (existingActiveToken) {
    // Devolver el token activo existente
    return res.json({ token: existingActiveToken.token });
  }

  // Crear token de autenticación
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: 43200 });

  // Guardar token activo en la base de datos
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);
  const activeToken = new ActiveToken({ token, userId: user._id, expiresAt });
  await activeToken.save();

  // Enviar respuesta con token
  res.json({ token });
});


router.post('/api/logout', auth, async (req, res) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  try {
    await ActiveToken.deleteOne({ token });
    res.json({ message: 'Sesión cerrada exitosamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cerrar la sesión' });
  }
});

router.get('/api/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    res.json({ name: user.name, lastName: user.lastName });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al obtener el perfil del usuario' });
  }
});

router.post('/api/register', async (req, res) => {
  const { username, password, name, lastName } = req.body;

  // Verificar si el usuario ya existe
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(409).json({ error: 'El usuario ya existe' });
  }

  // Hash de la contraseña
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Crear el usuario
  const user = new User({ username, password: hashedPassword, name, lastName });
  try {
    await user.save();
    res.status(201).json({ message: 'El usuario se ha registrado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error al registrar el usuario' });
  }
});

module.exports = router;