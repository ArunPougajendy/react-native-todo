const List = require('./../../models/list');

const updateItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    // const body = req.body;
    const listItem = await List.findById(itemId);
    await List.updateOne(
      { _id: itemId },
      { $set: { isDone: !listItem.isDone } }
    );
    const updatedItem = await List.findById(itemId);
    return res.status(200).json({
      message: 'Task Update successfully',
      payload: {
        title: updatedItem.title,
        isDone: updatedItem.isDone,
      },
    });
  } catch (err) {
    return res.status(500).json({
      payload: { stack: err.stack, errMessage: err.message, err },
      message: 'Some Error Occured 😢 ',
    });
  }
};

module.exports = updateItem;
