require("dotenv").config();
const Express = require("express");
const crypto = require("crypto");

const app = Express();
const port = process.env.PORT || 7000;

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));

// CORS permission
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  next();
});

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

let data = {};
let json = [];
let Q1 = [];
let Q2 = [];
let Q3 = [];

function processQ1() {
  if (Q1.length > 0) {
    const current = Q1.shift();
    const uuid = Object.keys(current)[0];

    setTimeout(() => {
      const string = current[uuid].data;
      const hashedString = crypto
        .createHash("md5")
        .update(string)
        .digest("hex");

      current[uuid].status = "done";
      current[uuid].hash = hashedString;

      Q2.push(current);
      console.log("Processed item from Q1 to Q2:", current);
    }, 20000);
  }
}

function processQ2() {
  if (Q2.length > 0) {
    const current = Q2.shift();
    const uuid = Object.keys(current)[0];

    if (current[uuid].status === "done") {
      Q3.push(current);
      console.log("Processed item from Q2 to Q3:", current);
    }
  }
}

function processQ3() {
  if (Q3.length > 0) {
    const current = Q3.shift();
    const uuid = Object.keys(current)[0];

    json.push(current[uuid]);
    console.log("Final job processed and added to JSON output:", json);
  }
}

setInterval(processQ1, 1000);
setInterval(processQ2, 3000);
setInterval(processQ3, 3000);

app.post("/getString", async (req, res) => {
  const { string } = req.body;
  const uuid = uuidv4();

  data = {
    [uuid]: { data: string, status: "pending" },
  };

  Q1.push(data);
  console.log("New data added to Q1:", data);

  res.json(data);
});

app.listen(port, () => {
  console.log("Server started on port", port);  
});
