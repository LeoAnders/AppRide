
const speedElement = document.querySelector("#speed");
const startButton = document.querySelector("#start");
const stopButton = document.querySelector("#stop");

let watchID = null
startButton.addEventListener("click",() => {
   if(watchID)
      return

//Esta é a função de callback que será chamada quando a posição do dispositivo for capturada com sucesso.
   function handleSuccess(position){
      console.log(position);
      speedElement.innerText = position.coords.speed ?
       (position.coords.speed *3.6).toFixed(1) :0

   }
//Esta é a função de callback que será chamada se ocorrer um erro ao capturar a posição do dispositivo.   
   function handleError(error){
      console.log(error.msg);
   }
//Este objeto contém as opções de configuração para a captura da posição do dispositivo. Neste caso, está habilitado o uso da precisão alta para a leitura.   
   const options = { enableHighAccuracy: true}
   watchID = navigator.geolocation.watchPosition(handleSuccess, handleError, options)

   startButton.classList.add("d-none");
   stopButton.classList.remove("d-none");

})

stopButton.addEventListener("click",() => {
    if(!watchID)
    return
   navigator.geolocation.clearWatch(watchID)
   watchID == null
   startButton.classList.remove("d-none");
   stopButton.classList.add("d-none");

})