const { Courier, refreshToken: RefreshToken } = require("../models");
const config = require("../config/jwt.config");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
// ...

exports.signin = (req, res) => {
  Courier.findOne({
    where: {
      phone: req.body.phone
    }
  })
    .then(async (courier) => {
      if (!courier) {
        return res.status(404).send({
          message: "no courier with this phone",
          error: "no courier with this phone"
        });
      }
      //console.log(courier.toJSON())

      const passwordIsValid = await bcrypt.compare(req.body.document, courier.document);
      //console.log(passwordIsValid)
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "invalid data",//"Invalid Password!"
          error: "invalid document"
        });
      }

      const token = jwt.sign({ id: courier.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });

      let refreshToken = await RefreshToken.createToken(courier);
      console.log(refreshToken)

      /*let authorities = [];
      courier.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }

        res.status(200).send({
          id: courier.id,
          username: courier.username,
          email: courier.email,
          roles: authorities,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });*/
      res.status(200).send({
        status: 'success',
        phone: courier.phone,
        name: courier.name,
        accessToken: token,
        refreshToken: refreshToken,
      });
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
        error: err.message,
      });
      throw err
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;

  if (requestToken == null) {
    return res.status(403).json({
      message: "refreshToken is required",
      error: "refreshToken is required"
    });
  }

  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });

    console.log(refreshToken)

    if (!refreshToken) {
      res.status(403).json({
        message: "Refresh token is not in database!",
        error: "no refreshToken in database"
      });
      return;
    }

    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });

      res.status(403).json({
        message: "Refresh token was expired. Please make a new signin request",
        error: "refreshToken was expired"
      });
      return;
    }

    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign(user/*{ id: user.id }*/, config.ACCESS_TOKEN_SECRET, {
      expiresIn: config.jwtExpiration,
    });

    return res.status(200).json({
      status: 'success',
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({
      message: err,
      error: err
    });
  }
};