
async function getLocationData(latitude, longitude){
  //para obter os dados de localização com base na latitude e longitude da primeira posição da corrida. Essa chamada é assíncrona e aguarda a resposta usando await. Os dados de localização são armazenados em firstLocationData.
     const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&=localityLanguage=en`
  
     const response = await fetch(url)//fetch é chamada com a URL construída como argumento. O fetch é uma função assíncrona que faz uma requisição HTTP para a API e retorna uma promessa.
     return await response.json()
     
  }
  
  function getMaxSpeed(positions){
     console.log(positions);
     let maxSpeed = 0
     positions.forEach(position=>{ //Itera sobre cada posição no array de posições
        if(position.speed != null && position.speed > maxSpeed) //Verifica se a velocidade da posição atual não é nula e se é maior do que a velocidade máxima atual 
        maxSpeed = position.speed
     })
  
     return (maxSpeed * 3.6).toFixed(1) //Convertemos de m/s para km  
  }
  
  
  function getDistance(position){ //Distancia total percorrida 
     
     const earthRadiusKm = 6371 //Raio em km da terra
     let totalDistance = 0
     for(let i = 0;  i<position.length - 1; i++) {
        const p1 = {
                 latitude:position[i].latitude, 
                 longitude:position[i]
        }
        const p2 = {
                 latitude:position[i + 1].latitude, 
                 longitude:position[i + 1]
        }
  
        const deltaLatitude = toRad(p2.latitude - p1.latitude)
        const deltaLongitude = toRad(p2.longitude - p1.longitude)
  
        const a = Math.sin(deltaLatitude/2) *
                Math.sin(deltaLatitude / 2) +
               Math.sin(deltaLongitude / 2) * 
               Math.sin(deltaLongitude / 2) * 
               Math.cos(toRad(p1.latitude)) * 
               Math.cos(toRad(p2.latitude))
  
        const c = 2 * Math.atan2(Math.sqrt(a),Math.sqrt(1-a)) 
        
        const distance = earthRadiusKm * c
  
        totalDistance += distance
  
     }  
  
     function toRad(degree){
        return degree * Math.PI /180
     }
  
     return totalDistance.toFixed(2)
  }
  
  function getDuration(ride){
     function format(number,digits){
        return String(number.toFixed(0)).padStart(2, "0");
     }
  
     const interval = (ride.stopTime - ride.startTime)/1000
  
     const minutes = Math.trunc(interval / 60)
     const seconds = interval % 60
  
  
     return `${format(minutes,2)}: ${format(seconds,2)}`
  }
  
  function getStartDate(ride){
  
     const d = new Date(ride.startTime)
  
     const day  = d.toLocaleDateString("en-US", {day: "numeric"})
     const month = d.toLocaleDateString("en-US", {month: "short"})
     const year = d.toLocaleDateString("en-US", {year: "numeric"})
  
     const hour  = d.toLocaleTimeString("en-US", {hour: "2-digit"})
     const minute  = d.toLocaleTimeString("en-US", {minute: "2-digit"})
  
     return `${month}/${day}/${year} - ${hour}:${minute}`
  }
  
  