require("dotenv").config();
const Express = require("express");
const router = Express.Router();
const app = Express();
const crypto = require("crypto");

// defining port
<<<<<<< HEAD
const port = process.env.PORT || 7000; 
=======
const port = process.env.PORT || 7000;
>>>>>>> 71d8f2e (hashing done)

// For parsing the express payloads
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

function processQueue() {
  if (Q1.length === 0) return;

  Q1.forEach((current) => {
    const uuid = Object.keys(current)[0];
    const string = current[uuid].data;
    let hashedString = crypto.createHash("md5").update(string).digest("hex");

    current[uuid].status = "done";
    current[uuid].hash = hashedString;

    Q2.push(current);
  });

  Q1 = [];
  console.log("Processed Q1 and moved items to Q2:", Q2);

  Q2Process(Q2, Q3);
}

setInterval(processQueue, 20000);

function Q2Process(Q2, Q3) {
  const interval = setInterval(() => {
    Q2.forEach((item, index) => {
      const uuid = Object.keys(item)[0];
      if (item[uuid].status === "done") {
        Q3.push(item);
        Q3Process(Q3, uuid);
        Q2.splice(index, 1);
      }
    });

    if (Q2.length === 0) clearInterval(interval);
  }, 3000);
}

function Q3Process(Q3, uuid) {
  const item = Q3.find((q) => q[uuid]);
  if (item) {
    json.push(item[uuid]);
    console.log("JobID:", json);
    Q3.shift();
  }
}

app.get("/getString", async (req, res) => {
  const { string } = req.body;
  const uuid = uuidv4();

  data = {
    [uuid]: { data: string, status: "pending" },
  };

  Q1.push(data);

  console.log("New data added to Q1:", Q1);

  res.json(data);
});

app.listen(port, () => {
  console.log("Server started on port ", port);
});
