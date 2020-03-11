const baseUrl = 'https://wger.de/';
const select = document.querySelector('select');
const button = document.querySelector('button');
const section = document.querySelector('section');
const checkbox = document.querySelector('#equipment');
const introText = document.querySelector('.intro-text');
let savedItems = [];

if (JSON.parse(localStorage.getItem('savedExercises')) !== null) {
  savedItems = JSON.parse(localStorage.getItem('savedExercises'));
}

window.onload = async function() {
  const res = await axios.get(`${baseUrl}api/v2/exercisecategory/?format=json`);

  res.data.results.forEach(e => {
    const option = document.createElement('option');

    option.innerText = e.name;
    option.value = e.id;
    select.appendChild(option);
  });
};

button.addEventListener('click', async () => {
  let userOptions = select.value;

  if (checkbox.checked) {
    userOptions += '&equipment=7';
  }

  const res = await axios.get(
    `${baseUrl}api/v2/exercise/?language=2&category=${userOptions}&status=2&limit=100`
  );
  console.log(res);
  section.innerHTML = ``;

  const randomExercise = getRandom(res.data.results);
  const container = document.createElement('div');
  container.setAttribute('class', 'exercise-container');

  const title = document.createElement('h3');
  title.innerText = randomExercise.name;
  container.appendChild(title);

  container.innerHTML += `${randomExercise.description}`;
  await getImage(randomExercise.id, container);

  const saveBtn = document.createElement('button');
  saveBtn.setAttribute('class', 'save-button');
  saveBtn.innerText = 'Save';
  saveBtn.addEventListener('click', () => {
    if (!savedItems.includes(randomExercise)) {
      savedItems.push(randomExercise);
      saveExercise(savedItems);
      saveBtn.innerText = 'Saved!';
    }
  });
  container.appendChild(saveBtn);

  section.appendChild(container);
});

// Save Exercises
function saveExercise(arr) {
  if (arr.length > 0) {
    localStorage.setItem('savedExercises', JSON.stringify(arr));
  }
}

// Helper functions
function getRandom(arr) {
  const randomExercise = arr[Math.floor(Math.random() * arr.length)];
  return randomExercise;
}

async function getImage(id, container) {
  let imageUrl = '';
  const image = document.createElement('img');
  const res = await axios.get(`${baseUrl}api/v2/exerciseimage/?exercise=${id}`);

  if (res.data.results.length > 0) {
    imageUrl = res.data.results[0].image;
    image.setAttribute('src', imageUrl);
    container.appendChild(image);
  } else {
    return;
  }
}

const intros = [
  "I'm a robot Drill Sergeant, let me tell you what you're about to do!",
  'Not sure what to do next? Well I got an idea for you!',
  '',
  ''
];
