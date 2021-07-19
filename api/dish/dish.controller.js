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
    res.status(200).json(dishes);
  } catch (err) {
    res.status(404).send(err);
  }
}

async function saveDish(req, res) {
  try {
    const dishData = req.body;
    if (!dishData) {
      res.status(404).send("No dish data was included in the request body");
    }
    if (!dishData._id) {
      const newDish = await addDish(dishData);
      res.status(201).send(newDish);
    }
    const updatedDish = await updateDish(dishData);
    res.status(200).send(updatedDish);
  } catch (err) {
    res.status(422).send(err);
  }
}

async function deleteDish(req, res) {
  try {
    const { dishId } = req.params;
    if (!dishId) {
      res.status(404).send("dishId is not provided in the url params");
    }
    const removedDish = await removeDish(dishId);
    res.status(200).send(removedDish);
  } catch (err) {
    res.status(404).send(err);
  }
}

module.exports = {
  getDishes,
  saveDish,
  deleteDish,
};
