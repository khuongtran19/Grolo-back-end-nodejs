const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const toCamel = require("./toCamel.js");

const search = (searchString, pageIndex, pageSize, tenantId) => {
  return mssql
    .executeProc("Business_Search", sqlRequest => {
      sqlRequest.addParameter("SearchString", TYPES.NVarChar, searchString, { length: 50 });
      sqlRequest.addParameter("PageIndex", TYPES.Int, pageIndex);
      sqlRequest.addParameter("PageSize", TYPES.Int, pageSize);
      sqlRequest.addParameter("TenantId", TYPES.Int, tenantId);
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
        tenantId: tenantId,
        totalCount: totalCount,
        totalPages: totalPages
      };
      const convertCamel = toCamel(item); // function to convert SQL fields to camel case
      return convertCamel;
    });
};

const post = (item, appUserId, tenantId) => {
  return mssql
    .executeProc("Business_Insert", sqlRequest => {
      sqlRequest.addParameter("Name", TYPES.NVarChar, item.name, {
        length: 50
      });
      sqlRequest.addParameter("AppUserId", TYPES.Int, appUserId);
      sqlRequest.addParameter("TenantId", TYPES.Int, tenantId);
      sqlRequest.addParameter("IndustryId", TYPES.Int, item.industryId);
      sqlRequest.addParameter("NumberOfEmployees", TYPES.Int, item.numberOfEmployees);
      sqlRequest.addParameter("IsRoaming", TYPES.Int, item.isRoaming);
      sqlRequest.addParameter("Url", TYPES.NVarChar, item.url, { length: 50 });
      sqlRequest.addParameter("PhoneNumber", TYPES.NVarChar, item.phoneNumber, {
        length: 50
      });
      sqlRequest.addParameter("FbPage", TYPES.NVarChar, item.fbPage, {
        length: 50
      });
      sqlRequest.addParameter("TwitterUrl", TYPES.NVarChar, item.twitterUrl, {
        length: 50
      });
      sqlRequest.addParameter("IgUrl", TYPES.NVarChar, item.igUrl, {
        length: 50
      });
      sqlRequest.addParameter("LogoUrl", TYPES.NVarChar, item.logoUrl, {
        length: 150
      });
      sqlRequest.addParameter("bannerUrl", TYPES.NVarChar, item.bannerUrl, {
        length: 150
      });
      sqlRequest.addParameter("PinterestUrl", TYPES.NVarChar, item.pinterestUrl, {
        length: 50
      });
      sqlRequest.addParameter("DefaultLandingUrl", TYPES.NVarChar, item.defaultLandingUrl, {
        length: 50
      });

      sqlRequest.addParameter("Street", TYPES.NVarChar, item.street, {
        length: 100
      });
      sqlRequest.addParameter("City", TYPES.NVarChar, item.city, {
        length: 50
      });
      sqlRequest.addParameter("Zip", TYPES.NVarChar, item.zip, {
        length: 15
      });
      sqlRequest.addParameter("Suite", TYPES.NVarChar, item.suite, {
        length: 100
      });
      sqlRequest.addParameter("State", TYPES.NVarChar, item.state, {
        length: 2
      });
      sqlRequest.addOutputParameter("Id", TYPES.Int, null);
    })
    .then(response => {
      return response.outputParameters;
    });
};

const getAll = (pageIndex, pageSize, tenantId) => {
  return mssql
    .executeProc("Business_SelectAll", sqlRequest => {
      sqlRequest.addParameter("PageIndex", TYPES.Int, pageIndex);
      sqlRequest.addParameter("PageSize", TYPES.Int, pageSize);
      sqlRequest.addParameter("TenantId", TYPES.Int, tenantId);
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
      const convertCamel = toCamel(item); // function to convert SQL fields to camel case
      return convertCamel;
    });
};
const getById = (id, tenantId) => {
  return mssql
    .executeProc("Business_SelectById", sqlRequest => {
      sqlRequest.addParameter("Id", TYPES.Int, id);
      sqlRequest.addParameter("TenantId", TYPES.Int, tenantId);
    })
    .then(response => {
      const convertCamel = toCamel(response.resultSets[0][0]); // function to convert SQL fields to camel case
      return convertCamel;
    });
};

const put = (item, tenantId) => {
  return mssql.executeProc("Business_Update", sqlRequest => {
    sqlRequest.addParameter("Name", TYPES.NVarChar, item.name, { length: 50 });
    sqlRequest.addParameter("IndustryId", TYPES.Int, item.industryId);
    sqlRequest.addParameter("NumberOfEmployees", TYPES.Int, item.numberOfEmployees);
    sqlRequest.addParameter("IsRoaming", TYPES.Int, item.isRoaming);
    sqlRequest.addParameter("Url", TYPES.NVarChar, item.url, { length: 50 });
    sqlRequest.addParameter("PhoneNumber", TYPES.NVarChar, item.phoneNumber, {
      length: 50
    });
    sqlRequest.addParameter("FbPage", TYPES.NVarChar, item.fbPage, {
      length: 50
    });
    sqlRequest.addParameter("TwitterUrl", TYPES.NVarChar, item.twitterUrl, {
      length: 50
    });
    sqlRequest.addParameter("IgUrl", TYPES.NVarChar, item.igUrl, {
      length: 50
    });
    sqlRequest.addParameter("LogoUrl", TYPES.NVarChar, item.logoUrl, {
      length: 150
    });
    sqlRequest.addParameter("bannerUrl", TYPES.NVarChar, item.bannerUrl, {
      length: 150
    });
    sqlRequest.addParameter("PinterestUrl", TYPES.NVarChar, item.pinterestUrl, {
      length: 50
    });
    sqlRequest.addParameter("DefaultLandingUrl", TYPES.NVarChar, item.defaultLandingUrl, {
      length: 50
    });
    sqlRequest.addParameter("AppUserId", TYPES.Int, item.appUserId);

    sqlRequest.addParameter("Id", TYPES.Int, item.id); // "id" is necessary here to match Business.js AND ARC
    sqlRequest.addParameter("Street", TYPES.NVarChar, item.street, {
      length: 100
    });
    sqlRequest.addParameter("City", TYPES.NVarChar, item.city, {
      length: 50
    });
    sqlRequest.addParameter("Zip", TYPES.NVarChar, item.zip, {
      length: 15
    });
    sqlRequest.addParameter("Suite", TYPES.NVarChar, item.suite, {
      length: 100
    });
    sqlRequest.addParameter("State", TYPES.NVarChar, item.state, {
      length: 2
    });
    sqlRequest.addParameter("TenantId", TYPES.Int, tenantId);
  });
};

const del = (id, tenantId) => {
  return mssql.executeProc("Business_Del", sqlRequest => {
    sqlRequest.addParameter("Id", TYPES.Int, id);
    sqlRequest.addParameter("TenantId", TYPES.Int, tenantId);
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
