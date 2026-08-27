
const forms = document.getElementById('forms')
const nome_cidade = document.getElementById('nome_cidade')


forms.addEventListener('submit', function (event) {
    event.preventDefault()
    let cidade = nome_cidade.value
    buscarClima(cidade)
})

async function buscarClima(nome_cidade) {

    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(nome_cidade)}`,)
        const dados = await res.json()
        if (dados.results.length === 0) {
            throw new Error("Deu ruim mano")
        }
        const cidade = dados.results[0]
        const nome = cidade.name
        const lat = cidade.latitude
        const lon = cidade.longitude
        await previsao(lat, lon, nome)
    } catch (error) {

    }

}



async function previsao(lat, lon, nome) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,cloud_cover,precipitation,apparent_temperature,is_day&current=temperature_2m,is_day,apparent_temperature,relative_humidity_2m,cloud_cover,precipitation&timezone=America%2FSao_Paulo&forecast_hours=24`)
        const dados = await res.json()
        const previ_Atual = document.getElementById('previsao-Atual')
        const previ_Hora = document.getElementById('previsao-Horas')

        const time = new Date(dados.current.time)

        const atualHoraFormatada = time.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

        let dia = ''

        if (dados.current.is_day == 1) {
            dia = 'img/nascer-do-sol.png'
        } else {
            dia = 'img/lua-crescente.png'
        }

        let nublado = 0

        if (dados.current.cloud_cover > 20) {
            nublado = 1
        } else {
            nublado = 0
        }

        let chuva = 0

        if (dados.current.precipitation > 0.5 && dados.current.precipitation < 5) {
            chuva = 1
        } else if (dados.current.precipitation >= 5 ) {
            chuva = 2
        } else {
            chuva = 0
        }

        let clima = ''

        switch (true) {
            case (nublado == 0 && chuva == 0):
                clima = '/img/weather-sun-sunny-hot-day-illustration-hand-drawn-doodle-png.webp'
                break
            case (nublado == 1 && chuva == 0):
                clima = '/img/nublado.png'
                break
            case (chuva == 1):
                clima = '/img/chuva.png'
                break
            case (chuva == 2):
                clima = '/img/trovoada.png'
                break
        }


        previ_Atual.innerHTML = `
            <header>
                    <span id="cidade" class="cidade">${nome}</span>
                </header>
                <main>
                    <div id="lado-esquerdo" class="lado-esquerdo">
                        <div id="horario" class="horario">
                            <span class="descricao-texto">Horario:</span>
                            <span class="horario-dados">${atualHoraFormatada}</span>
                        </div>
                        <div id="div-dia" class="div-dia">
                            <span class="dia"><img class="tamanhoSvg" src="${dia}" ></span>
                        </div>
                        <div id="umidade" class="umidade">
                            <span class="descricao-texto">Umidade:</span>
                            <span class="umidade-dados">${dados.current.relative_humidity_2m}%</span>
                        </div>
                    </div>
                    <div id="meio" class="meio">
                        <div id="div-temperatura" class="div-temperatura">
                            <span id="temperatura" class="temperatura">${dados.current.temperature_2m}°</span>
                        </div>
                        <div id="div-sensacao" class="div-sensacao">
                            <span id="descricao-sensacao" class="descricao-sensacao">Sensação Térmica</span>
                            <span id="sensacao" class="sensacao">${dados.current.apparent_temperature}°</span>
                        </div>
                    </div>
                    <div id="lado-direito" class="lado-direito">
                        <div id="div-preciptacao" class="div-preciptacao">
                            <span id="descricao-preciptacao" class="descricao-preciptacao">Chuva:</span>   
                            <span id="preciptacao" class="preciptacao">${dados.current.precipitation}mm</span>                                  
                        </div>
                        <div id="div-dtempo" class="div-tempo">
                            <div class="tempo"><img class="tamanhoSvg" src="${clima}" ></div>
                        </div>
                        <div id="div-nuvens" class="div-nuvens">
                            <span id="descricao-nuvens" class="descricao-nuvens">Nuvens:</span>       
                            <span id="nuvens" class="nuvens">${dados.current.cloud_cover}%</span>       
                        </div>
                    </div>
                </main>
            `

            let htmlHoras = ''

        dados.hourly.time.forEach((hora, i) => {

            let timeHoras = new Date(hora)
            const horasHoraFormatada = timeHoras.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

            let nublado = 0

            if (dados.hourly.cloud_cover[i] > 20) {
                nublado = 1
            } else {
                nublado = 0
            }

            let chuva = 0

            if (dados.hourly.precipitation[i] >= 0.5 && dados.hourly.precipitation[i] < 5) {
                chuva = 1
            } else if (dados.hourly.precipitation[i] >= 5) {
                chuva = 2
            } else {
                chuva = 0
            }

            let clima = ''

            switch (true) {
                case (nublado == 0 && chuva == 0):
                    clima = '/img/weather-sun-sunny-hot-day-illustration-hand-drawn-doodle-png.webp'
                    break
                case (nublado == 1 && chuva == 0):
                    clima = '/img/nublado.png'
                    break
                case (chuva == 1):
                    clima = '/img/chuva.png'
                    break
                case (chuva == 2):
                    clima = '/img/trovoada.png'
                    break
            }
             htmlHoras += `
            <div data-id="data-horario-${i}" class="card">
                    <span  class="horario-Dia">${horasHoraFormatada}</span>
                    <div class="tempo" ><img class="tamanhoSvg"  src="${clima}" ></div>
                    <div class="container-temp">
                            <span class="temp-horario">${dados.hourly.temperature_2m[i]}°</span>
                            <span  class="sensacao-horario">${dados.hourly.apparent_temperature[i]}°</span>
                    </div>
            </div>
            `

        });

        previ_Hora.innerHTML = htmlHoras

    } catch (error) {

    }
}