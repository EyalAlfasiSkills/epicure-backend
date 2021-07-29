const {
  queryDishes,
  addDish,
  updateDish,
  removeDish,
} = require("./dish.handler");

async function getDishes(req, res) {
  try {
    const { dishId } = req.params;
    const dishes = await queryDishes({ _id: dishId });
    return res.status(200).json(dishes);
  } catch (err) {
    return res.status(404).send(err);
  }
}

async function saveDish(req, res) {
  try {
    const dishData = req.body;
    if (!dishData) {
      return res
        .status(404)
        .send("No dish data was included in the request body");
    }
    if (!dishData._id) {
      const newDish = await addDish(dishData);
      return res.status(201).json(newDish);
    }
    const updatedDish = await updateDish(dishData);
    return res.status(200).json(updatedDish);
  } catch (err) {
    return res.status(422).send(err);
  }
}

async function deleteDish(req, res) {
  try {
    const { dishId } = req.params;
    if (!dishId) {
      return res.status(404).send("dishId is not provided in the url params");
    }
    const removedDish = await removeDish(dishId);
    return res.status(200).json(removedDish);
  } catch (err) {
    return res.status(404).send(err);
  }
}

module.exports = {
  getDishes,
  saveDish,
  deleteDish,
};
