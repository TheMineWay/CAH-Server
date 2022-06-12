type StaticInfo = {
    version: {
        number: string;
        isStable: boolean;
    },
    service: string;
}

export default function getServerInfo(): StaticInfo {
    return {
        version: {
            number: '0.0.1',
            isStable: false,
        },
        service: "cards-against-humanity",
    };
}