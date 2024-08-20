const Option = require('../models/option');
const Question = require('../models/question');

//Delete an option
module.exports.deleteOption = async (req, res) => {
  try {
    const optionId = req.params.id;
    const userId = req.userId;

    const option = await Option.findById(optionId);

    if (!option) {
      return res.status(400).json({
        message: 'Option not found',
      });
    }

    const question = await Question.findById(option.question);

  
    if (!question || question.user.toString() !== userId) {
      return res.status(403).json({
        message: 'Unauthorized to delete this option',
      });
    }


    await question.updateOne({ $pull: { options: optionId } });

  
    await Option.findByIdAndDelete(optionId);

    return res.status(200).json({
      success: true,
      message: 'Option deleted successfully!',
    });
  } catch (err) {
    console.log('Error occurs', err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};


module.exports.addVote = async (req, res) => {
  try {
    const optionId = req.params.id;

    const option = await Option.findById(optionId);

    if (!option) {
      return res.status(400).json({
        message: 'Option not found',
      });
    }


    option.votes += 1;

    await option.save();

    const question = await Question.findById(option.question);
    question.totalVotes += 1;

    await question.save();

    return res.status(200).json({
      success: true,
      option,
    });
  } catch (err) {
    console.log('Error occurs', err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
