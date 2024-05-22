const knex = require('../knex');
const authUtils = require('../../utils/auth-utils');

class User {
  #passwordHash = null; // a private property

  constructor({ id, username, password_hash, email, first_name, last_name }) {
    this.id = id;
    this.username = username;
    this.#passwordHash = password_hash;
    this.email = email;
    this.firstName = first_name;
    this.lastName = last_name;
  }

  // This instance method takes in a plain-text password and returns true if it matches
  // the User instance's hashed password.
  isValidPassword = async (password) => (
    authUtils.isValidPassword(password, this.#passwordHash)
  );

  static async list() {
    const query = `SELECT * FROM users`;
    const { rows } = await knex.raw(query);
    // use the constructor to hide each user's passwordHash
    return rows.map((user) => new User(user));
  }

  static async find(id) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const { rows } = await knex.raw(query, [id]);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async findByUsername(username) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const { rows } = await knex.raw(query, [username]);
    const user = rows[0];
    return user ? new User(user) : null;
  }

  static async create(username, password, email, firstName, lastName) {
    // hash the plain-text password using bcrypt before storing it in the database
    const passwordHash = await authUtils.hashPassword(password);

    const query = `INSERT INTO users (username, password_hash, email, first_name, last_name, bio)
      VALUES (?, ?, ?, ?, ?, ?) RETURNING *`;
    const { rows } = await knex.raw(query, [username, passwordHash, email, firstName, lastName, '']);
    const user = rows[0];
    return new User(user);
  }

  // this is an instance method that we can use to update
  static async updateUserName(id, username) {
    const query = `
      UPDATE users
      SET username=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [username, id]);
    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  }

  static async updateEmail(id, email) {
    const query = `
      UPDATE users
      SET email=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [email, id]);
    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  }

  static async updateName(id, firstName, lastName) {
    const query = `
      UPDATE users
      SET first_name=?, last_name=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [firstName, lastName, id]);
    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  }

  static async updateBio(id, bio) {
    const query = `
      UPDATE users
      SET bio=?
      WHERE id=?
      RETURNING *
    `;
    const { rows } = await knex.raw(query, [bio, id]);
    const updatedUser = rows[0];
    return updatedUser ? new User(updatedUser) : null;
  }

  static async deleteAll() {
    return knex('users').del();
  }
}

module.exports = User;
