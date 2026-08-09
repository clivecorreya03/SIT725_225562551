/**
 * SIT725 – 5.3D Validation Tests (MANDATORY TEMPLATE)
 *
 * HOW TO RUN: (Node.js 18+ is required)
 *   1. Start MongoDB
 *   2. Start your server (npm start)
 *   3. node validation-tests.js
 *
 * DO NOT MODIFY:
 *   - Output format (TEST|, SUMMARY|, COVERAGE|)
 *   - test() function signature
 *   - Exit behaviour
 *   - coverageTracker object
 *   - Logging structure
 *
 * YOU MUST:
 *   - Modify makeValidBook() to satisfy your schema rules
 *   - Add sufficient tests to meet coverage requirements
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_BASE = "/api/books";

// =============================
// INTERNAL STATE (DO NOT MODIFY)
// =============================

const results = [];

const coverageTracker = {
  CREATE_FAIL: 0,
  UPDATE_FAIL: 0,
  TYPE: 0,
  REQUIRED: 0,
  BOUNDARY: 0,
  LENGTH: 0,
  TEMPORAL: 0,
  UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0,
  IMMUTABLE: 0,
};

// =============================
// OUTPUTS FORMAT (DO NOT MODIFY)
// =============================

function logHeader(uniqueId) {
  console.log("SIT725_VALIDATION_TESTS");
  console.log(`BASE_URL=${BASE_URL}`);
  console.log(`API_BASE=${API_BASE}`);
  console.log(`INFO|Generated uniqueId=${uniqueId}`);
}

function logResult(r) {
  console.log(
    `TEST|${r.id}|${r.name}|${r.method}|${r.path}|expected=${r.expected}|actual=${r.actual}|pass=${r.pass ? "Y" : "N"}`
  );
}

function logSummary() {
  const failed = results.filter(r => !r.pass).length;
  console.log(
    `SUMMARY|pass=${failed === 0 ? "Y" : "N"}|failed=${failed}|total=${results.length}`
  );
  return failed === 0;
}

function logCoverage() {
  console.log(
    `COVERAGE|CREATE_FAIL=${coverageTracker.CREATE_FAIL}` +
    `|UPDATE_FAIL=${coverageTracker.UPDATE_FAIL}` +
    `|TYPE=${coverageTracker.TYPE}` +
    `|REQUIRED=${coverageTracker.REQUIRED}` +
    `|BOUNDARY=${coverageTracker.BOUNDARY}` +
    `|LENGTH=${coverageTracker.LENGTH}` +
    `|TEMPORAL=${coverageTracker.TEMPORAL}` +
    `|UNKNOWN_CREATE=${coverageTracker.UNKNOWN_CREATE}` +
    `|UNKNOWN_UPDATE=${coverageTracker.UNKNOWN_UPDATE}` +
    `|IMMUTABLE=${coverageTracker.IMMUTABLE}`
  );
}

// =============================
// HTTP HELPER
// =============================

async function http(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  return { status: res.status, text };
}

// =============================
// TEST REGISTRATION FUNCTION
// =============================

async function test({ id, name, method, path, expected, body, tags }) {

  const { status } = await http(method, path, body);
  const pass = status === expected;

  const result = { id, name, method, path, expected, actual: status, pass };
  results.push(result);
  logResult(result);

  // treat missing or invalid tags as []
  const safeTags = Array.isArray(tags) ? tags : [];

  safeTags.forEach(tag => {
    if (Object.prototype.hasOwnProperty.call(coverageTracker, tag)) {
      coverageTracker[tag]++;
    }
  });
}

// =============================
// STUDENT MUST MODIFY THESE
// =============================
function makeValidBook(id) {
  return {
    id,
    title: "Valid Book Title",
    author: "Valid Author",
    year: 2020,
    genre: "Fiction",
    summary: "This is a valid summary for validation testing.",
    price: "19.99"
  };
}

function makeValidUpdate() {
  return {
    title: "Updated Book Title",
    author: "Updated Author",
    year: 2021,
    genre: "Fiction",
    summary: "This is an updated valid book summary.",
    price: "25.50"
  };
}


// =============================
// REQUIRED BASE TESTS (DO NOT REMOVE)
// =============================

async function run() {

  const uniqueId = `b${Date.now()}`;
  logHeader(uniqueId);

  const createPath = API_BASE;
  const updatePath = (id) => `${API_BASE}/${id}`;

  // ---- T01 Valid CREATE ----
  await test({
    id: "T01",
    name: "Valid create",
    method: "POST",
    path: createPath,
    expected: 201,
    body: makeValidBook(uniqueId),
    tags: []
  });

  // ---- T02 Duplicate ID ----
  await test({
    id: "T02",
    name: "Duplicate ID",
    method: "POST",
    path: createPath,
    expected: 409,
    body: makeValidBook(uniqueId),
    tags: ["CREATE_FAIL"]
  });

  // ---- T03 Immutable ID ----
  await test({
    id: "T03",
    name: "Immutable ID on update",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), id: "b999" },
    tags: ["UPDATE_FAIL", "IMMUTABLE"]
  });

  // ---- T04 Unknown field CREATE ----
  await test({
    id: "T04",
    name: "Unknown field CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: { ...makeValidBook(`b${Date.now()+1}`), hack: true },
    tags: ["CREATE_FAIL", "UNKNOWN_CREATE"]
  });

  // ---- T05 Unknown field UPDATE ----
  await test({
    id: "T05",
    name: "Unknown field UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: { ...makeValidUpdate(), hack: true },
    tags: ["UPDATE_FAIL", "UNKNOWN_UPDATE"]
  });

    // ---- T06 Missing title CREATE ----
  {
    const body = makeValidBook(`b${Date.now()+6}`);
    delete body.title;

    await test({
      id: "T06",
      name: "Missing title CREATE",
      method: "POST",
      path: createPath,
      expected: 400,
      body,
      tags: ["CREATE_FAIL", "REQUIRED"]
    });
  }


  // ---- T07 Missing author CREATE ----
  {
    const body = makeValidBook(`b${Date.now()+7}`);
    delete body.author;

    await test({
      id: "T07",
      name: "Missing author CREATE",
      method: "POST",
      path: createPath,
      expected: 400,
      body,
      tags: ["CREATE_FAIL", "REQUIRED"]
    });
  }


  // ---- T08 Invalid year type CREATE ----
  await test({
    id: "T08",
    name: "Invalid year type CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+8}`),
      year: "not-a-year"
    },
    tags: ["CREATE_FAIL", "TYPE"]
  });


  // ---- T09 Year below boundary CREATE ----
  await test({
    id: "T09",
    name: "Year below minimum boundary",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+9}`),
      year: 999
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });


  // ---- T10 Future year CREATE ----
  await test({
    id: "T10",
    name: "Future publication year",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+10}`),
      year: new Date().getFullYear() + 1
    },
    tags: [
      "CREATE_FAIL",
      "BOUNDARY",
      "TEMPORAL"
    ]
  });


  // ---- T11 Title too short CREATE ----
  await test({
    id: "T11",
    name: "Title too short CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+11}`),
      title: "A"
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });


  // ---- T12 Title too long CREATE ----
  await test({
    id: "T12",
    name: "Title too long CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+12}`),
      title: "A".repeat(121)
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });


  // ---- T13 Summary too short CREATE ----
  await test({
    id: "T13",
    name: "Summary too short CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+13}`),
      summary: "short"
    },
    tags: ["CREATE_FAIL", "LENGTH"]
  });


  // ---- T14 Negative price CREATE ----
  await test({
    id: "T14",
    name: "Negative price CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+14}`),
      price: "-1.00"
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });


  // ---- T15 Zero price CREATE ----
  await test({
    id: "T15",
    name: "Zero price CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+15}`),
      price: "0"
    },
    tags: ["CREATE_FAIL", "BOUNDARY"]
  });


  // ---- T16 Invalid price type CREATE ----
  await test({
    id: "T16",
    name: "Invalid price CREATE",
    method: "POST",
    path: createPath,
    expected: 400,
    body: {
      ...makeValidBook(`b${Date.now()+16}`),
      price: "abc"
    },
    tags: ["CREATE_FAIL", "TYPE"]
  });


  // ---- T17 Invalid UPDATE title length ----
  await test({
    id: "T17",
    name: "Invalid title length UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      title: "A"
    },
    tags: ["UPDATE_FAIL", "LENGTH"]
  });


  // ---- T18 Invalid UPDATE future year ----
  await test({
    id: "T18",
    name: "Future year UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      year: new Date().getFullYear() + 1
    },
    tags: [
      "UPDATE_FAIL",
      "TEMPORAL",
      "BOUNDARY"
    ]
  });


  // ---- T19 Invalid UPDATE price ----
  await test({
    id: "T19",
    name: "Invalid price UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      price: "-5.00"
    },
    tags: ["UPDATE_FAIL", "BOUNDARY"]
  });


  // ---- T20 Valid UPDATE ----
  await test({
    id: "T20",
    name: "Valid UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 200,
    body: makeValidUpdate(),
    tags: []
  });


  // ---- T21 Missing summary CREATE ----
  {
    const body = makeValidBook(`b${Date.now()+21}`);
    delete body.summary;

    await test({
      id: "T21",
      name: "Missing summary CREATE",
      method: "POST",
      path: createPath,
      expected: 400,
      body,
      tags: ["CREATE_FAIL", "REQUIRED"]
    });
  }


  // ---- T22 Invalid genre length UPDATE ----
  await test({
    id: "T22",
    name: "Genre too short UPDATE",
    method: "PUT",
    path: updatePath(uniqueId),
    expected: 400,
    body: {
      ...makeValidUpdate(),
      genre: "A"
    },
    tags: ["UPDATE_FAIL", "LENGTH"]
  });


  const pass = logSummary();
  logCoverage();

  process.exit(pass ? 0 : 1);
}

run().catch(err => {
  console.error("ERROR", err);
  process.exit(2);
});
