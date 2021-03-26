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
client.on("backoff", (retry, delay) =>
    console.log("still trying to connect to ", endpointUrl, ": retry =", retry, "next attempt in ", delay / 1000, "seconds")
);
let the_session;
const ScanHangDoi = async function() {
    try {
        var Hangdoi = [];
        var count = 0;
        var the_session;
        await client.connect(endpointUrl);
        the_session = await client.createSession();
        Hangdoi.push(await (await the_session.read(NodeID("ns=4;s=TRAMXUAT.HangDoi[0].MaDH"))).value.value);
        Hangdoi.push(await (await the_session.read(NodeID("ns=4;s=TRAMXUAT.HangDoi[1].MaDH"))).value.value);
        Hangdoi.push(await (await the_session.read(NodeID("ns=4;s=TRAMXUAT.HangDoi[2].MaDH"))).value.value);
        Hangdoi.push(await (await the_session.read(NodeID("ns=4;s=TRAMXUAT.HangDoi[3].MaDH"))).value.value);
        Hangdoi.push(await (await the_session.read(NodeID("ns=4;s=TRAMXUAT.HangDoi[4].MaDH"))).value.value);
        Hangdoi.push(await (await the_session.read(NodeID("ns=4;s=TRAMXUAT.HangDoi[5].MaDH"))).value.value);
        Hangdoi.push(await (await the_session.read(NodeID("ns=4;s=TRAMXUAT.HangDoi[6].MaDH"))).value.value);
        Hangdoi.push(await (await the_session.read(NodeID("ns=4;s=TRAMXUAT.HangDoi[7].MaDH"))).value.value);
        Hangdoi.push(await (await the_session.read(NodeID("ns=4;s=TRAMXUAT.HangDoi[8].MaDH"))).value.value);
        Hangdoi.push(await (await the_session.read(NodeID("ns=4;s=TRAMXUAT.HangDoi[9].MaDH"))).value.value);
        Hangdoi.push(await (await the_session.read(NodeID("ns=4;s=TRAMXUAT.HangDoi[10].MaDH"))).value.value);

        for (x in Hangdoi) {
            if (Hangdoi[x] != "" && Hangdoi[x] != null) {
                count++;
            }
        }
        if (count == 11) {
            return -1;
        } else {
            for (x in Hangdoi) {
                if (Hangdoi[x] == "" || Hangdoi[x] == null) {
                    await the_session.close();
                    await client.disconnect();
                    return Promise.resolve(x);
                }
            }
        }
    } catch (e) {
        console.log(e);
        return -2;
    }
};

function NodeID(para) {
    return nodesTowrite1 = {
        nodeId: para, //"ns=4;s=MAIN.Test.Description"
        attributeId: opcua.AttributeIds.Value,
        value: {
            value: {
                dataType: opcua.DataType.String,
                value: para.nodeValue1
            }
        }
    };
};

module.exports = { ScanHangDoi };