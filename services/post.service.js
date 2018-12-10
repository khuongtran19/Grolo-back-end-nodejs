const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const toCamel = require("./toCamel.js");

const getAll = (pageIndex, pageSize) => {
  return mssql
    .executeProc("Post_SelectAll", sqlRequest => {
      sqlRequest.addParameter("pageIndex", TYPES.Int, pageIndex);
      sqlRequest.addParameter("pageSize", TYPES.Int, pageSize);
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
      item.pagedItems = item.pagedItems.map(row => {
        console.log(row);
        row.typesIds = JSON.parse(row.typesIds).map(typeId => typeId.SocialMediaId);
        row.TypeId = JSON.parse(row.TypeId);

        return row;
      });
      const convertToCamel = toCamel(item);
      return convertToCamel;
    });
};

//

const search = (pageIndex, pageSize, searchString, tenantId, businessId) => {
  return mssql
    .executeProc("PostTag_GetAll", sqlRequest => {
      sqlRequest.addParameter("searchString", TYPES.NVarChar, searchString, {
        length: 50
      });
      sqlRequest.addParameter("tenantId", TYPES.Int, tenantId);
      sqlRequest.addParameter("pageIndex", TYPES.Int, pageIndex);
      sqlRequest.addParameter("pageSize", TYPES.Int, pageSize);
      sqlRequest.addParameter("businessId", TYPES.Int, businessId);
    })
    .then(response => {
      console.log(response);
      const totalCount =
        (response.resultSets &&
          response.resultSets[0] &&
          response.resultSets[0][0] &&
          response.resultSets[0][0].TotalRows) ||
        0;
      const totalPages = Math.ceil(totalCount / pageSize);
      const item = {
        pagedItems: response.resultSets ? response.resultSets[0] : [],
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalCount: totalCount,
        totalPages: totalPages
      };
      console.log(item.pagedItems);
      const convertToCamel = toCamel(item);
      return convertToCamel;
    });
};

const getById = id => {
  return mssql
    .executeProc("PostTag_getById", sqlRequest => {
      sqlRequest.addParameter("postId", TYPES.Int, id);
    })
    .then(response => {
      const convertToCamel = toCamel(response.resultSets[0]);
      return convertToCamel;
    });
};

const post = (item, id, tenantId, defaultBusinessId) => {
  return mssql
    .executeProc("Post_CreateUpdate", sqlRequest => {
      sqlRequest.addParameter("appUserId", TYPES.NVarChar, id);
      sqlRequest.addParameter("message", TYPES.NVarChar, item.message, {
        length: 1000
      });
      sqlRequest.addParameter("campaignId", TYPES.Int, item.campaignId);
      sqlRequest.addParameter("businessId", TYPES.Int, item.businessId);
      console.log(defaultBusinessId);
      sqlRequest.addParameter("photoUrl", TYPES.NVarChar, item.photoUrl, {
        length: 150
      });
      sqlRequest.addParameter("linkUrl", TYPES.NVarChar, item.linkUrl, {
        length: 150
      });
      sqlRequest.addParameter("videoUrl", TYPES.NVarChar, item.videoUrl, {
        length: 150
      });
      sqlRequest.addParameter("tenantId", TYPES.Int, tenantId);
      sqlRequest.addParameter("typeId", TYPES.NVarChar, item.typeId);
      sqlRequest.addParameter("isPush", TYPES.Bit, item.isPush);
      sqlRequest.addParameter("isSms", TYPES.Bit, item.isSms);
      sqlRequest.addParameter("startDate", TYPES.Date, item.startDate);
      sqlRequest.addParameter("endDate", TYPES.Date, item.endDate);
      sqlRequest.addParameter("lat", TYPES.Decimal, item.lat);
      sqlRequest.addParameter("long", TYPES.Decimal, item.long);
      sqlRequest.addParameter("geoRadius", TYPES.Int, item.geoRadius);
      sqlRequest.addParameter("tags", TYPES.NVarChar, JSON.stringify(item.tags));
      sqlRequest.addOutputParameter("id", TYPES.Int, item.id);
    })
    .then(response => {
      return response.outputParameters;
    });
};

const del = id => {
  return mssql.executeProc("Post_Delete", sqlRequest => {
    sqlRequest.addParameter("id", TYPES.Int, id);
  });
};

module.exports = {
  getAll,
  getById,
  search,
  post,
  del
};
