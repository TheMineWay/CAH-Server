type StaticInfo = {
    version: {
        number: string;
        isStable: boolean;
    },
}

export default function getServerInfo(): StaticInfo {
    return {
        version: {
            number: '0.0.1',
            isStable: false,
        },
    };
}