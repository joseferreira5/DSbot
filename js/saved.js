const savedContainer = document.querySelector('.results-container');
const clearAll = document.querySelector('.clear-all');

window.onload = function() {
  const savedExercises = JSON.parse(localStorage.getItem('savedExercises'));
  console.log(savedExercises);

  if (savedExercises) {
    savedExercises.forEach(e => {
      const container = document.createElement('div');
      const title = document.createElement('h3');

      title.innerText = e.name;
      container.appendChild(title);
      container.innerHTML += `${e.description}`;
      container.setAttribute('class', 'exercise-container saved');

      if (savedExercises.length > 1) {
        const deleteBtn = document.createElement('button');
        deleteBtn.innerText = 'X';
        deleteBtn.setAttribute('class', 'delete-button');
        container.appendChild(deleteBtn);
      }

      savedContainer.appendChild(container);
    });
  } else {
    savedContainer.innerHTML = `<p>You don't have anything saved here!</p>`;
    clearAll.style.display = 'none';
  }
};

clearAll.addEventListener('click', () => {
  savedContainer.innerHTML = `<p>All gone! Let's get back to work!</p>`;
  clearAll.style.display = 'none';
  localStorage.clear();
});
