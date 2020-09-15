//服务层

//导入模型
let model = require(__basename + '/db/model/model.js')

class API {

  //创建数据
  createData(modelName, o, t) {
    //modelName: 模型名称, string
    //o: 创建记录数据, object
    //返回一个promise
    //t: 事务处理对象
    return model[modelName].create(o, {transaction: t});
  }

  //查询数据
  findData(modelName, o, attrs) {
    //modelName: 模型名称，string
    //o: 条件, object
    //attrs: 查询指定字段, array, ['字段1']
    //count: 分页查询, object.offset ==> 偏移量,  object.limit ==> 查询数据量
    return model[modelName].findAll({
      where: o,
      attributes: attrs
    });
  }

  //分页查询
  findDataLimit(modelName, o, attrs, offset, limit, orderKey = 'createdAt') {
    //modelName: 模型名称，string
    //o: 条件, object
    //attrs: 查询指定字段, array, ['字段1']
    //offset: 偏移量
    //limit: 查询数据量
    //orderKey： 排序字段
    return model[modelName].findAll({
      where: o,
      attributes: attrs,
      offset,
      limit,
      order: [
        [orderKey, 'DESC']
      ]
    });

  }

  //分页查询和获取总记录数
  findAndCountAllData(modelName, o, attrs, offset, limit, orderKey = 'createdAt') {
    //modelName: 模型名称，string
    //o: 条件, object
    //attrs: 查询指定字段, array, ['字段1']
    //offset: 偏移量
    //limit: 查询数据量
    //orderKey： 排序字段
    return model[modelName].findAndCountAll({
      where: o,
      attributes: attrs,
      offset,
      limit,
      order: [
        [orderKey, 'DESC']
      ]
    });

  }

  //删除数据
  destroyData(modelName, o, t) {
    //modelName: 模型名称, string
    //o: 条件, object
    //t: 事务处理
    return model[modelName].destroy({
      where: o,
      transaction: t
    })
  }

  //更新数据
  updateData(modelName, value, o, t) {
    //modelName： 模型名称, string
    //value: 更新的字段数据，object
    //o: 更新条件，object
    //t: 事务处理对象

    return model[modelName].update(value, {
      where: o,
      transaction: t
    });
  }

  //事务处理
  transaction(fn) {
    //fn(t) {}, t: 事务处理对象
    return connect.transaction(fn);
  }

  //原始查询
  query(sql, o) {
    //sql: sql语句，string
    //o: sql预处理值，object
    return connect.query(sql, {
      //replacements: sql预处理值
      replacements: o,
      type: connect.QueryTypes.SELECT
    })
  }

}

module.exports = new API();