const router = require("express").Router();
const postService = require("../services/post.service");
const responses = require("../models/responses/index");

// Controllers implement the "endpoint" methods - i.e., the end of the middleware
// pipeline where the service's work is performed (usually by a single method
// to a service) and the appropriate HttpResponse is generated.

// preferred way to specify pageIndex, pageSize would be as
// query string parameters - we allow them as route parameter
// just for compatibility with
// sabiobootcampapi.azurewebsites.net convention

const getAll = (req, res) => {
  // Allow pageIndex and pageSize to come in as either route parameter
  // or qeuryString parameter, or default value if neither.
  const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
  const pageSize = req.params.pageSize || req.query.pageSize || 10;
  postService
    .getAll(pageIndex, pageSize)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const search = (req, res) => {
  const searchString = req.query.searchString || "";
  const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
  const pageSize = req.params.pageSize || req.query.pageSize || 10;
  const tenantId = req.user.tenantId;
  const businessId = req.params.businessId || req.query.businessId;
  postService
    .search(pageIndex, pageSize, searchString, tenantId, businessId)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const getById = (req, res) => {
  postService
    .getById(req.params.id)
    .then(item => {
      res.json(new responses.ItemResponse(item)); // Need to add response
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const post = (req, res) => {
  postService
    .post(req.model, req.user.id, req.user.tenantId, req.user.defaultBusinessId)
    .then(outputParms => {
      res.status(201).json(outputParms);
    })
    .catch(err => {
      res.status(500).send(err);
      console.log(err);
    });
};

const del = (req, res) => {
  console.log(req.params.id);
  postService
    .del(req.params.id)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

module.exports = {
  getAll,
  getById,

  search,
  post,
  del
};
