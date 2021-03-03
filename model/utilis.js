const opcua = require("node-opcua");
const async = require("async");
const connectionStrategy = {
    initialDelay: 1000,
    maxRetry: 1
};
const options = {
    applicationName: "MyClient",
    connectionStrategy: connectionStrategy,
    securityMode: opcua.MessageSecurityMode.Sign,
    securityPolicy: opcua.SecurityPolicy.Basic256Sha256,
    endpoint_must_exist: false,
};
const client = opcua.OPCUAClient.create(options);
const endpointUrl = "opc.tcp://192.168.30.72:4840";
client.on("backoff", (retry, delay) =>
    console.log("still trying to connect to ", endpointUrl, ": retry =", retry, "next attempt in ", delay / 1000, "seconds")
);
let the_session, the_subscription;

const TramXuat = async function(para, callback) {
    // step 1 : connect to
    client.connect(endpointUrl, function(err) {
        if (err) {
            callback(err, undefined);
        } else {
            // step 2 : createSession
            client.createSession(function(err, session) {
                if (err) {
                    callback(err, undefined);
                }
                the_session = session;
                var nodesTowrite1 = {
                    nodeId: para.nodeId1, //"ns=4;s=MAIN.Test.Description"
                    attributeId: opcua.AttributeIds.Value,
                    value: {
                        value: {
                            dataType: opcua.DataType.String,
                            value: para.nodeValue1
                        }
                    }
                };
                var nodesTowrite2 = {
                    nodeId: para.nodeId2, //"ns=4;s=MAIN.Test.Description"
                    attributeId: opcua.AttributeIds.Value,
                    value: {
                        value: {
                            dataType: opcua.DataType.String,
                            value: para.nodeValue2
                        }
                    }
                };
                var nodesTowrite3 = {
                    nodeId: para.nodeId3, //"ns=4;s=MAIN.Test.Description"
                    attributeId: opcua.AttributeIds.Value,
                    value: {
                        value: {
                            dataType: opcua.DataType.String,
                            value: para.nodeValue3
                        }
                    }
                };
                var nodesTowrite4 = {
                    nodeId: para.nodeId4, //"ns=4;s=MAIN.Test.Description"
                    attributeId: opcua.AttributeIds.Value,
                    value: {
                        value: {
                            dataType: opcua.DataType.String,
                            value: para.nodeValue4
                        }
                    }
                };
                // step 4 : write a variable with 
                the_session.write(nodesTowrite1, function(err, statusCodes) {
                    if (err) {
                        callback(err, undefined);
                    } else {
                        the_session.write(nodesTowrite2, (err, data) => {
                            if (err) {
                                callback(err, undefined);
                            } else {
                                the_session.write(nodesTowrite3, (err, data) => {
                                    if (err) {
                                        callback(err, undefined);
                                    } else {
                                        the_session.write(nodesTowrite4, (err, data) => {
                                            if (err) {
                                                callback(err, undefined);
                                            } else {
                                                callback(undefined, true);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                });
            });
        }
    });
};
// TramXuat({
//     nodeId1: "ns=4;s=MAIN.Test.MaDonHang",
//     nodeValue1: "DO2021030201",
//     nodeId2: "ns=4;s=MAIN.Test.BienSo",
//     nodeValue2: "43-573.84",
//     nodeId3: "ns=4;s=MAIN.Test.KhoiLuong",
//     nodeValue3: "1000",
//     nodeId4: "ns=4;s=MAIN.Test.DonVi",
//     nodeValue4: "Kg",
// }, (err, data) => {
//     if (err) {

//     } else {
//         if (data) {
//             console.log("Success");
//         }
//     }
// });

const TramXuat2 = async function(para) {
        try {
            await client.connect(endpointUrl);
            let the_session = await client.createSession();
            var nodesTowrite1 = {
                nodeId: para.nodeId1, //"ns=4;s=MAIN.Test.Description"
                attributeId: opcua.AttributeIds.Value,
                value: {
                    value: {
                        dataType: opcua.DataType.String,
                        value: para.nodeValue1
                    }
                }
            };
            var nodesTowrite2 = {
                nodeId: para.nodeId2, //"ns=4;s=MAIN.Test.Description"
                attributeId: opcua.AttributeIds.Value,
                value: {
                    value: {
                        dataType: opcua.DataType.String,
                        value: para.nodeValue2
                    }
                }
            };
            var nodesTowrite3 = {
                nodeId: para.nodeId3, //"ns=4;s=MAIN.Test.Description"
                attributeId: opcua.AttributeIds.Value,
                value: {
                    value: {
                        dataType: opcua.DataType.String,
                        value: para.nodeValue3
                    }
                }
            };
            var nodesTowrite4 = {
                nodeId: para.nodeId4, //"ns=4;s=MAIN.Test.Description"
                attributeId: opcua.AttributeIds.Value,
                value: {
                    value: {
                        dataType: opcua.DataType.String,
                        value: para.nodeValue4
                    }
                }
            };
            await the_session.write(nodesTowrite1);
            await the_session.write(nodesTowrite2);
            await the_session.write(nodesTowrite3);
            await the_session.write(nodesTowrite4);
            return true;
        } catch (e) {
            return false;
        }
    }
    // TramXuat2({
    //     nodeId1: "ns=4;s=MAIN.Test.MaDonHang",
    //     nodeValue1: "DO2021030201",
    //     nodeId2: "ns=4;s=MAIN.Test.BienSo",
    //     nodeValue2: "43-573.84",
    //     nodeId3: "ns=4;s=MAIN.Test.KhoiLuong",
    //     nodeValue3: "1000",
    //     nodeId4: "ns=4;s=MAIN.Test.DonVi",
    //     nodeValue4: "Kg",
    // });
module.exports = { TramXuat, TramXuat2 };