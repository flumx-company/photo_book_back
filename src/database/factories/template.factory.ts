
import * as Faker from "faker"
import { DefaultTemplates } from "src/modules/project-photos/entity/default-template.entity";
import { define } from "typeorm-seeding"

define(DefaultTemplates, (faker: typeof Faker) => new DefaultTemplates());