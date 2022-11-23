const Firestore = require('@google-cloud/firestore')
const firestore = new Firestore()
const getCollection = (collectionName) => firestore.collection(collectionName)

const getDocumentById = async (collection, id) => {
  const doc = await getCollection(collection)
    .doc(id)
    .get()
  return ({ id: doc.id, ...doc.data() })
}

const getDocumentsByName = async (collection, name) => {
  const queryRef = await getCollection(collection)
    .where('name', '>=', name)
    .where('name', '<=', name + '~')
    .get()
  let data = []
  queryRef.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() })
  })
  return data
}

const getAllDocuments = async (collection) => {
  const queryRef = await getCollection(collection)
    .get()
  let data = []
  queryRef.forEach(doc => {
    data.push({ id: doc.id, ...doc.data() })
  })
  return data
}

const createRoute = async (id, name) => {
  return await getCollection('routes')
    .add({
      id,
      name
  })
}

const createStation = async (id, name, location) => {
  return await getCollection('stations')
    .add({
      id,
      name,
      location
  })
}



const updateDocument = async (collection, id, body) => {
  return await getCollection(collection)
    .doc(id)
    .update(body)
}

const deleteDocument = async (collection,id) => {
  return await getCollection(collection)
    .doc(id)
    .delete()
}



const db = {
  getDocumentById,
  getDocumentsByName,
  getAllDocuments,
  createRoute,
  createStation,
  updateDocument,
  deleteDocument
}

module.exports = db
