const chefHandler = require("./chef.handler");

async function getChefs(req, res) {
  try {
    const { chefId } = req.params;
    const chefs = await chefHandler.queryChefs({ _id: chefId });
    res.status(200).json(chefs);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function getChefOfTheWeek(req, res) {
  try {
    const chefOfTheWeek = await chefHandler.getChefOfTheWeek();
    res.status(200).json(chefOfTheWeek);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function setChefOfTheWeek(req, res) {
  try {
    const chefOfTheWeek = await chefHandler.setChefOfTheWeek();
    res.status(200).json(chefOfTheWeek);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function saveChef(req, res) {
  try {
    const chefData = req.body;
    if (!chefData) {
      res.status(404).send("No chef data was included in the request body");
    }
    if (!chefData._id) {
      const newChef = await chefHandler.addChef(chefData);
      res.status(201).send(newChef);
      return newChef;
    }
    const updatedChef = await chefHandler.updateChef(chefData);
    res.status(200).send(updatedChef);
    return updatedChef;
  } catch (err) {
    res.status(422).send(err);
  }
}

async function deleteChef(req, res) {
  try {
    const { chefId } = req.params;
    if (!chefId) {
      res.status(404).send("chefId is not provided in the url params");
    }
    const removedChef = await chefHandler.deleteChef(chefId);
    res.status(200).send(removedChef);
  } catch (err) {
    res.status(404).send(err);
  }
}

module.exports = {
  getChefs,
  saveChef,
  deleteChef,
  getChefOfTheWeek,
  setChefOfTheWeek,
};
