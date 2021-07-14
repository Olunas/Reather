import axios from 'axios'

const fetchDadataApi = async (value) => {
  const key = '96b77bf1ff2f2211ea671b81ca12f7401126ce30'
  const url = `https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address`
  const { data } = await axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${key}`
    },
    params: {
      language: 'en',
      query: value,
      count: 5,
      from_bound: { value: "city" },
      to_bound: { value: "city" },
    }
  })
  return data
};

export const getDadata = async (value) => {
  return fetchDadataApi(value);
};

export const getCities = async (val) => {
  const data = await getDadata(val)
  
  let values = data.suggestions
  const cities = []

  values.forEach(item=> {
    if(item.data.city === 'Saint-Petersburg'){
      cities.push('Sankt-Peterburg')
    }else{
      cities.push(item.data.city)
    }
  })

  return cities
}