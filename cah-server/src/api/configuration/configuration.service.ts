import { Injectable } from '@nestjs/common';
import { ConfigurationCreateAttributes } from 'src/database/definitions/Configuration.definition';
import ConfigurationRepository from 'src/database/repositories/Configuration.repository';

@Injectable()
export class ConfigurationService {
    constructor() {}

    async getConfiguration() {
        const configurationRepository = new ConfigurationRepository({});
        const conf = (await configurationRepository.getCurrent())?.get() ?? undefined;
        await configurationRepository.commit();
        return conf;
    }

    async setConfiguration(data: ConfigurationCreateAttributes) {
        const configurationRepository = new ConfigurationRepository({});
        const conf = (await configurationRepository.createOrUpdate(data))?.get();
        await configurationRepository.commit();
        return conf;
    }
}