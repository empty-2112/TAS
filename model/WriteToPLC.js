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
const endpointUrl = "opc.tcp://192.168.30.67:4840";
let the_session;
const TramXuat2 = function(para, para2, callback) {
    var nodeId = "ns=4;s=TRAMXUAT.HangDoi[" + para + "].";
    var maDH = (para2.maHD).toString().split("DO")[1];
    //MaDH và trạng thái
    var nodesTowrite1 = {
        nodeId: nodeId + "MaDH", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.String,
                value: (maDH)
            }
        }
    };
    var nodesTowrite2 = {
        nodeId: nodeId + "StatusDH", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Int32,
                value: 0
            }
        }
    };
    //Ngan1
    var nodesTowrite3 = {
        nodeId: nodeId + "Ngan1", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.String,
                value: para2.ngan1
            }
        }
    };
    var nodesTowrite4 = {
        nodeId: nodeId + "Khoiluong1", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: para2.khoiluong1
            }
        }
    };
    var nodesTowrite5 = {
        nodeId: nodeId + "Status1", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Int32,
                value: 0
            }
        }
    };
    //Ngan2
    var nodesTowrite6 = {
        nodeId: nodeId + "Ngan2", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.String,
                value: para2.ngan2
            }
        }
    };
    var nodesTowrite7 = {
        nodeId: nodeId + "Khoiluong2", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: para2.khoiluong2
            }
        }
    };
    var nodesTowrite8 = {
        nodeId: nodeId + "Status2", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Int32,
                value: 0
            }
        }
    };
    //Ngan3
    var nodesTowrite9 = {
        nodeId: nodeId + "Ngan3", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.String,
                value: para2.ngan3
            }
        }
    };
    var nodesTowrite10 = {
        nodeId: nodeId + "Khoiluong3", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: para2.khoiluong3
            }
        }
    };
    var nodesTowrite11 = {
        nodeId: nodeId + "Status3", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Int32,
                value: 0
            }
        }
    };
    //Ngan4
    var nodesTowrite12 = {
        nodeId: nodeId + "Ngan4", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.String,
                value: para2.ngan4
            }
        }
    };
    var nodesTowrite13 = {
        nodeId: nodeId + "Khoiluong4", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: para2.khoiluong4
            }
        }
    };
    var nodesTowrite14 = {
        nodeId: nodeId + "Status4", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Int32,
                value: 0
            }
        }
    };
    //Ngan5
    var nodesTowrite15 = {
        nodeId: nodeId + "Ngan5", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.String,
                value: para2.ngan5
            }
        }
    };
    var nodesTowrite16 = {
        nodeId: nodeId + "Khoiluong5", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: para2.khoiluong5
            }
        }
    };
    var nodesTowrite17 = {
        nodeId: nodeId + "Status5", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Int32,
                value: 0
            }
        }
    };
    //Ngan6
    var nodesTowrite18 = {
        nodeId: nodeId + "Ngan6", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.String,
                value: para2.ngan6
            }
        }
    };
    var nodesTowrite19 = {
        nodeId: nodeId + "Khoiluong6", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: para2.khoiluong6
            }
        }
    };
    var nodesTowrite20 = {
        nodeId: nodeId + "Status6", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Int32,
                value: 0
            }
        }
    };
    //Ngan7
    var nodesTowrite21 = {
        nodeId: nodeId + "Ngan7", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.String,
                value: para2.ngan7
            }
        }
    };
    var nodesTowrite22 = {
        nodeId: nodeId + "Khoiluong7", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: para2.khoiluong7
            }
        }
    };
    var nodesTowrite23 = {
        nodeId: nodeId + "Status7", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Int32,
                value: 0
            }
        }
    };
    //Ngan8
    var nodesTowrite24 = {
        nodeId: nodeId + "Ngan8", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.String,
                value: para2.ngan8
            }
        }
    };
    var nodesTowrite25 = {
        nodeId: nodeId + "Khoiluong8", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: para2.khoiluong8
            }
        }
    };
    var nodesTowrite26 = {
        nodeId: nodeId + "Status8", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Int32,
                value: 0
            }
        }
    };
    //Ngan9
    var nodesTowrite27 = {
        nodeId: nodeId + "Ngan9", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.String,
                value: para2.ngan9
            }
        }
    };
    var nodesTowrite28 = {
        nodeId: nodeId + "Khoiluong9", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Float,
                value: para2.khoiluong9
            }
        }
    };
    var nodesTowrite29 = {
        nodeId: nodeId + "Status9", //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.Int32,
                value: 0
            }
        }
    };
    //
    client.connect(endpointUrl, function(err) {

        if (err) {
            console.log(err);
            console.log(" cannot connect to endpoint :", endpointUrl);
            callback(err, undefined);
        } else {
            client.createSession(function(err, session) {
                if (err) {
                    console.log(err);
                    callback(err, undefined);
                } else {
                    the_session = session;
                    session.write(nodesTowrite1, (err, statusCodes) => {
                        if (err) {
                            console.log(err);
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite2, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite3, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite4, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite5, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite6, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite7, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite8, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite9, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite10, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite11, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite12, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite13, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite14, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite15, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite16, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite17, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite18, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite19, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite20, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite21, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite22, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite23, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite24, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite25, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite26, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite27, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite28, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        }
                    })
                    session.write(nodesTowrite29, (err, statusCodes) => {
                        if (err) {
                            callback(err, undefined);
                        } else {
                            session.close().then((result) => {
                                console.log(result);
                                client.disconnect().then((result) => {
                                    console.log(result);
                                    callback(undefined, true);
                                })
                            })
                        }
                    })

                }
            })
        }
    })
};

async function main(para, para2) {
    try {
        var nodeId = "ns=4;s=TRAMXUAT.HangDoi[" + para + "].";
        var maDH = (para2.maHD).toString().split("DO")[1];
        //MaDH và trạng thái
        var nodesTowrite1 = {
            nodeId: nodeId + "MaDH", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.String,
                    value: maDH
                }
            }
        };
        var nodesTowrite2 = {
            nodeId: nodeId + "StatusDH", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Int16,
                    value: 0
                }
            }
        };
        //Ngan1
        var nodesTowrite3 = {
            nodeId: nodeId + "Ngan1",
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.String,
                    value: para2.ngan1
                }
            }
        };
        var nodesTowrite4 = {
            nodeId: nodeId + "Khoiluong1", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: opcua.DataType.Float,
                    value: para2.khoiluong1
                }
            }
        };
        var nodesTowrite5 = {
            nodeId: nodeId + "Status1", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Int16,
                    value: 0
                }
            }
        };
        //Ngan2
        var nodesTowrite6 = {
            nodeId: nodeId + "Ngan2", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.String,
                    value: para2.ngan2
                }
            }
        };
        var nodesTowrite7 = {
            nodeId: nodeId + "Khoiluong2", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: opcua.DataType.Float,
                    value: para2.khoiluong2
                }
            }
        };
        var nodesTowrite8 = {
            nodeId: nodeId + "Status2", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Int16,
                    value: 0
                }
            }
        };
        //Ngan3
        var nodesTowrite9 = {
            nodeId: nodeId + "Ngan3", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.String,
                    value: para2.ngan3
                }
            }
        };
        var nodesTowrite10 = {
            nodeId: nodeId + "Khoiluong3", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: opcua.DataType.Float,
                    value: para2.khoiluong3
                }
            }
        };
        var nodesTowrite11 = {
            nodeId: nodeId + "Status3", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Int16,
                    value: 0
                }
            }
        };
        //Ngan4
        var nodesTowrite12 = {
            nodeId: nodeId + "Ngan4", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.String,
                    value: para2.ngan4
                }
            }
        };
        var nodesTowrite13 = {
            nodeId: nodeId + "Khoiluong4", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: opcua.DataType.Float,
                    value: para2.khoiluong4
                }
            }
        };
        var nodesTowrite14 = {
            nodeId: nodeId + "Status4", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Int16,
                    value: 0
                }
            }
        };
        //Ngan5
        var nodesTowrite15 = {
            nodeId: nodeId + "Ngan5", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.String,
                    value: para2.ngan5
                }
            }
        };
        var nodesTowrite16 = {
            nodeId: nodeId + "Khoiluong5", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: opcua.DataType.Float,
                    value: para2.khoiluong5
                }
            }
        };
        var nodesTowrite17 = {
            nodeId: nodeId + "Status5", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Int16,
                    value: 0
                }
            }
        };
        //Ngan6
        var nodesTowrite18 = {
            nodeId: nodeId + "Ngan6", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.String,
                    value: para2.ngan6
                }
            }
        };
        var nodesTowrite19 = {
            nodeId: nodeId + "Khoiluong6", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: opcua.DataType.Float,
                    value: para2.khoiluong6
                }
            }
        };
        var nodesTowrite20 = {
            nodeId: nodeId + "Status6", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Int16,
                    value: 0
                }
            }
        };
        //Ngan7
        var nodesTowrite21 = {
            nodeId: nodeId + "Ngan7", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.String,
                    value: para2.ngan7
                }
            }
        };
        var nodesTowrite22 = {
            nodeId: nodeId + "Khoiluong7", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: opcua.DataType.Float,
                    value: para2.khoiluong7
                }
            }
        };
        var nodesTowrite23 = {
            nodeId: nodeId + "Status7", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Int16,
                    value: 0
                }
            }
        };
        //Ngan8
        var nodesTowrite24 = {
            nodeId: nodeId + "Ngan8", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.String,
                    value: para2.ngan8
                }
            }
        };
        var nodesTowrite25 = {
            nodeId: nodeId + "Khoiluong8", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: opcua.DataType.Float,
                    value: para2.khoiluong8
                }
            }
        };
        var nodesTowrite26 = {
            nodeId: nodeId + "Status8", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Int16,
                    value: 0
                }
            }
        };
        //Ngan9
        var nodesTowrite27 = {
            nodeId: nodeId + "Ngan9", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.String,
                    value: para2.ngan9
                }
            }
        };
        var nodesTowrite28 = {
            nodeId: nodeId + "Khoiluong9", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            indexRange: null,
            value: {
                value: {
                    dataType: opcua.DataType.Float,
                    value: para2.khoiluong9
                }
            }
        };
        var nodesTowrite29 = {
            nodeId: nodeId + "Status9", //"ns=4;s=MAIN.Test.Description"
            attributeId: opcua.AttributeIds.Value,
            value: {
                value: {
                    dataType: opcua.DataType.Int16,
                    value: 0
                }
            }
        };
        var nodes = [nodesTowrite1, nodesTowrite2, nodesTowrite3, nodesTowrite4, nodesTowrite5, nodesTowrite6, nodesTowrite7, nodesTowrite8, nodesTowrite9, nodesTowrite10, nodesTowrite11, nodesTowrite12, nodesTowrite13, nodesTowrite14, nodesTowrite15, nodesTowrite16, nodesTowrite17, nodesTowrite18, nodesTowrite19, nodesTowrite20, nodesTowrite21, nodesTowrite22, nodesTowrite23, nodesTowrite24, nodesTowrite25, nodesTowrite26, nodesTowrite27, nodesTowrite28, nodesTowrite29];
        //
        await client.connect(endpointUrl);
        const session = await client.createSession();
        var i = 0;
        while (i < 29) {
            let a = await session.write(nodes[i]);
            if (a.name == "Good") {
                i = i + 1;
            } else {
                console.log("err");
            }
        }

        // session.write(nodesTowrite3, (err, result) => {
        //     if (err) {
        //         console.log(err);
        //     } else {
        //         console.log(nodesTowrite3);
        //         console.log(result);
        //     }
        // });
        // await session.write(nodesTowrite3);
        // await session.write(nodesTowrite4);
        // await session.write(nodesTowrite5);
        // await session.write(nodesTowrite6);
        // await session.write(nodesTowrite7);
        // await session.write(nodesTowrite8);
        // await session.write(nodesTowrite9);
        // await session.write(nodesTowrite10);
        if (i == 29) {
            await session.close();
            await client.disconnect();
            return Promise.resolve(true);
        }
    } catch (e) {
        console.log("ERROR TRY: " + e);
    }
}

module.exports = { TramXuat2, main }