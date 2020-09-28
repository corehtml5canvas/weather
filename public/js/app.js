const form = document.querySelector('form')
const search = document.querySelector('input')
const searchResult = document.getElementById('searchResult')

form.onsubmit = e => {
  e.preventDefault()
  searchResult.textContent = 'Loading...'
  
  fetch(`http://localhost:9000/weather?address=${search.value}`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        searchResult.innerHTML = data.error
      }
      else {
        searchResult.innerHTML = data.forecast
      }
    })
}