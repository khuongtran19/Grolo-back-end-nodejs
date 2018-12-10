const mssql = require("../../mssql");
const TYPES = require("tedious").TYPES;
const toCamel = require("./toCamel.js");

const search = (pageIndex, pageSize, search, userRoleIds, businessId) => {
  return mssql
    .executeProc("AppUser_Search", sqlRequest => {
      sqlRequest.addParameter("Search", TYPES.NVarChar, search, {
        length: 100
      });
      sqlRequest.addParameter("PageIndex", TYPES.Int, pageIndex);
      sqlRequest.addParameter("PageSize", TYPES.Int, pageSize);
      var array = "[" + userRoleIds + "]";
      sqlRequest.addParameter("UserRoleIds", TYPES.NVarChar, array);
      sqlRequest.addParameter(
        "businessId",
        TYPES.Int,
        businessId ? parseInt(businessId, 10) : null
      );
    })
    .then(response => {
      const totalCount =
        (response.resultSets &&
          response.resultSets[0] &&
          response.resultSets[0][0] &&
          response.resultSets[0][0].TotalRows) ||
        0;
      const totalpages = Math.ceil(totalCount / pageSize);
      const item = {
        pagedItems: response.resultSets[0],
        pageIndex: pageIndex,
        pageSize: pageSize,
        totalCount: totalCount,
        totalpages: totalpages
      };
      const convertCamel = toCamel(item);
      return convertCamel;
    });
};
module.exports = {
  search
};
