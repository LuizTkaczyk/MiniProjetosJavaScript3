document.querySelector('.busca').addEventListener('submit', async (event) => {
    //impedindo que a página seja recarregada ao dar o submit no form
    event.preventDefault();//previne o comportamento padrão
    let input = document.querySelector('#searchInput').value

    //tratando se o campo de input esta vazio ou não
    if (input !== '') {
        clearInfo()
        showWarning('Carregando...')


        //api do site open weather
        //o metodo encodeURI formata o input para que ele não tenha espaço na barra de url do site
        //minha key 681010d5f3a4e8c24426a7b9a267f37f  - outra d06cdb298fafc83c520d5ab677fc477
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=681010d5f3a4e8c24426a7b9a267f37f&units=metric&lang=pt_br`

        //fetch aguarda o carregamento completo do objeto, para depois carregar o restante das funções
        let results = await fetch(url)
        let json = await results.json()

        if (json.cod == 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            })

        } else {
            clearInfo()
            showWarning("Localidade não encontrada!")

        }
    } else {
        clearInfo()
    }

})

function clearInfo() {
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

function showInfo(json) {
    showWarning('')

    //mostrando a cidade e o pais
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`

    document.querySelector('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>KM/h</span>`

    //trocando atributo da img, src por "link"
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg)`

    //alterando o css da classe resultado
    document.querySelector('.resultado').style.display = "block"
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg
}