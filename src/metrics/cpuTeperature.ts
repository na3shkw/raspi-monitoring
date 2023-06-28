import { Point } from "@influxdata/influxdb-client";
import { exec } from "child_process";
import { getWriteApi } from "../influxdb/getWriteApi";

export const cpuTemperature = () => {
    exec("vcgencmd measure_temp | cut -c 6-9", (error, stdout, stderr) => {
        if (error) {
            console.log(stderr);
            return;
        }
        const temperature = Number(stdout.replace("\n", ""));
        const writeApi = getWriteApi();
        writeApi.writePoint(
            new Point("cpu_temperature").floatField("value", temperature)
        );
        writeApi.close().then(() => {
            console.log("CPU Temparature data sent");
        });
    });
};
