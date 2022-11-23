const db = require('./infra/database')
const Firestore = require('@google-cloud/firestore')

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

exports.createStation = async (req, res) => {
  const { id, name, location: { latitude, longitude }} = req.body
  try {    
    const location = new Firestore.GeoPoint(latitude, longitude)
    const dataRes = await db.createStation( id, name, location)
    res.status(200).send(dataRes.id)
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

exports.createRoute = async (req, res) => {
  const { id, name } = req.body
  try {
    const dataRes = await db.createRoute( id, name)
    res.status(200).send(dataRes.id)
  } catch (err) {
    console.log(err)
    res.status(500).send('An error has occurred')
  }
}

exports.updateRoute = async (req, res) => {
  const { id, name} = req.body
  try {
    const dataRes = await db.updateDocument('routes', id, {name})
    res.status(200).send(dataRes.id)
  } catch (err) {
    console.log(err)
    res.status(500).send('An error has occurred')
  }
}

exports.deleteRoute = async (req, res) => {
  const { id} = req.body
  try {
    const dataRes = await db.deleteDocument('routes', id)
    res.status(200).send(dataRes)
  } catch (err) {
    console.log(err)
    res.status(500).send('An error has occurred')
  }
}

exports.updateStation = async (req, res) => {
  const { id, name, location} = req.body
  try {
    const dataRes = await db.updateDocument('stations', id, {name, location})
    res.status(200).send(dataRes.id)
  } catch (err) {
    console.log(err)
    res.status(500).send('An error has occurred')
  }
}

exports.deleteStation = async (req, res) => {
  const { id} = req.body
  try {
    const dataRes = await db.deleteDocument('stations', id)
    res.status(200).send(dataRes)
  } catch (err) {
    console.log(err)
    res.status(500).send('An error has occurred')
  }
}


