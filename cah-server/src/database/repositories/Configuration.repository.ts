import { ConfigurationAttributes, ConfigurationCreateAttributes, ConfigurationDefinition, ConfigurationUpdateAttributes } from "../definitions/Configuration.definition";
import Repository, { RepositoryOptions } from "./Repository";

export default class ConfigurationRepository extends Repository<ConfigurationAttributes, ConfigurationCreateAttributes, ConfigurationDefinition> {
    
    public constructor(options: RepositoryOptions) {
        super(options);
    }

    public async getCurrent() {
        return await this.secureContext(async (o) => {
            return await ConfigurationDefinition.findOne({
                ...o,
            });
        });
    }

    public async createOrUpdate(data: ConfigurationUpdateAttributes) {
        return await this.secureContext(async (o) => {
            const current = await ConfigurationDefinition.findOne({
                ...o,
            });

            if(current?.get()) {
                return await current.update(data);
            } else {
                return await ConfigurationDefinition.create(data, {
                    ...o,
                });
            }
        });
    }
}