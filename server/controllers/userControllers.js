const { isAuthorized } = require('../utils/auth-utils');
const User = require('../db/models/User');

exports.createUser = async (req, res) => {
  const { username, password, email, firstName, lastName, bio = '' } = req.body;

  // TODO: check if username is taken, and if it is what should you return?
  const user = await User.create(username, password, email, firstName, lastName, bio);
  req.session.userId = user.id;

  res.send(user);
};

exports.listUsers = async (req, res) => {
  const users = await User.list();
  res.send(users);
};

exports.showUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.find(id);
  if (!user) return res.sendStatus(404);

  res.send(user);
};

exports.updateUser = async (req, res) => {
  const { username } = req.body;
  const { id } = req.params;
  if (!isAuthorized(id, req.session)) return res.sendStatus(403);

  const updatedUser = await User.updateUserName(id, username);
  if (!updatedUser) return res.sendStatus(404);
  res.send(updatedUser);
};
