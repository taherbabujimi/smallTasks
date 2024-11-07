let data = [
  {
    id: 1,
    name: "de",
    status: 0,
  },
  {
    id: 2,
    name: "fv",
    dependencies: [1],
    status: 1,
  },
  {
    id: 3,
    name: "werf",
    dependencies: [2],
    status: 1,
  },
  {
    id: 4,
    name: "werf",
    dependencies: [3],
    status: 1,
  },
];

let dataName = "";
let depStatus = false;

function fetchData(id, visited = new Set()) {
  let dataFound = false;
  let status = false;
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      if (data[i].status === 1 && data[i].dependencies === undefined) {
        console.log(data[i].name);
      } else if (data[i].status === 0 && data[i].dependencies === undefined) {
        console.log("Data's Status is 0");
      } else if (data[i].status === 1 && data[i].dependencies !== undefined) {
        for (let j = 0; j < data.length; j++) {
          if (visited.has(data[j].id) === false) {
            if (data[i].dependencies.includes(data[j].id)) {
              status = data[j].status === 1;

              if (!status) break;

              fetchData(data[j].id);
              visited.add(data[j].id);
            }
          }
        }

        if (status) {
          console.log(data[i].name);
        } else {
          console.log(`${data[i].name}'s dependencies have status 0`);
        }
      }
      dataFound = true;
      break;
    }
  }

  if (!dataFound) {
    console.log("Data with this id does not exist.");
  }
}

let circularDependencyFound = false;

function checkCircularDependencies(id, visited = new Set(), id2 = null) {
  let dataFound = false;

  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      if (data[i].dependencies) {
        if (visited.has(id)) {
          console.log(`Circular dependency found between (${id2}, ${id})`);
          circularDependencyFound = true;
          return;
        }

        visited.add(id);

        for (let depId of data[i].dependencies) {
          checkCircularDependencies(depId, new Set(visited), id);
        }
      }
      dataFound = true;
      break;
    }
  }

  if (!dataFound) {
    console.log("Data with this id does not exist.");
  }
}

checkCircularDependencies(4);

if (!circularDependencyFound) {
  console.log("No circular dependency exists.");
}

fetchData(4);
