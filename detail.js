
const params = new URLSearchParams(window.location.search)
const rideID = params.get("id")
const ride = getRideRecord(rideID)

document.addEventListener("DOMContentLoaded",async()=>{

  const firstPosition = ride.data[0]
  const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude);

  const mapElement = document.createElement("div")
  mapElement.style = "width:100px; height:100px;"
  mapElement.className = "bg-secondary rounded-3"

  const dataElement = document.createElement("div")
  dataElement.className = "d-flex flex-column"

  const cityDiv = document.createElement("div") 
  cityDiv.innerText = `${firstLocationData.city}-${firstLocationData.countryCode}`
  cityDiv.className = "text-primary mb-1"

  const maxSpeedDiv = document.createElement("div")
  maxSpeedDiv.innerText =  `Max speed: ${getMaxSpeed(ride.data)} Km/h` 
  maxSpeedDiv.className = "h6"

  const distanceDiv = document.createElement("div")
  distanceDiv.innerText = `Distance: ${getDistance(ride.data)} Km`

  const durationDiv = document.createElement("div")
  durationDiv.innerText = `Duration: ${getDuration(ride) }`  //Para esse calculo pegamos o momento do Stop - o momento do start e teremos o total do tempo em milissegundos 

  const dateDiv = document.createElement("div")    
  dateDiv.innerText = `Date: ${getStartDate(ride)}`
  dateDiv.classList = "text-secondary"

  dataElement.appendChild(cityDiv)
  dataElement.appendChild(maxSpeedDiv)
  dataElement.appendChild(distanceDiv)
  dataElement.appendChild(durationDiv)
  dataElement.appendChild(dateDiv)

  document.querySelector("#data").appendChild(dataElement)

  const btnDelete = document.querySelector("#btnDelete")
  btnDelete.addEventListener("click",()=>{
    
    deleteRide(rideID)
    window.location.href = "./"
  })


  const map = L.map("mapDetail")
  map.setView([firstPosition.latitude, firstPosition.longitude],10)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attributionControl:false,
    minZoom:5,
    maxZoom: 17
  
  }).addTo(map)

const positionsArray =  ride.data.map((position =>{
  return [position.latitude, position.longitude]
}))

const polyline = L.polyline(positionsArray, {color:"#F00"})
polyline.addTo(map)

map.fitBounds(polyline.getBounds())



})