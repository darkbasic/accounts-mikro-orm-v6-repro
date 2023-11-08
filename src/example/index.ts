import 'reflect-metadata';
import { Constructor } from '@mikro-orm/core';
import { User as CustomUser, User } from './entities/user';
import { Email as CustomEmail } from './entities/email';
import { Email, IUser } from '@accounts/mikro-orm';
import { MikroORM } from '@mikro-orm/postgresql';
import config from "./mikro-orm-config";
import { Service } from './entities/service';

void (async () => {
  interface AccountsMikroORMModuleConfig<
    CustomUser extends IUser<any, any, any>,
    CustomEmail extends Email<any>,
    //CustomSession extends Session<any>,
    //CustomService extends Service<any>,
  > {
    UserEntity?: Constructor<CustomUser | IUser<any, any, any>>;
    EmailEntity?: Constructor<CustomEmail | Email<any>>;
    //SessionEntity?: Constructor<CustomSession | Session<any>>;
    //ServiceEntity?: Constructor<CustomService | Service<any>>;
  }

  const test: AccountsMikroORMModuleConfig<CustomUser, CustomEmail> = {
    UserEntity: CustomUser,
    EmailEntity: CustomEmail,
  };
  console.log(test);

  const orm = await MikroORM.init(config);
  /*
  (alias) const Service: {
    new ({ name, user, password }: ServiceCtorArgs<User>): AccountsService<User>;
    prototype: AccountsService<any>;
  }
  import Service
  */
  const users = await orm.em.find(User, {}); // Loaded<CustomUser<any>, never>[]
  const emails = await users[0].emails.loadItems(); // Loaded<CustomEmail, never>[]
  const services = await orm.em.find(Service, {}); // Loaded<Service<any>, never>[]
  const user = await services[0].user.load(); // any
  const anotherUser = await new Service({} as any).user.load(); // CustomUser
})();
