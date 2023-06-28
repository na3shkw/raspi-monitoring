interface SpeedtestResult {
    type: string;
    timestamp: string;
    ping: {
        jitter: number;
        latency: number;
        low: number;
        high: number;
    };
    download: {
        bandwidth: number;
        bytes: number;
        elapsed: number;
        latency: {
            iqm: number;
            low: number;
            high: number;
            jitter: number;
        };
    };
    upload: {
        bandwidth: number;
        bytes: number;
        elapsed: number;
        latency: {
            iqm: number;
            low: number;
            high: number;
            jitter: number;
        };
    };
    packetLoss: number;
    isp: string;
    interface: {
        internalIp: string;
        name: string;
        macAddr: string;
        isVpn: false;
        externalIp: string;
    };
    server: {
        id: number;
        host: string;
        port: number;
        name: string;
        location: string;
        country: string;
        ip: string;
    };
    result: {
        id: string;
        url: string;
        persisted: true;
    };
    error?: string;
}

interface SpeedtestServerList {
    type: string;
    timestamp: string;
    servers: {
        id: number;
        host: string;
        port: number;
        name: string;
        location: string;
        country: string;
    }[];
}
