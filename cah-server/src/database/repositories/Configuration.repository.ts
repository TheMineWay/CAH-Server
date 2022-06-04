import { ConfigurationAttributes, ConfigurationCreateAttributes, ConfigurationDefinition, ConfigurationUpdateAttributes } from "../definitions/Configuration.definition";
import Repository, { RepositoryOptions } from "./Repository";

export default class ConfigurationRepository extends Repository<ConfigurationAttributes, ConfigurationCreateAttributes> {
    
    public constructor(options: RepositoryOptions) {
        super(options);
    }

    public async update(id: string, data: ConfigurationUpdateAttributes) {
        return await this.secureContext(async (o) => {
            return await ConfigurationDefinition.update(data, {
                where: {
                    id,
                },
                ...o,
            });
        });
    }
}