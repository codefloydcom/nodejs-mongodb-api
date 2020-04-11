const extendedResults = (model, populate) => async(req, res, next) => {
    const reqQuery = {...req.query};

    // Removing native select, sorting and pagination for later usage 
    const excludedFields = ['select', 'sort', 'page', 'limit'] 
    excludedFields.forEach(p => delete reqQuery[p]);

    // Utilize native number operators with $sign
    const queryString = JSON.parse(
                    JSON.stringify(reqQuery)
                            .replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`));

    let query = model.find(queryString);
    
    // Add native select operator
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    // Add native sort operator
    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        // default sort query.sort('-number');
    }

    // Add native pagination operator
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 100;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalDocuments = await model.countDocuments();
    const pagination = { startIndex, endIndex, totalDocuments };

    query = query.skip(startIndex).limit(limit);

    if(populate) {
        query.populate(populate);
    }

    const results = await query;

    res.extendedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    }

    next();
};

module.exports = extendedResults;
