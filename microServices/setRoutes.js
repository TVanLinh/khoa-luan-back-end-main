const fs = require('fs');
const Promise = require('bluebird');

/** Search for the defined controllers in the specific path.
 *
 * @param string path - The path to search for controller files.
 * 
 * @return array controllerFiles - A list of available controller Files.
 */

function getControllerFiles(path) {
    var fs = require('fs');

    var possibleControllerFiles = fs.readdirSync(path);
    var controllerFiles = [];

    // readdirSync method returns directories as well, so let's remove those.
    possibleControllerFiles.forEach(function (file) {
        if (fs.statSync(path + file).isFile()) {
            controllerFiles.push(file);
        }
    });

    return controllerFiles;
}

/** Determine arguments' names of the function.
 * 
 * @param function func - a function which you want to determine its arguments' names.
 * 
 * @return array of string - The list of arguments' names.
 */
function getArgs(func) {
    // First match everything inside the function argument parens.
    var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];

    // Split the arguments string into an array comma delimited.
    return args.split(',').map(function (arg) {
        // Ensure no inline comments are parsed and trim the whitespace.
        return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter(function (arg) {
        // Ensure no undefined values are added.
        return arg;
    });
}

/** Convert a function into api request handler.
 * 
 * @param function func - A function which will be converted into a request handler.
 * @param Boolean api - is true for api handler and false for mvc handler
 * @param string httpVerb - (GET, POST, PUT, DELETE).
 * 
 * 
 * @return function - The request handler.
 */
function createApiRequestHandler(func, httpVerb, controllerName, methodName, securityLevel, secret, verifyUser) {
    var requestHandler = function (req, res) {
        var token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : '';

        verifyUser(token, httpVerb, controllerName, methodName, securityLevel, secret).then(function (data) {
            var args = getArgs(func);
            var argVals = [];
            //prepare parmaters for business api
            args.forEach(function (argName) {
                //strictly dependence on req object which created by express handler.
                // default value: req.query = {}, req.param = {}, req.body = undefined
                var paramVal = undefined;

                if (httpVerb == 'get') {
                    paramVal = req.query[argName];
                    if (paramVal === undefined) paramVal = req.params[argName];
                } else { //post or put or delete
                    paramVal = req.body[argName];
                    if (paramVal === undefined) paramVal = req.params[argName];
                    if (paramVal === undefined) paramVal = req.query[argName];
                }

                argVals.push(paramVal);
            });

            return func.apply(func, argVals);
            //var businessResult = func.apply(func, argVals);
            //return businessResult; //Promise.resolve(businessResult);
        })
            .then(data => {
                res.json(data);
            })
            .catch(function (err) {
                console.log(err);
                res.sendStatus(401);
            });
    };

    return requestHandler;
}

/** Create express routes based on defined controllers in the folder.
 * Naming convention in Controller: httpVerb_methodName (example: get_userList)
 * 
 * @param express app - A Express application which routes are assigned to.
 * @param string controllerPath - a path which point to the controller folder.
 * @param Boolean api - is true if set api routes; is false if set mvc routes
 * 
 */
function setRoutes(app, controllerPath, secret, verifyUser) {
    var routes = [];

    //normalize controllerPath
    controllerPath = controllerPath.substring(-1) === '/' ? controllerPath : (controllerPath + '/');
    var controllerFiles = getControllerFiles(controllerPath);

    controllerFiles.forEach(function (controllerFile) {
        if (controllerFile.indexOf('.js') > 0) {
            var controllerName = controllerFile.substr(0, controllerFile.indexOf('.js'));
            var controller = require(controllerPath + controllerFile);
            var endpoints = Object.keys(controller);
            endpoints.forEach(function (endpoint) {
                var tmp = endpoint.split("_");

                var methodName = endpoint;
                var httpVerb = 'get';
                var securityLevel = 0;

                if (tmp.length == 2) {
                    methodName = tmp[1];
                    if (tmp[0] === 'u') securityLevel = 1;
                    else if (tmp[0] === 'o') securityLevel = 2;
                    else httpVerb = tmp[0];
                } else {
                    if (tmp.length === 3) {
                        methodName = tmp[2];
                        httpVerb = tmp[1];
                        if (tmp[0] === 'u') securityLevel = 1; else securityLevel = 2;
                    }
                }

                // If this is the "index" method, we map it to the path directly.
                var endpointSuffix = methodName === "index" ? '' : methodName;
                //process for index with param: index/:id
                if (methodName.startsWith('index/')) {
                    endpointSuffix = methodName.substr(6);
                }

                //calculate endpoint URL for api route
                var endpointURL = '/' + controllerName + '/' + endpointSuffix;
                // Normalize endpointURL by removing any trailing slashes
                if (endpointURL[endpointURL.length - 1] == '/' && (endpointURL.length > 1)) 
                    endpointURL = endpointURL.substr(0, endpointURL.length - 1);

                var requestHandler = createApiRequestHandler(controller[endpoint], httpVerb, controllerName, methodName, securityLevel, secret, verifyUser);

                routes.push({
                    verb: httpVerb,
                    handler: requestHandler,
                    url: endpointURL
                });
            });
        }
    });

    //attach routes to express server
    routes.forEach(function (route) {
        //console.log(route.url);
        app[route.verb](route.url, route.handler);
    });
}

module.exports = setRoutes;