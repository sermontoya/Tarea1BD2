const express = require("express");
const sql = require("mssql");
const dbConfig = require("./Database");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/agregar", async (req, res) => {
  const { tipoTarjeta, numeroTarjeta, mesExpiracion, anioExpiracion } = req.body;
  try {
    let conn = await sql.connect(dbConfig);
    await conn.request()
      .input("tipoTarjeta", sql.NVarChar(50), tipoTarjeta)
      .input("NumeroTarjeta", sql.NVarChar(25), numeroTarjeta)
      .input("MesExpiracion", sql.TinyInt, mesExpiracion)
      .input("AnioExpiracion", sql.SmallInt, anioExpiracion)
      .execute("agregarTarjeta");
    res.json({ mensaje: "Tarjeta agregada" });
  } catch (err) {
    res.status(500).json({ error: "Error al agregar" });
  }
});

app.put("/actualizar", async (req, res) => {
  const { numeroTarjeta, mesExpiracion, anioExpiracion } = req.body;
  try {
    let conn = await sql.connect(dbConfig);
    await conn.request()
      .input("NumeroTarjeta", sql.NVarChar(25), numeroTarjeta)
      .input("MesExpiracion", sql.TinyInt, mesExpiracion)
      .input("AnioExpiracion", sql.SmallInt, anioExpiracion)
      .execute("actualizarTarjeta");
    res.json({ mensaje: "Tarjeta actualizada" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar" });
  }
});

app.delete("/eliminar", async (req, res) => {
  const { numeroTarjeta } = req.body;
  try {
    let conn = await sql.connect(dbConfig);
    await conn.request()
      .input("NumeroTarjeta", sql.NVarChar(25), numeroTarjeta)
      .execute("eliminarTarjeta");
    res.json({ mensaje: "Tarjeta eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar" });
  }
});

app.get("/mostrar", async (req, res) => {
  try {
    let conn = await sql.connect(dbConfig);
    let result = await conn.request().execute("mostrarTarjetas");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error al mostrar" });
  }
});

app.get("/mostrarTipo", async (req, res) => {
  const { tipoTarjeta } = req.query;
  try {
    let conn = await sql.connect(dbConfig);
    let result = await conn.request()
      .input("TipoTarjeta", sql.NVarChar(50), tipoTarjeta)
      .execute("mostrarTarjetasTipo");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error al mostrar por tipo" });
  }
});

app.get("/mostrarExpiracion", async (req, res) => {
  const { mes, anio } = req.query;
  try {
    let conn = await sql.connect(dbConfig);
    let result = await conn.request()
      .input("Mes", sql.TinyInt, mes)
      .input("Anio", sql.SmallInt, anio)
      .execute("mostrarTarjetasMesAnioExpiracion");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error al mostrar expiración" });
  }
});

app.post("/mostrarRango", async (req, res) => {
  const { mesInicio, anioInicio, mesFin, anioFin } = req.body;
  try {
    let conn = await sql.connect(dbConfig);
    let result = await conn.request()
      .input("MesInicio", sql.TinyInt, mesInicio)
      .input("AnioInicio", sql.SmallInt, anioInicio)
      .input("MesFin", sql.TinyInt, mesFin)
      .input("AnioFin", sql.SmallInt, anioFin)
      .execute("mostrarTarjetasRangoFechasExpiracion");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error al mostrar rango" });
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

