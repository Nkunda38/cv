const request = indexedDB.open("instagram", 4);

request.onsuccess = () => {
  const database = request.result;
  console.log("success creatig db");
  console.log(request);

      
   
};
request.onupgradeneeded = () => {
  const database = request.result;
  database.createObjectStore("bio", {autoIncrement:true});
  database.createObjectStore("gallery",{autoIncrement:true});
};

request.onerror = () => {
  console.log("errors creatig db");
};

const addEntryToDb = (storeName, entry) => {
 
  const database = dbrequest.result;
  const transaction = database.transaction([storeName], "readwrite");
  const store = transaction.objectStore(storeName);
  store.add(entry)
  transaction.oncomplete = () => alert(`entry added to ${storeName}`)
  transaction.onerror = (Event) => {
    console.log(`error adding Entry to ${storeName}`);
    console.log(Event.target.error)
  }
};
const getEntryFromDb = (storeName, id) => {

  const database=request.result
  const transaction = database.transaction([storeName])
  const store = transaction.objectStore(storeName)
  const getData = id ? store.get(id):store.getAll

  getData.onsuccess = () => {
    console.log("success", getData.result);
  }
  getData.onerror = () => {
    console.log("error getting data from the store")
  }
  
}
 
export { request, addEntryToDb ,getEntryFromDb};