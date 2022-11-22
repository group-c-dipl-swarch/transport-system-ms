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

const db = {
  getDocumentById,
  getDocumentsByName,
  getAllDocuments
}

module.exports = db
