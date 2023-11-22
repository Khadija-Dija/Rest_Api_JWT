const bcrypt = require("bcrypt");

async function hashPassword(password) {
  try {
    const hashedPassword = await bcrypt.hash(
      password,
      process.env.BCRYPT_SALT_ROUND
    ); // Utilisez le sel approprié
    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
}

module.exports = { hashPassword };
