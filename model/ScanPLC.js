const opcua = require("node-opcua");
const async = require("async");
const { ModelChangeStructureDataType } = require("node-opcua");
const { UpdateTGBDXuat, UpdateTGXXuat } = require("./CRUD");
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
const subscriptionOptions = {
    maxNotificationsPerPublish: 1000,
    publishingEnabled: true,
    requestedLifetimeCount: 100,
    requestedMaxKeepAliveCount: 10,
    requestedPublishingInterval: 1000
};

const monitoringParamaters = {
    samplingInterval: 100,
    discardOldest: true,
    queueSize: 100
};

const client = opcua.OPCUAClient.create(options);
const endpointUrl = "opc.tcp://192.168.30.67:4840";
client.on("backoff", (retry, delay) =>
    console.log("still trying to connect to ", endpointUrl, ": retry =", retry, "next attempt in ", delay / 1000, "seconds")
);
let the_session, the_subscription;

function ScanPLC() {
    client.connect(endpointUrl, function(err) {
        if (err) {
            console.log(" cannot connect to endpoint :", endpointUrl);
            setTimeout(ScanPLC, 5000);
        } else {
            console.log("Connected");
            client.createSession(function(err, session) {
                if (err) {

                } else {
                    console.log("Session is created");
                    the_session = session;
                    the_session.createSubscription2(subscriptionOptions, (err, subscription) => {
                        if (err) {

                        }
                        the_subscription = subscription;
                        the_subscription.on("started", () => {
                            console.log("subscription started for 2 seconds - subscriptionId=", the_subscription.subscriptionId);
                        }).on("keepalive", function() {

                        }).on("terminated", function() {
                            console.log("terminated");
                        });
                        ScanStatusDH("ns=4;s=TRAMXUAT.HangDoi[0].MaDH");
                        ScanStatusDH("ns=4;s=TRAMXUAT.HangDoi[1].MaDH");
                        ScanStatusDH("ns=4;s=TRAMXUAT.HangDoi[2].MaDH");
                        ScanStatusDH("ns=4;s=TRAMXUAT.HangDoi[3].MaDH");
                        ScanStatusDH("ns=4;s=TRAMXUAT.HangDoi[4].MaDH");
                        ScanStatusDH("ns=4;s=TRAMXUAT.HangDoi[5].MaDH");
                        ScanStatusDH("ns=4;s=TRAMXUAT.HangDoi[6].MaDH");
                        ScanStatusDH("ns=4;s=TRAMXUAT.HangDoi[7].MaDH");
                        ScanStatusDH("ns=4;s=TRAMXUAT.HangDoi[8].MaDH");
                        ScanStatusDH("ns=4;s=TRAMXUAT.HangDoi[9].MaDH");
                        ScanStatusDH("ns=4;s=TRAMXUAT.HangDoi[10].MaDH");

                    });
                }
            })
        };
    });
    client.on("connection_failed", (err) => {
        if (err) {
            console.log("connection_failed");
            ScanPLC();
        }
    });
};
module.exports = ScanPLC();

function ScanStatusDH(para) {
    var maDH;
    var a = para.toString().split(".")[1];
    var nodeid = para.toString().split(".")[0] + "." + para.toString().split(".")[1] + ".";
    //"add some monitored items"
    const itemToMonitor = {
        nodeId: opcua.resolveNodeId(para),
        attributeId: opcua.AttributeIds.Value
    };
    const monitoredItem = opcua.ClientMonitoredItem.create(the_subscription, itemToMonitor, monitoringParamaters, opcua.TimestampsToReturn.Both);
    monitoredItem.on("changed", (dataValue) => {
        if (dataValue.value.value != "" && dataValue.value.value != null) {
            maDH = dataValue.value.value;
            console.log(a + " has changed : ", dataValue.value.value);
            readStatus(nodeid + "StatusDH", maDH);
        } else {
            maDH = null;
            console.log(a + " is null");
        }
    });
};

function readStatus(para, maDH) {
    var nodeid = para.toString().split(".")[0] + "." + para.toString().split(".")[1] + ".";
    const itemToMonitor = {
        nodeId: opcua.resolveNodeId(para),
        attributeId: opcua.AttributeIds.Value
    };
    const monitoredItem = opcua.ClientMonitoredItem.create(the_subscription, itemToMonitor, monitoringParamaters, opcua.TimestampsToReturn.Both);
    monitoredItem.on("changed", (dataValue) => {
        if (dataValue.value.value != null) {
            var statusDH = parseInt(dataValue.value.value);
            switch (statusDH) {
                case 0:
                    console.log(maDH + " đang chờ");
                    break;
                case 1:
                    //Cập nhật trạng thái bắt đầu xuất của đơn hàng
                    UpdateTGBDXuat([new Date(Date.now()), "DO" + maDH]).then(result => {
                        console.log(result);
                    }).catch(err => {
                        console.log(err);
                    });
                    //Đọc trạng thái của từng ngăn theo đơn hàng
                    readNgan(nodeid, maDH);
                    console.log(maDH + " đang xuất");
                    break;
                case 2:
                    //Cập nhật trạng thái đã xuất xong của đơn hàng - Hoàn thành & TGXong
                    UpdateTGXXuat([new Date(Date.now()), "DO" + maDH]).then(result => {
                        console.log(result);
                    }).catch(err => {
                        console.log(err);
                    });
                    console.log(maDH + " đã xuất xong");
                    break;
                default:
                    break;
            }
        } else {
            console.log("ERROR")
        }
    });
};

function readNgan(para, maDH) {
    const itemToMonitor1 = {
        nodeId: opcua.resolveNodeId(para + "Ngan1"),
        attributeId: opcua.AttributeIds.Value
    };
    const itemToMonitor2 = {
        nodeId: opcua.resolveNodeId(para + "Ngan2"),
        attributeId: opcua.AttributeIds.Value
    };
    const itemToMonitor3 = {
        nodeId: opcua.resolveNodeId(para + "Ngan3"),
        attributeId: opcua.AttributeIds.Value
    };
    const itemToMonitor4 = {
        nodeId: opcua.resolveNodeId(para + "Ngan4"),
        attributeId: opcua.AttributeIds.Value
    };
    const itemToMonitor5 = {
        nodeId: opcua.resolveNodeId(para + "Ngan5"),
        attributeId: opcua.AttributeIds.Value
    };
    const itemToMonitor6 = {
        nodeId: opcua.resolveNodeId(para + "Ngan6"),
        attributeId: opcua.AttributeIds.Value
    };
    const itemToMonitor7 = {
        nodeId: opcua.resolveNodeId(para + "Ngan7"),
        attributeId: opcua.AttributeIds.Value
    };
    const itemToMonitor8 = {
        nodeId: opcua.resolveNodeId(para + "Ngan8"),
        attributeId: opcua.AttributeIds.Value
    };
    const itemToMonitor9 = {
        nodeId: opcua.resolveNodeId(para + "Ngan9"),
        attributeId: opcua.AttributeIds.Value
    };
    //
    const monitoredItem1 = opcua.ClientMonitoredItem.create(the_subscription, itemToMonitor1, monitoringParamaters, opcua.TimestampsToReturn.Both);
    const monitoredItem2 = opcua.ClientMonitoredItem.create(the_subscription, itemToMonitor2, monitoringParamaters, opcua.TimestampsToReturn.Both);
    const monitoredItem3 = opcua.ClientMonitoredItem.create(the_subscription, itemToMonitor3, monitoringParamaters, opcua.TimestampsToReturn.Both);
    const monitoredItem4 = opcua.ClientMonitoredItem.create(the_subscription, itemToMonitor4, monitoringParamaters, opcua.TimestampsToReturn.Both);
    const monitoredItem5 = opcua.ClientMonitoredItem.create(the_subscription, itemToMonitor5, monitoringParamaters, opcua.TimestampsToReturn.Both);
    const monitoredItem6 = opcua.ClientMonitoredItem.create(the_subscription, itemToMonitor6, monitoringParamaters, opcua.TimestampsToReturn.Both);
    const monitoredItem7 = opcua.ClientMonitoredItem.create(the_subscription, itemToMonitor7, monitoringParamaters, opcua.TimestampsToReturn.Both);
    const monitoredItem8 = opcua.ClientMonitoredItem.create(the_subscription, itemToMonitor8, monitoringParamaters, opcua.TimestampsToReturn.Both);
    const monitoredItem9 = opcua.ClientMonitoredItem.create(the_subscription, itemToMonitor9, monitoringParamaters, opcua.TimestampsToReturn.Both);
    //
    monitoredItem1.on("changed", (dataValue) => {
        if (dataValue.value.value != "" && dataValue.value.value != null) {
            readStatusNgan(para + "Status1", maDH);
        } else {
            console.log(maDH + " ngăn 1 không xuất");
        }
    });
    monitoredItem2.on("changed", (dataValue) => {
        if (dataValue.value.value != "" && dataValue.value.value != null) {
            readStatusNgan(para + "Status2", maDH);
        } else {
            console.log(maDH + " ngăn 2 không xuất");
        }
    });
    monitoredItem3.on("changed", (dataValue) => {
        if (dataValue.value.value != "" && dataValue.value.value != null) {
            readStatusNgan(para + "Status3", maDH);
        } else {
            console.log(maDH + " ngăn 3 không xuất");
        }
    });
    monitoredItem4.on("changed", (dataValue) => {
        if (dataValue.value.value != "" && dataValue.value.value != null) {
            readStatusNgan(para + "Status4", maDH);
        } else {
            console.log(maDH + " ngăn 4 không xuất");
        }
    });
    monitoredItem5.on("changed", (dataValue) => {
        if (dataValue.value.value != "" && dataValue.value.value != null) {
            readStatusNgan(para + "Status5", maDH);
        } else {
            console.log(maDH + " ngăn 5 không xuất");
        }
    });
    monitoredItem6.on("changed", (dataValue) => {
        if (dataValue.value.value != "" && dataValue.value.value != null) {
            readStatusNgan(para + "Status6", maDH);
        } else {
            console.log(maDH + " ngăn 6 không xuất");
        }
    });
    monitoredItem7.on("changed", (dataValue) => {
        if (dataValue.value.value != "" && dataValue.value.value != null) {
            readStatusNgan(para + "Status7", maDH);
        } else {
            console.log(maDH + " ngăn 7 không xuất");
        }
    });
    monitoredItem8.on("changed", (dataValue) => {
        if (dataValue.value.value != "" && dataValue.value.value != null) {
            readStatusNgan(para + "Status8", maDH);
        } else {
            console.log(maDH + " ngăn 8 không xuất");
        }
    });
    monitoredItem9.on("changed", (dataValue) => {
        if (dataValue.value.value != "" && dataValue.value.value != null) {
            readStatusNgan(para + "Status9", maDH);
        } else {
            console.log(maDH + " ngăn 9 không xuất");
        }
    });
};

function readStatusNgan(para, maDH) {
    var a = para.toString().split(".")[2];
    const itemToMonitor = {
        nodeId: opcua.resolveNodeId(para),
        attributeId: opcua.AttributeIds.Value
    };
    const monitoredItem = opcua.ClientMonitoredItem.create(the_subscription, itemToMonitor, monitoringParamaters, opcua.TimestampsToReturn.Both);
    monitoredItem.on("changed", (dataValue) => {
        if (dataValue.value.value != null) {
            var statusDH = parseInt(dataValue.value.value);
            switch (statusDH) {
                case 0:
                    console.log(maDH + " " + a + " đang chờ");
                    break;
                case 1:
                    console.log(maDH + " " + a + " đang xuất");
                    break;
                case 2:
                    console.log(maDH + " " + a + " đã xuất xong");
                    //Đọc dữ liệu của sản phẩm cho ngăn
                    /*
                    
                     */
                    break;
                default:
                    break;
            }
        } else {
            console.log("ERROR")
        }
    });
}

//