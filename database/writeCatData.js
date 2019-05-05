const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter();
const faker = require('faker');
const fakergem = require('fakergem');


//creates actor table
const catGen = () => {
  console.time('timing seed');
  writer.pipe(fs.createWriteStream('catData.csv'));
  for (let i = 0; i < 40; i++) {
    writer.write({
      name: fakergem.Cat.name(),
      breed: fakergem.Cat.breed(),
      image: faker.image.cats(),
      city: faker.address.city(),
      state: faker.address.state(),
    });
  }

  writer.end();
  console.timeEnd('timing seed');
};

catGen();
