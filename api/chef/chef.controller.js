const chefHandler = require("./chef.handler");

async function getChefs(req, res) {
  try {
    const { chefId } = req.params;
    const chefs = await chefHandler.queryChefs({ _id: chefId });
    return res.status(200).json(chefs);
  } catch (err) {
    return res.status(404).send(err);
  }
}

async function getChefOfTheWeek(req, res) {
  try {
    const chefOfTheWeek = await chefHandler.getChefOfTheWeek();
    return res.status(200).json(chefOfTheWeek);
  } catch (err) {
    return res.status(404).send(err);
  }
}

async function setChefOfTheWeek(req, res) {
  try {
    const chefOfTheWeek = await chefHandler.setChefOfTheWeek();
    return res.status(200).json(chefOfTheWeek);
  } catch (err) {
    return res.status(404).send(err);
  }
}

async function saveChef(req, res) {
  try {
    const chefData = req.body;
    if (!chefData) {
      return res
        .status(404)
        .send("No chef data was included in the request body");
    }
    if (!chefData._id) {
      const newChef = await chefHandler.addChef(chefData);
      return res.status(201).json(newChef);
    }
    const updatedChef = await chefHandler.updateChef(chefData);
    return res.status(200).json(updatedChef);
  } catch (err) {
    return res.status(422).send(err);
  }
}

async function deleteChef(req, res) {
  try {
    const { chefId } = req.params;
    if (!chefId) {
      return res.status(404).send("chefId is not provided in the url params");
    }
    const removedChef = await chefHandler.deleteChef(chefId);
    return res.status(200).json(removedChef);
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
