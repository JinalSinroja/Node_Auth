const apiResponse = (res, params) => {
    var code = params.code || 200;
    var resData = {
        status: params.status || 200,
        message: params.message || '',
        data: params.data || {},
    };

    return res.status(code).json(resData);
};

export default apiResponse;
