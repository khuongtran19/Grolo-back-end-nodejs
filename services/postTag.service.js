const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const toCamel = require("./toCamel.js");
const post = item => {
  return mssql
    .executeProc("PostTag_Insert", sqlRequest => {
      sqlRequest.addParameter("PostId", TYPES.Int, item.PostId);
      sqlRequest.addParameter("TagId", TYPES.Int, item.TagId);
    })
    .then(response => {
      return response.outputParameters;
    });
};
const getById = id => {
  return mssql
    .executeProc("PostTag_getById", sqlRequest => {
      sqlRequest.addParameter("PostId", TYPES.Int, id);
    })
    .then(response => {
      const convertToCamel = toCamel(response.resultSets[0]);
      return convertToCamel;
    });
};
module.exports = {
  post,
  getById
};
