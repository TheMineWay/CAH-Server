import { InventoryAttributes, InventoryCreateAttributes, InventoryDefinition } from "../definitions/Inventory.definition";
import Repository, { RepositoryOptions, RepositoryQueryOptions } from "./Repository";

export default class InventoryRepository extends Repository<InventoryAttributes, InventoryCreateAttributes, InventoryDefinition> {
    public constructor(options: RepositoryOptions) {
        super(options);
    }

    public async create(data: InventoryCreateAttributes) {
        return await this.secureContext(async (o) => {
            return await InventoryDefinition.create(data, {
                ...o,
            });
        });
    }

    public async getById(id: string, options?: RepositoryQueryOptions<InventoryAttributes>) {
        return await this.secureContext(async (o) => {
            return await InventoryDefinition.findByPk(id, {
                ...o,
                ...(await this.opts(options)),
            });
        });
    }

    public async getAll(options?: RepositoryQueryOptions<InventoryAttributes>) {
        return await this.secureContext(async (o) => {
            return await InventoryDefinition.findAll({
                ...o,
                ...(await this.opts(options)),
            });
        });
    }
}