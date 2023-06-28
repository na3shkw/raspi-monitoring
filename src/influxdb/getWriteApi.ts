import * as dotenv from "dotenv";
dotenv.config();
import { influxDB } from "./influxdb";

export const getWriteApi = () => {
    return influxDB.getWriteApi(
        `${process.env.INFLUX_ORG}`,
        `${process.env.INFLUX_BUCKET}`
    );
};
