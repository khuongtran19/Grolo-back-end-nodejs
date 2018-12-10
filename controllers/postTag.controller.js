const postTagService = require("../services/postTag.service");
const responses = require("../models/responses");
const post = (req, res) => {
  postTagService
    .post(req.model)
    .then(outputParms => {
      res.status(201).json(outputParms);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
const getById = (req, res) => {
  postTagService
    .getById(req.params.id)
    .then(item => {
      res.json(new responses.ItemResponse(item));
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
module.exports = {
  post,
  getById
};
