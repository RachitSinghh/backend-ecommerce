const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { name, email, password, phone } = req.body;
    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ msg: "Email already in use" });

    // const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password, phone });
    res.status(201).json({ token: generateToken(user) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    res.json({ token: generateToken(user) });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
