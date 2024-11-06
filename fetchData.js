let data = [
  {
    id: 1,
    name: "de",
    status: 1,
  },
  {
    id: 2,
    name: "fv",
    dependecies: [3],
    status: 1,
  },
  {
    id: 3,
    name: "werf",
    dependecies: [2, 1],
    status: 1,
  },
  {
    id: 4,
    name: "werf",
    dependecies: [3, 1],
    status: 0,
  },
];

function fetchData(id) {
  let dataFound = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      if (data[i].status === 1 && data[i].dependecies === undefined) {
        console.log(data[i].name);
      } else if (data[i].status === 1 && data[i].dependecies !== undefined) {
        let status = false;
        for (let j = 0; j < data.length; j++) {
          if (data[i].dependecies.includes(data[j].id)) {
            if (data[j].status === 1) {
              status = true;
            } else {
              status = false;
            }
          }
        }

        if (status === true) {
          console.log(data[i].name);
        } else {
          console.log(data[i].name, "'s dependecies have status 0");
        }
      }
      dataFound = true;
      break;
    }
  }

  if (dataFound === false) {
    console.log("Data with this id not exists.");
  }
}

function checkCirculardependecies(id, visited = new Set()) {
  let dataFound = false;

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      if (data[i].dependecies !== undefined) {
        if (visited.has(id)) {
          console.log(`Circular dependencies detected at: ${id}`);
          return;
        } else {
          console.log(`Does Not found any Circular dependencies.`);
        }

        visited.add(id);

        for (let j = 0; j < data[i].dependecies.length; j++) {
          let depId = data[i].dependecies[j];
          checkCirculardependecies(depId, visited);
        }
      }
      dataFound = true;
      break;
    }
  }

  if (dataFound === false) {
    console.log("Data with this id does not exist.");
  }
}

fetchData(3);
checkCirculardependecies(4);
