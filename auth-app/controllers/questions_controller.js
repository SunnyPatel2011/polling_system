const Question = require('../models/question');
const Option = require('../models/option');

//To create a question
module.exports.createQuestion = async (req, res) => {
  try {
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({
        message: 'Title is required for creating question',
      });
    }

    const question = await Question.create({ title, user: req.userId });

    res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.error('Error creating question:', err);
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
};

//fetch question
module.exports.fetchquestion =  async (req, res) => {
  try {
      const questions = await Question.find({ user: req.userId});
      res.status(200).json({ questions });
  } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
  }
};

//Update question
module.exports.updateQuestion = async (req, res) => {
    try {
        const questionId = req.params.id;
        const { title, options } = req.body;

        const question = await Question.findOne({ _id: questionId, user: req.userId});
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        question.title = title;

        for (let i = 0; i < options.length; i++) {
            const optionData = options[i];
            const option = await Option.findById(optionData._id);
            if (option) {
                option.text = optionData.text;
                await option.save();
            }
        }

        await question.save();

        return res.status(200).json({
            success: true,
            question,
        });
    } catch (err) {
        console.error('Error updating question:', err);
        return res.status(500).json({
            message: 'Internal server error',
        });
    }
};

//To create an option
module.exports.createOptions = async (req, res) => {
  try {
    const questionId = req.params.id;
    const { text } = req.body;

    if (!Array.isArray(text) || text.length === 0) {
      return res.status(400).json({
        message: 'Text required for creating option',
      });
    }

    const question = await Question.findOne({ _id: questionId, user: req.userId});

    if (!question) {
      return res.status(400).json({
        message: 'Question not found!',
      });
    }

    const options = [];

    for (const optionText of text) {
      const option = await Option.create({
        text: optionText,
        question: questionId,
      });

      const link_to_vote = `http://localhost:8000/options/${option._id}/add_vote`;
      option.link_to_vote = link_to_vote;

      await option.save();
      options.push(option);

      question.options.push(option._id);
    }

   

    await question.save();

    return res.status(200).json({
      success: true,
      options,
    });
  } catch (err) {
    console.error('Error creating option:', err);
    return res.status(500).json({
      message: 'Internal server error',
      error: err.message,
    });
  }
};

//To delete a question
module.exports.deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findOne({ _id: questionId, user: req.userId});

    if (!question) {
      return res.status(400).json({
        message: 'Question not found',
      });
    }

    await Option.deleteMany({ question: questionId });
    await Question.findByIdAndDelete(questionId);

    return res.status(200).json({
      success: true,
      message: 'Question and associated options deleted successfully!',
    });
  } catch (err) {
    console.log('Error deleting question:', err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};


module.exports.viewQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    const question = await Question.findOne({ _id: questionId, user: req.userId }).populate({
      path: 'options',
      model: 'Option',
    });

    if (!question) {
      return res.status(400).json({
        message: 'Question not found',
      });
    }

    return res.status(200).json({
      success: true,
      question,
    });
  } catch (err) {
    console.log('Error for viewing:', err);
    return res.status(500).json({
      message: 'Internal server error',
    });
  }
};
