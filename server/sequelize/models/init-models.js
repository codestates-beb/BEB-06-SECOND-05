var DataTypes = require("sequelize").DataTypes;
var _nft = require("./nft");
var _post = require("./post");
var _user = require("./user");

function initModels(sequelize) {
  var nft = _nft(sequelize, DataTypes);
  var post = _post(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  nft.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(nft, { as: "nfts", foreignKey: "user_id"});

  return {
    nft,
    post,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
