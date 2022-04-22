const cleanObject = object => {
  Object.entries(object).forEach(([k, v]) => {
    if (v && typeof v === 'object') cleanObject(v);
    if ((v && typeof v === 'object' && !Object.keys(v).length) || v === null || v === undefined || v.length === 0) {
      if (Array.isArray(object)) object.splice(k, 1);
      else if (!(v instanceof Date)) delete object[k];
    }
  });
  return object;
};

const getPageInfo = (docCount, limit, skip) => {
  const totalPage = limit > 0 ? Math.ceil(docCount / limit) || 1 : 0;
  // const currentPage = Math.ceil((skip + 1) / limit);
  const currentPage = skip + 1;

  return {
    limit,
    totalDocs: docCount,
    totalPage,
    currentPage,
    hasNextPage: currentPage < totalPage,
    hasPreviousPage: currentPage > 1
  };
};

const isObject = item => typeof item === 'object' && !Array.isArray(item) && item !== null;

export { isObject, cleanObject, getPageInfo };
