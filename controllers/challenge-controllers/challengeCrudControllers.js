const  Challenge  = require('../../model/Challenge');
const challengeRepository = require("./../../repositories/challenge-repository")

const getChallengeById = async (req, res) => {
    const challengeId = req.params.id;
    try {
      const challenge = await challengeRepository.getChallengeById(challengeId);
      if (!challenge) {
        return res.status(404).json({ message: 'Challenge not found.' });
      }
      res.status(200).json(challenge);
    } 
    catch (error) {
      console.error('Error getting challenge by ID:', error);
      res.status(500).json({ error: 'Error retrieving challenge by ID.' });
    }
}

const updatedChallengeById = async (req, res) => {
    const challengeID = req.params.id;
    const updatedChallengeData = req.body;
  
    try {
      const updatedChallenge = await challengeRepository.updateChallengeById(challengeID, updatedChallengeData, { new: true });
      if (!updatedChallenge) {
        return res.status(404).json({ message: 'Challenge not found.' });
      }
      res.status(201).json(updatedChallenge);
    } 
    catch (error) {
      console.error('Error updating challenge by ID:', error);
      res.status(500).json({ error: 'Error updating challenge by ID.' });
    }
}


const deleteChallengeById = async (req, res) => {
    const challengeId = req.params.id;
  
    try {
      const deletedChallenge = await challengeRepository.deleteChallengeById(challengeId);
  
      if (!deletedChallenge) {
        return res.status(404).json({ message: 'Challenge not found.' });
      }
      res.status(200).json({ message: 'Challenge deleted successfully.' });
    } 
    catch (error) {
      console.error('Error deleting challenge by ID:', error);
      res.status(500).json({ error: 'Error deleting challenge by ID.' });
    }
}


const addChallenge = async (req, res) => {
    const { title, description, category } = req.body;
    try {
        const newChallenge = new Challenge({
        title,
        description,
        category,
        });
        await challengeRepository.addChallenge(newChallenge);
        res.status(201).json(newChallenge);
    } 
    catch (error) {
        console.error('Error adding a new challenge:', error);
        res.status(500).json({ error: 'Error adding a new challenge' });
    }
}

const getAllChallenges = async (req, res) => {  
    let challenges;
    try {
        challenges = await challengeRepository.getAllChallenges();
        return res.status(200).json(challenges);
    }
    catch(err) {
        res.status(500).json({ message: err.message });
    }
}



module.exports = {
    getChallengeById,
    updatedChallengeById,
    deleteChallengeById,
    addChallenge,
    getAllChallenges
};