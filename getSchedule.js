// Para esse requisito, tive que fazer alguns pr's e fiz a minha lógica baseada em cima do pr do Gabriel Rodrigues.
// Segue o link do pull-request: https://github.com/tryber/sd-018-b-project-zoo-functions/pull/111/commits/42968fa341a6b15ff9b7e2f1ead897342e56c4de

const { species } = require('../data/zoo_data');
const { hours } = require('../data/zoo_data');

const chaves = Object.keys(hours);

function officialTime(day) {
  if (day === 'Monday') return 'CLOSED';
  const horario = hours[day];
  return `Open from ${horario.open}am until ${horario.close}pm`;
}

function animalsByDay(day) {
  const animalsDay = [];
  if (day === 'Monday') return 'The zoo will be closed!';
  species
    .filter((specie) => specie.availability.includes(day))
    .forEach((anim) => animalsDay.push(anim.name));
  return animalsDay;
}

function allHours() {
  const obj = {};
  chaves.forEach((day) => {
    obj[day] = {
      officeHour: officialTime(day),
      exhibition: animalsByDay(day),
    };
  });
  return obj;
}

function resultFinal(verifyItemByAnimal, verifyItemByDay, ...scheduleTarget) {
  if (verifyItemByAnimal) {
    return species
      .find((specie) => specie.name === scheduleTarget[0]).availability;
  }
  if (verifyItemByDay) {
    const objet = {};
    scheduleTarget.forEach((dayByWeek) => {
      objet[dayByWeek] = {
        officeHour: officialTime(dayByWeek),
        exhibition: animalsByDay(dayByWeek),
      };
    });
    return objet;
  }
}

function getSchedule(scheduleTarget) {
  // seu código aqui
  if (!scheduleTarget) return allHours();
  if (scheduleTarget) {
    const verifyItemByAnimal = species.some((specie) => specie.name === scheduleTarget);
    const verifyItemByDay = chaves.includes(scheduleTarget);
    if (!verifyItemByAnimal && !verifyItemByDay) return allHours();
    return resultFinal(verifyItemByAnimal, verifyItemByDay, scheduleTarget);
  }
}

module.exports = getSchedule;
