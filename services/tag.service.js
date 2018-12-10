const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const toCamel = require("./toCamel.js");

const getAllPost = (id, tenantId) => {
  return mssql
    .executeProc("PostTag_GetTagById", sqlRequest => {
      sqlRequest.addParameter("tagId", TYPES.Int, id);
      sqlRequest.addParameter("tenantId", TYPES.Int, tenantId);
    })
    .then(response => {
      const convertToCamel = toCamel(response.resultSets[0]);
      return convertToCamel;
    });
};
const getAll = (pageIndex, pageSize, tenantId) => {
  return mssql
    .executeProc("Tag_GetAll", sqlRequest => {
      sqlRequest.addParameter("pageIndex", TYPES.Int, pageIndex);
      sqlRequest.addParameter("pageSize", TYPES.Int, pageSize);
      sqlRequest.addParameter("tenantId", TYPES.Int, tenantId);
    })
    .then(response => {
      const totalCount =
        (response.resultSets &&
          response.resultSets[0] &&
          response.resultSets[0][0] &&
          response.resultSets[0][0].TotalRows) ||
        0;
      const totalPages = Math.ceil(totalCount / pageSize);
      const item = {
        pagedItems: response.resultSets[0],
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: totalPages
      };
      const convertCamel = toCamel(item);
      return convertCamel;
    });
};
const search = (pageIndex, pageSize, search, tenantId) => {
  return mssql
    .executeProc("Tag_Search", sqlRequest => {
      sqlRequest.addParameter("search", TYPES.NVarChar, search, {
        length: 100
      });
      sqlRequest.addParameter("pageIndex", TYPES.Int, pageIndex);
      sqlRequest.addParameter("pageSize", TYPES.Int, pageSize);
      sqlRequest.addParameter("tenantId", TYPES.Int, tenantId);
    })
    .then(response => {
      const totalCount =
        (response.resultSets &&
          response.resultSets[0] &&
          response.resultSets[0][0] &&
          response.resultSets[0][0].TotalRows) ||
        0;
      const totalPages = Math.ceil(totalCount / pageSize);
      const item = {
        pagedItems: response.resultSets[0],
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: totalPages
      };
      const convertCamel = toCamel(item);
      return convertCamel;
    });
};
const getById = (id, tenandId) => {
  return mssql
    .executeProc("Tag_GetById", sqlRequest => {
      sqlRequest.addParameter("id", TYPES.Int, id);
      sqlRequest.addParameter("tenantId", TYPES.Int, tenandId);
    })
    .then(response => {
      const convertToCamel = toCamel(response.resultSets[0]);
      return convertToCamel;
    });
};
const post = (item, tenantId) => {
  return mssql
    .executeProc("Tag_Create", sqlRequest => {
      sqlRequest.addParameter("name", TYPES.NVarChar, item.name, {
        length: 50
      });
      sqlRequest.addParameter("tenantId", TYPES.Int, tenantId);
      sqlRequest.addParameter("activeStatus", TYPES.Bit, (item.activeStatus = 1));
      sqlRequest.addOutputParameter("id", TYPES.Int, null);
    })
    .then(response => {
      return response.outputParameters;
    });
};
const put = (item, tenantId) => {
  return mssql
    .executeProc("Tag_Update", sqlRequest => {
      sqlRequest.addParameter("name", TYPES.NVarChar, item.name, {
        length: 50
      });
      sqlRequest.addParameter("tenantId", TYPES.Int, tenantId);
      sqlRequest.addParameter("activeStatus", TYPES.Bit, item.activeStatus);
      sqlRequest.addParameter("id", TYPES.Int, item.id);
    })
    .then(response => {
      return true;
    });
};

const del = (id, tenandId) => {
  return mssql.executeProc("Tag_Delete", sqlRequest => {
    sqlRequest.addParameter("id", TYPES.Int, id);
    sqlRequest.addParameter("tenantId", TYPES.Int, tenandId);
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
