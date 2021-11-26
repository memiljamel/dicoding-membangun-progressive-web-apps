const DATABASE_NAME = 'db_soccer';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'tbl_soccer';

const dbPromised = idb.open(DATABASE_NAME, DATABASE_VERSION, upgradeDb => {
  const soccerObjectStore = upgradeDb.createObjectStore(OBJECT_STORE_NAME, {
    keyPath: 'id'
  });

  soccerObjectStore.createIndex('name', 'name', {
    unique: true
  });
});

const saveForLater = async soccer => {
  dbPromised.then(db => {
    const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
    const store = tx.objectStore(OBJECT_STORE_NAME);
    
    store.add(soccer);
    M.toast({ html: 'Data berhasil ditambah!.' });
    return tx.complate;
  }).catch(() => {
    M.toast({ html: 'Upss! Terjadi suatu masalah.' });
  });
}

const getAll = async () => {
  return new Promise((resolve, reject) => {
    dbPromised.then(db => {
      const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
      const store = tx.objectStore(OBJECT_STORE_NAME);

      return store.getAll();
    }).then(soccer => {
      resolve(soccer);
    });
  });
}

const deleteById = async id => {
  return new Promise((resolve, reject) => {
    dbPromised.then(db => {
      const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
      const store = tx.objectStore(OBJECT_STORE_NAME);

      store.delete(id);
      M.toast({ html: 'Data berhasil dihapus!.' });
      return tx.complate;
    }).catch(() => {
      M.toast({ html: 'Upss! Terjadi suatu masalah.' });
    });
  });
}

export { saveForLater, getAll, deleteById };