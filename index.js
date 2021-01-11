const express = require("express");
const states = require("./data/states.json");
const cities = require("./data/cities.json");
const app = express();
const port = 8080;

const departments = states.states.filter((s) => s.id_country === 110);

app.get("/", (req, res) => {
  res.send({
    departments: departments.map((s) => {
      return { id: s.id, name: s.name };
    }),
  });
});

app.get("/ciudades", (req, res) => {
  res.send({
    cities: cities.cities
      .filter((c) => !!departments.some((d) => d.id === c.id_state))
      .map((c) => {
        return { id: c.id, department_id: c.id_state, name: c.name };
      }),
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
