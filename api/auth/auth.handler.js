const bcrypt = require("bcrypt");
const UserModel = require("../../models/UserModel");

async function login(incomingUser) {
  let savedUser = await UserModel.findOne({ email: incomingUser.email });
  if (!savedUser) return null;
  savedUser = savedUser.toObject();
  const passwordMatch = await comparePasswords(
    incomingUser.password,
    savedUser.password
  );
  if (!passwordMatch) return null;
  delete savedUser.password;
  return savedUser;
}

async function comparePasswords(incomingPassword, savedUser) {
  const passwordMatch = await bcrypt.compare(incomingPassword, savedUser);
  return passwordMatch;
}

async function hashPassword(password) {
  const saltRounds = 10;
  const hash = await bcrypt.hash(password, saltRounds);
  return hash;
}

module.exports = {
  login,
};
