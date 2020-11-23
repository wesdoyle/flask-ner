const fetchResult = (sent) => {
  fetch('http://localhost:5000/ner', {
      method: 'POST',
      headers: new Headers({ 'content-type': 'application/json' }),
      cache: 'no-cache',
      body: JSON.stringify({ 'sentence': sent })
  }).then(async (response) => {
      if (response.ok) {
        let result = await response.json();
        let labeledDoc = document.getElementById('labeled-doc')
        labeledDoc.innerHTML = result.html;
        return buildNerTable(result.entities);
      }
      return Promise.reject(response);
  }).catch((error) => {
      console.error('Something went wrong.', error);
  });
}

const buildNerTable = (results) => {
  let table = document.getElementById('ner-table');

  results.forEach(result => {
    let row = document.createElement('tr');
    row.classList.add('ner-row');

    let colName = document.createElement('td');
    colName.textContent = result.ent;

    let colType = document.createElement('td');
    colType.textContent = result.label;

    row.appendChild(colName);
    row.appendChild(colType);

    table.appendChild(row);
  })
}

const cleanTable = () => {
  let rows = document.querySelectorAll('.ner-row');
  rows.forEach(row => {
    row.remove();
  })
}

const updateResults = async (userInput) => {
  cleanTable();
  await fetchResult(userInput.value);
}

const init = async () => {
  const submitButton = document.getElementById('find-button');
  const userInput = document.getElementById('input-text');

  submitButton.addEventListener('click', async (e) => {
    await updateResults(userInput);
  })
}

window.onload = (event) => {
  init();
}

