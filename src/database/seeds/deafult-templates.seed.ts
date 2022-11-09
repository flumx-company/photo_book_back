import { DefaultTemplates } from "src/modules/project-photos/entity/default-template.entity";
import { Factory, Seeder } from "typeorm-seeding"

export class CreateTemplateSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    const defaultTemplates = [
      {top: 5, left: 5, width: 150, height: 150, borderColor: '#e45ffd4', borderWidth: 1 },
      {top: 10, left: 10, width: 140, height: 140, borderColor: '#e45ffd4', borderWidth: 1 },
      {top: 20, left: 20, width: 130, height: 130, borderColor: '#e45ffd4', borderWidth: 1 },
      {top: 30, left: 30, width: 120, height: 120, borderColor: '#e45ffd4', borderWidth: 1 },
      {top: 40, left: 40, width: 110, height: 110, borderColor: '#e45ffd4', borderWidth: 1 },
    ];
    for (const template of defaultTemplates) {
      await factory(DefaultTemplates)().map(async seed => {
          seed.top = template.top
          seed.left = template.left
          seed.width = template.width
          seed.height = template.height
          seed.borderColor = template.borderColor
          seed.borderWidth =template.borderWidth
          return seed
      }).create()
    }
  }
}