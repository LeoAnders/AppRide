### Descrição

Com a ajuda do curso ProgBR, desenvolvi um projeto em JavaScript utilizando a biblioteca Bootstrap, focado principalmente na utilização de APIs. O objetivo desse projeto foi criar uma ferramenta que permite medir a velocidade de atividades como corrida ou bicicleta, além de oferecer funcionalidades adicionais.

O aplicativo oferece a capacidade de calcular a velocidade, duração e até mesmo um velocímetro em tempo real. Essas funcionalidades foram possíveis graças ao uso de diversas APIs, que me permitiram integrar informações em tempo real e fornecer uma experiência completa.

Ao longo do desenvolvimento desse projeto, pude explorar as possibilidades oferecidas pelas APIs e compreender como elas podem ser aproveitadas para criar aplicativos mais interativos e funcionais. Essa experiência me proporcionou uma visão aprofundada sobre a importância das APIs.
 
---

<div align="center">
 
<img src="https://github.com/LeoAnders/AppRide/assets/115679546/4695b3aa-4c86-4c36-aa58-49256cb8e3fa"  width="500" >

</div>


     
### Integração de APIs no Projeto "appRide"

> #### Geolocation API


A Geolocation API desempenha um papel fundamental no meu aplicativo de medição de velocidade em tempo real. Utilizando essa API, consigo obter informações de localização do dispositivo, como latitude, longitude, velocidade e precisão.   
<br>

```Javascript
navigator.geolocation.watchPosition(handleSuccess, handleError, options);
```
Essa função inicia o monitoramento da posição do dispositivo, permitindo capturar e manipular a posição com sucesso. Além disso, utilizo a função clearWatch() para interromper o monitoramento quando necessário:

```Javascript
navigator.geolocation.clearWatch(watchID);
```
<br>
Para cada posição capturada, utilizo a função addPosition(rideID, position) para adicionar a posição ao registro de corrida correspondente.

---

### Funcionalidades Implementadas

> Durante o desenvolvimento do projeto "appRide", foram implementadas várias funcionalidades para proporcionar uma experiência completa aos usuários. Algumas dessas funcionalidades incluem:

- **Distância Percorrida:** Utilizando os dados de latitude e longitude das posições capturadas, calculo a distância total percorrida durante a atividade. Isso permite fornecer aos usuários uma medida precisa da distância percorrida.

- **Velocidade Máxima:** Analisando as posições capturadas ao longo da atividade, identifico a velocidade máxima alcançada. Dessa forma, os usuários podem avaliar seu desempenho durante o percurso.

- **Duração da Atividade:** Calculo o tempo total da atividade, desde o início até o fim, para fornecer aos usuários uma estimativa do tempo investido na corrida ou pedalada.

- **Data de Início:** Mostro a data e hora em que a atividade foi iniciada, proporcionando aos usuários um registro preciso do momento de início de sua jornada.


### Outras funções utilizadas

> Além da integração da Geolocation API, também foram implementadas as seguintes funções:


`createNewRide():`  Cria um novo registro de corrida com um ID único, data de início e hora de parada.

`deleteRide(rideID):`   Remove um registro de corrida específico do armazenamento local.

`getAllRides():`   Obtém todos os registros de corrida armazenados no armazenamento local.

`getRideRecord(rideID):`   Obtém o registro de corrida específico com base no ID.

`saveRideRecord(rideID, rideRecord):`   Salva o registro de corrida no armazenamento local.

`updateStopTime(rideID):`   Atualiza a hora de parada de um registro de corrida específico.
