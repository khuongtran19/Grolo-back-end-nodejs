const businessService = require("../services/business.service");

const responses = require("../models/responses/index");

const post = (req, res) => {
  const tenantId = req.user.tenantId;
  console.log("ID", tenantId);
  businessService
    .post(req.model, req.user.id, tenantId)
    .then(outputParms => {
      res.status(201).json(outputParms);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getAll = (req, res) => {
  const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
  const pageSize = req.params.pageSize || req.query.pageSize || 24;
  const tenantId = req.user.tenantId;
  businessService
    .getAll(pageIndex, pageSize, tenantId)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const getById = (req, res) => {
  const tenantId = req.user.tenantId;
  businessService
    .getById(req.params.id, tenantId)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const search = (req, res) => {
  const searchString = req.query.searchString || ""; // part of the query string
  const pageIndex = req.query.pageIndex || 0; // part of the query string
  const pageSize = req.query.pageSize || 24; // part of the query string
  const tenantId = req.user.tenantId;
  businessService
    .search(searchString, pageIndex, pageSize, tenantId)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const put = (req, res) => {
  businessService
    .put(req.model, req.user.tenantId)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

const del = (req, res) => {
  businessService
    .del(req.params.id, req.user.tenantId)
    .then(response => {
      response.sendStatus(200);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};

module.exports = {
  search,
  del,
  getAll,
  getById,
  post,
  put
};
