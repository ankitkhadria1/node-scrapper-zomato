

exports.somethingWentWrongError = function (res) {

    var errResponse = {
        status: 401,
        message: "check ur code",
        data: {}
    }
    sendData(errResponse,res);
};


exports.sendErrorMessage = function (msg,res,status) {

    var errResponse = {
        status: status,
        message: msg,
        data: {}
    };
    sendData(errResponse,res);
};

exports.sendSuccessData = function (data,message,res,status) {

    var successResponse = {
        status: status,
        message: message,
        data: data
    };
    sendData(successResponse,res);
};


function sendData(data,res)
{
    res.type('json');
    res.jsonp(data);
}