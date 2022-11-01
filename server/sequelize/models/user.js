const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      comment: "키값"
    },
    user_id: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "유저 아이디"
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "닉네임"
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "이메일"
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "비밀번호"
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "지갑주소"
    },
    token_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "nft 토큰 갯수"
    },
    eth_amount: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "이더리움 갯수"
    },
    date_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "계정생성일"
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "nicname",
        using: "BTREE",
        fields: [
          { name: "nickname" },
        ]
      },
    ]
  });
};
