const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors({ origin: "http://localhost:4200" }));
app.use(express.json());

const DB_PATH = path.join(__dirname, "db.json");
const JWT_SECRET = "amelie_secret_change_me"; 

function readDb() {
  if (!fs.existsSync(DB_PATH)) {
    const init = {
      users: [
        // default admin
        { id: 1, email: "admin@amelie.ge", passwordHash: bcrypt.hashSync("admin123", 10), role: "admin" }
      ]
    };
    fs.writeFileSync(DB_PATH, JSON.stringify(init, null, 2), "utf-8");
  }
  return JSON.parse(fs.readFileSync(DB_PATH, "utf-8"));
}

function writeDb(db) {
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2), "utf-8");
}

function signToken(user) {
  return jwt.sign(
    { sub: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

app.get("/", (req, res) => res.json({ ok: true }));

app.post("/signup", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "email და password აუცილებელია" });

  const db = readDb();
  const exists = db.users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
  if (exists) return res.status(409).json({ message: "ეს email უკვე არსებობს" });

  const id = (db.users.at(-1)?.id || 0) + 1;
  const passwordHash = await bcrypt.hash(String(password), 10);

  const user = { id, email: String(email), passwordHash, role: "user" };
  db.users.push(user);
  writeDb(db);

  const token = signToken(user);
  res.json({ token, user: { email: user.email, role: user.role } });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ message: "email და password აუცილებელია" });

  const db = readDb();
  const user = db.users.find(u => u.email.toLowerCase() === String(email).toLowerCase());
  if (!user) return res.status(401).json({ message: "არასწორი მონაცემები" });

  const ok = await bcrypt.compare(String(password), user.passwordHash);
  if (!ok) return res.status(401).json({ message: "არასწორი მონაცემები" });

  const token = signToken(user);
  res.json({ token, user: { email: user.email, role: user.role } });
});

// JWT middleware (დაცული endpoint-ისთვის)
function requireAuth(req, res, next) {
  const h = req.headers.authorization || "";
  const token = h.startsWith("Bearer ") ? h.slice(7) : null;
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// test protected
app.get("/me", requireAuth, (req, res) => {
  res.json({ user: req.user });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`API running http://localhost:${PORT}`));
