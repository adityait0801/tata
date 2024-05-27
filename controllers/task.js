const User = require('../models/User');
const RewardHistory = require('../models/RewardHistory');

exports.createP5 = async (req, res) => {
    try {
        const { given_by, given_to, points } = req.body;
        const giver = await User.findById(given_by);
        const receiver = await User.findById(given_to);

        if (giver.p5_balance >= points) {
            giver.p5_balance -= points;
            receiver.reward_balance += points;

            await giver.save();
            await receiver.save();

            const rewardHistory = new RewardHistory({ points, given_by, given_to });
            await rewardHistory.save();

            res.json(rewardHistory);
        } else {
            res.status(400).send('Not enough P5 balance');
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteP5 = async (req, res) => {
    try {
        const rewardHistory = await RewardHistory.findById(req.params.id);
        const giver = await User.findById(rewardHistory.given_by);
        const receiver = await User.findById(rewardHistory.given_to);

        giver.p5_balance += rewardHistory.points;
        receiver.reward_balance -= rewardHistory.points;

        await giver.save();
        await receiver.save();
        await rewardHistory.remove();

        res.send('Deleted');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
