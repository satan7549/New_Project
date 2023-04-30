const search = (query, queryStr) => {
  const searchKeyword = queryStr.q
    ? {
        name: {
          $regex: queryStr.q,
          $options: "i",
        },
      }
    : {};
  query = query.find({ ...searchKeyword });

  return query;
};

const filter = (query, queryStr) => {
  const queryCopy = { ...queryStr };

  // removing some fields for category
  const removeFileds = ["q", "page", "limit", "sort"];
  removeFileds.forEach((key) => delete queryCopy[key]);

  //filter for prie and ratings:-
  let queryString = JSON.stringify(queryCopy);
  // JSON.stringify convert queryCopy object into string;

  // after the price[lt/lte/gt/gte] replace into {"price": { "$gt": "200", "$lt": "1000" }}
  queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

  let queryObject = JSON.parse(queryString);
  //JSON.parse will convert string into object { price: { '$gt': '200', '$lt': '1000' } }

  query = query.find(queryObject);

  return query;
};

const sort = (query, queryStr) => {
  // check if the sort parameter is provided in the query string
  if (queryStr.sort) {
    // split the sort query parameter by comma to get the sort fields and sort orders
    const sortFields = queryStr.sort.split(",");

    // construct the sort query object
    const sortQuery = {};
    sortFields.forEach((field) => {
      // determine the sort order of the field
      let sortOrder = 1;
      if (field.endsWith(":asc")) {
        sortOrder = 1;
        field = field.slice(0, -4);
      } else if (field.endsWith(":desc")) {
        sortOrder = -1;
        field = field.slice(0, -5);
      }
      sortQuery[field] = sortOrder;
    });

    // apply the sort query to the query
    query = query.sort(sortQuery);
  } else {
    // default sort order by price, ascending
    query = query.sort({ price: 1 });
  }

  return query;
};

// function paginate(queryStr, query, resultPerPage) {
//   const currentPage = Number(queryStr.page) || 1;
//   const skip = resultPerPage * (currentPage - 1);
//   query = query.limit(resultPerPage).skip(skip);
//   return query;
// }

module.exports = {
  search,
  filter,
  sort,
  //   paginate,
};
