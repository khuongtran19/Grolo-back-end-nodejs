const userSelectService = require("../services/userSelect.service");
const responses = require("../models/responses");

const search = (req, res) => {
  const search = req.query.q || "";
  const pageIndex = req.params.pageIndex || req.query.pageIndex || 0;
  const pageSize = req.params.pageSize || req.query.pageSize || 200;
  const userRoleIds = req.query.r || "";
  const businessId = req.query.businessId || null;
  userSelectService
    .search(pageIndex, pageSize, search, userRoleIds, businessId)
    .then(item => {
      const r = new responses.ItemResponse(item);
      res.json(r);
    })
    .catch(err => {
      res.set(500).send(err);
    });
};
module.exports = {
  search
};
