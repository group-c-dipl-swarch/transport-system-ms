const db = require('./infra/database')

exports.getStations = async (req, res) => {
  const { id, name } = req.query
  try {
    let dataRes
    if (!id && !name) dataRes = await db.getAllDocuments('stations', id)
    if (name) dataRes = await db.getDocumentsByName('stations', name) 
    if (id) dataRes = await db.getDocumentById('stations', id)
    res.status(200).send(dataRes)
  } catch (err) {
    console.log(err)
    res.status(500).send('An error has occurred')
  }
}

exports.getRoutes = async (req, res) => {
  const { id, name } = req.query
  try {
    let dataRes
    if (!id && !name) dataRes = await db.getAllDocuments('routes', id)
    if (name) dataRes = await db.getDocumentsByName('routes', name) 
    if (id) dataRes = await db.getDocumentById('routes', id)
    res.status(200).send(dataRes)
  } catch (err) {
    console.log(err)
    res.status(500).send('An error has occurred')
  }
}