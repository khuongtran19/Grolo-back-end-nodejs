const tagService = require("../services/tag.service");
const responses = require("../models/responses");
const getAllPost = (req, res) => {
  tagService
    .getAllPost(req.params.id, req.user.tenantId)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
const getAll = (req, res) => {
  const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
  const pageSize = req.params.pageSize || req.query.pageSize || 20;
  const tenantId = req.user.tenantId;
  tagService
    .getAll(pageIndex, pageSize, tenantId)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
const search = (req, res) => {
  const searchString = req.query.q || "";
  const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
  const pageSize = req.params.pageSize || req.query.pageSize || 20;
  const tenantId = req.user.tenantId;
  tagService
    .search(pageIndex, pageSize, searchString, tenantId)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
const getById = (req, res) => {
  tagService
    .getById(req.params.id, req.user.tenantId)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
const post = (req, res) => {
  tagService
    .post(req.model, req.user.tenantId)
    .then(outputParms => {
      res.status(201).json(outputParms);
    })
    .catch(err => {
      res.status(500).send(err);
    });
};
const put = (req, res) => {
  tagService
    .put(req.model, req.user.tenantId)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};

const del = (req, res) => {
  tagService
    .del(req.params.id, req.user.tenantId)
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
module.exports = {
  getById,
  getAll,
  post,
  put,
  del,
  search,
  getAllPost
};
