const List = require('./../../models/list');

const deleteItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    await List.deleteOne({ _id: itemId });
    const listItems = await List.find();
    return res.status(200).json({
      message: 'Task deletes successfully',
      payload: listItems,
    });
  } catch (err) {
    return res.status(500).json({
      payload: { stack: err.stack, errMessage: err.message, err },
      message: 'Some Error Occured 😢 ',
    });
  }
};

module.exports = deleteItem;
