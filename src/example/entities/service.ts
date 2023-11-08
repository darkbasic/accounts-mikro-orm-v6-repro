import { getServiceSchema, Service as AccountsService } from "@accounts/mikro-orm";
import { User } from "./user";

export const ServiceSchema = getServiceSchema({ UserEntity: User });

export const Service = AccountsService<User>;
