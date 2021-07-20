const { queryAll } = require("./search.handler");

async function searchAllEntities(req, res) {
  try {
    const { searchStr } = req.query;
    const results = await queryAll(searchStr);
    res.status(200).json(results);
  } catch (err) {
    res.status(404).send(err);
  }
}

module.exports = {
  searchAllEntities,
};
