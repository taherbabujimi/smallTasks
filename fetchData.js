let data = [
  {
    id: 1,
    name: "de",
    status: 1,
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
    name: "werff",
    dependencies: [3],
    status: 1,
  },
];

function checkDependenciesAndStatus(id) {
  let printed = false;
  let initialIdName = null;

  function fetchData(id, visited = new Set()) {
    let dataFound = false;
    let status = false;
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === id) {
        if (initialIdName === null) {
          initialIdName = data[i].name;
        }
        if (data[i].status === 0) {
          console.log(`${initialIdName}'s Status is 0`);
        } else if (data[i].status === 1 && data[i].dependencies === undefined) {
          console.log(`${initialIdName}'s Status is 1`);
        } else if (data[i].status === 1 && data[i].dependencies !== undefined) {
          for (let j = 0; j < data.length; j++) {
            if (visited.has(data[j].id) === false) {
              if (data[i].dependencies.includes(data[j].id)) {
                status = data[j].status === 1;

                if (!status) break;

                fetchData(data[j].id, new Set(visited), data[i].name);
                visited.add(data[j].id);
              }
            }
          }

          if (printed === false && !status) {
            console.log(
              `One of the ${initialIdName}'s dependencies have status 0`
            );
            printed = true;
          } else if (printed === false && status) {
            console.log(`${initialIdName}'s all dependencies have status 1`);
            printed = true;
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

  checkCircularDependencies(id);

  if (!circularDependencyFound) {
    console.log("No circular dependency exists.");
  }

  fetchData(id);
}

checkDependenciesAndStatus(4);
