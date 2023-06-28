import * as dotenv from "dotenv";
dotenv.config();
import { InfluxDB } from "@influxdata/influxdb-client";

export const influxDB = new InfluxDB({
    url: `${process.env.INFLUX_URL}`,
    token: process.env.INFLUX_TOKEN,
});
