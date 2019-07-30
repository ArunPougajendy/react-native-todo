const List = require('../../models/list');

const getList = async (req, res) => {
  try {
    let listItems = await List.find();
    return res.status(200).json(listItems);
  } catch (err) {
    return res.status(500).json({
      payload: { stack: err.stack, errMessage: err.message, err },
      message: 'Some Error Occured 😢 ',
    });
  }
};

module.exports = getList;
