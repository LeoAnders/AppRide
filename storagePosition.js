
function createNewRide(){
   const rideID = Date.now()//Captura o momento que o usuário aperta em Start
   const rideRecord = {
    data: [], // Array para armazenar as posições durante o passeio
    startTime: rideID,
    stopTime: null


   } 
   saveRideRecord(rideID, rideRecord)
   return rideID

}
function getAllRides(){
   return Object.entries(localStorage)
   
}

function getRideRecord(rideID){
   return JSON.parse(localStorage.getItem(rideID))// Obtém o registro do passeio do localStorage e o converte de volta para um objeto
}


function saveRideRecord(rideID, rideRecord) {
   localStorage.setItem(rideID, JSON.stringify(rideRecord))// Atualiza o registro do passeio no localStorage
}


function addPosition(rideID, position){
   const rideRecord = getRideRecord(rideID)

    // Cria um novo objeto com os dados da posição atual
   const newData = {
      accuracy: position.coords.accuracy,
      altitude:position.coords.altitude,
      altitudeAccuracy:position.coords.altitudeAccuracy,
      heading:position.coords.heading, 
      latitude:position.coords.latitude, 
      longitude:position.coords.longitude,
      speed:position.coords.speed,
      timesTamp: position.timesTamp
   }

   rideRecord.data.push(newData) // Adiciona os dados da posição ao array de dados do passeio
   saveRideRecord(rideID, rideRecord) // Salva o registro atualizado do passeio no localStorage
   
}

function updateStopTime(rideID){
   const rideRecord = getRideRecord(rideID)
   rideRecord.stopTime = Date.now()
   saveRideRecord(rideID, rideRecord)

}
