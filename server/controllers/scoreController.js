const prisma = require('../lib/prisma');
const { calculateProductivityScore } = require('../utils/scoreHelper');

const getScore = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: { createdAt: 'desc' }
    });

    res.json(calculateProductivityScore(tasks));

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch score' });
  }
};

module.exports = {
  getScore
};
