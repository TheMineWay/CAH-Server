import { Injectable } from '@nestjs/common';
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
}