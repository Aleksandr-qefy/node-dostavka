const crypto = require('crypto');
module.exports = (sequelize, DataTypes,) => {
  const Courier = sequelize.define("Courier", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(256),
      allowNull: true,
      validate: {
        notEmpty: false,
      },
      get() {
        const rawValue = this.getDataValue('name');
        let mykey = crypto.createDecipher('aes256', 'mypassword');
        let mystr = mykey.update(rawValue, 'hex', 'utf8')
        mystr += mykey.final('utf8');
        return mystr;
      },
      set(value) {
        // Storing passwords in plaintext in the database is terrible.
        // Hashing the value with an appropriate cryptographic hash function is better.
        // Using the username as a salt is better.
        let mykey = crypto.createCipher('aes256', 'mypassword');
        let mystr = mykey.update(value, 'utf8', 'hex')
        mystr += mykey.final('hex');
        this.setDataValue('name', mystr );
      }
    },
    document: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    phone: {
      type: DataTypes.STRING(64),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      }
    },
    level: {
      type: DataTypes.INTEGER(3),
      allowNull: true,
      validate: {
        notEmpty: false,
      }
    },
    status: {
      type: DataTypes.STRING(32),
      allowNull: true,
      validate: {
        notEmpty: false,
      }
    },
    statusChangeTime: {
      type: DataTypes.STRING(32),
      allowNull: true,
      validate: {
        notEmpty: false,
      }
    },
    image: {
      type: DataTypes.BLOB('medium'),
      allowNull: true,
      validate: {
        notEmpty: false,
      }
    },
    settings: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: false,
      }
    },
    extrainfo: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: false,
      }
    },
  });

  return Courier;
}