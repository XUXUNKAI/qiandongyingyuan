//导入sequelize
let Sequelize = require('sequelize');

//Model类
let Model = Sequelize.Model;


//创建Code模型类，并且继承Model类
class Code extends Model {

}

//定义模型结构, 即mysql表结构
Code.init(
  {

  id: {
    //数据类型 INTEGER: 整型，UNSIGNED：无符号
    type: Sequelize.INTEGER.UNSIGNED,

    //主键
    primaryKey: true,

    //自动递增
    autoIncrement: true,

    //允许为null
    allowNull: false,

    //注释
    comment: '表id'
  },

  email: {
    //STRING：字符串
    type: Sequelize.STRING(50),

    allowNull: false,

    //默认值
    defaultValue: '',

    comment: '用户邮箱'

  },

  code: {
    type: Sequelize.STRING(6),
    allowNull: false,
    defaultValue: '',
    comment: '验证码'
  }

  },
  {
    //模型名称
    modelName: 'code',

    //添加createdAt、updatedAt字段
    timestamps: true,

    //假删除
    // paranoid: true

    //当表字段是驼峰式命名时，使用_风格命名表字段
    underscored: true,

    //禁止sequelize自动修改表名为复数
    freezeTableName: true,

    //定义表名，如果不写，则使用modelName模型名称命名
    tableName: 'code',

    //连接实例
    sequelize: connect
  }
)

//同步mysql数据
//force: false ==> 如果表结构存在，则不创建
//force: true ==> 如果表结构存在，先删除，再创建
Code.sync({
  force: false
})

//导出模型
module.exports = Code;