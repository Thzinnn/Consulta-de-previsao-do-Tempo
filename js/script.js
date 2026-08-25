


async function buscarClima(nome_cidade) {

    try {
        const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${nome_cidade}`, )
        const dados = await res.json()
        if (dados.results.length === 0) {
            throw new Error("Deu ruim mano")
        }
        const cidade = dados.results[0]
        const lat = cidade.latitude
        const lon = cidade.longitude
        await previsao(lat, lon)
    } catch (error) {
        
    }
    
}

async function previsao(lat, lon) {
    try {
        const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,rain,showers,precipitation,precipitation_probability,is_day&currenttemperature_2m,is_day,apparent_temperature,relative_humidity_2m,cloud_cover,precipitation&timezone=America%2FSao_Paulo`)
        const dados = await res.json()

    } catch (error) {

    }
}