const rideListElement = document.querySelector("#rideList")
const allRides = getAllRides()

allRides.forEach(async ([id, value])=>{
   const ride = JSON.parse(value)
   ride.id = id
   console.log(ride)
   
   const itemElement = document.createElement("li")
   itemElement.id = ride.id
   itemElement.className = "d-flex p-1 align-items-center mt-2 gap-3"
   rideListElement.appendChild(itemElement)

   itemElement.addEventListener("click", ()=>{
      window.location.href = `./detail.html?id=${ride.id}`
   })


   
   const firstPosition = ride.data[0]
   const firstLocationData = await getLocationData(firstPosition.latitude, firstPosition.longitude);

   const mapID = `map${ride.id}`
   const mapElement = document.createElement("div")
   mapElement.id = mapID
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
   durationDiv.innerText = `Duration: ${getDuration(ride) }` 
   const dateDiv = document.createElement("div")    
   dateDiv.innerText = `Date: ${getStartDate(ride)}`
   dateDiv.classList = "text-secondary"

  dataElement.appendChild(cityDiv)
  dataElement.appendChild(maxSpeedDiv)
  dataElement.appendChild(distanceDiv)
  dataElement.appendChild(durationDiv)
  dataElement.appendChild(dateDiv)

  itemElement.appendChild(mapElement)
  itemElement.appendChild(dataElement)

  const map = L.map(mapID, {
   attributionControl:false,
   zoomControl:false,
   dragging:false,
   scrollWheelZoom:false
  })
  map.setView([firstPosition.latitude, firstPosition.longitude],10)
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    minZoom:5,
    maxZoom: 17
  
  }).addTo(map)

  L.marker([firstPosition.latitude, firstPosition.longitude]).addTo(map)
 
})










   

   