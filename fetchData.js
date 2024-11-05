let data = [
  {
    id: 1,
    name: "de",
    status: 1,
  },
  {
    id: 2,
    name: "fv",
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

for (let i = 0; i < data.length; i++) {
  if (data[i].status === 1 && data[i].dependecies === undefined) {
    console.log(data[i].name);
  } else if (data[i].status === 1 && data[i].dependecies !== undefined) {
    let status = false;
    for (let j = 0; j < data.length; j++) {
      if (data[j].dependecies !== undefined) {
        if (
          data[i].dependecies.includes(data[j].id) &&
          data[j].dependecies.includes(data[i].id)
        ) {
          console.log(
            `Circular dependencies detected between: ${data[i].id} and ${data[j].id}`
          );
        }
      }

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
      console.log(data[i].name, "'s dependencies have status 0");
    }
  }
}
