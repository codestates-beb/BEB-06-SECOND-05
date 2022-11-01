const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('post', {
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
      comment: "작성자(아이디)"
    },
    nickname: {
      type: DataTypes.STRING(50),
      allowNull: true,
      comment: "작성자(닉네임)"
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: true,
      comment: "게시글 제목"
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,
      comment: "게시글 내용"
    },
    date_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP'),
      comment: "게시글 생성일"
    },
    like_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    view_count: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'post',
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
        name: "user_post_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "FK_post_user",
        using: "BTREE",
        fields: [
          { name: "nickname" },
        ]
      },
    ]
  });
};
