import { Point } from "@influxdata/influxdb-client";
import { exec } from "child_process";
import { getWriteApi } from "../influxdb/getWriteApi";

const measuementName = "internet_speed";

export const internetSpeed = () => {
    exec("speedtest -f json", (error, stdout, stderr) => {
        if (error) {
            console.log(stderr);
            return;
        }
        const result: SpeedtestResult = JSON.parse(stdout);
        // bandwidthはB/sのため、bytes/sに変換
        const download = result.download.bandwidth * 8;
        const upload = result.upload.bandwidth * 8;
        const resultUrl = result.result.url;
        const logLines = [
            `  Download: ${(download / 1000000).toFixed(2)} Mbps`,
            `    Upload: ${(upload / 1000000).toFixed(2)} Mbps`,
            `Result URL: ${resultUrl}`,
        ];
        console.log(logLines.join("\n"));
        const writeApi = getWriteApi();
        writeApi.writePoints([
            // Pingレイテンシ
            new Point(measuementName)
                .tag("type", "latency")
                .floatField("value", result.ping.latency),
            // ダウンロード（B/s）
            new Point(measuementName)
                .tag("type", "download")
                .floatField("value", download),
            // アップロード（B/s）
            new Point(measuementName)
                .tag("type", "upload")
                .floatField("value", upload),
            // パケットロス
            new Point(measuementName)
                .tag("type", "packet_loss")
                .floatField("value", result.packetLoss),
        ]);
        writeApi.close().then(() => {
            console.log("Internet speed data sent");
        });
    });
};
