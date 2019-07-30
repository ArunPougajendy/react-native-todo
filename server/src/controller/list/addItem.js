const List = require('./../../models/list');

const addItem = async (req, res) => {
  try {
    const { title } = req.body;
    console.log(req.body);
    const newTask = new List({
      title,
    });
    await newTask.save();
    return res.status(200).json({
      message: 'Task Created Successfully',
      payload: {
        id: newTask._id,
        title: newTask.title,
        isDone: newTask.isDone,
      },
    });
  } catch (err) {
    return res.status(500).json({
      payload: { stack: err.stack, errMessage: err.message, err },
      message: 'Some Error Occured 😢 ',
    });
  }
};

module.exports = addItem;
