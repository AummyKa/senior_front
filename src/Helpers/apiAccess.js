import Cookies from 'js-cookie'

const apiConfig = (url) =>{
  if(process.env.NODE_ENV == "development"){
    let server_url = "http://localhost:8000/"
    let result = "http://localhost:8000/"+url
    return result
  }else if(process.env.NODE_ENV == "production"){
    let server_url = "http://128.199.234.89/"
    let result = "http://128.199.234.89/"+url
    return result
  }
}

const apiAccess = ({
url,
method,
payload,
attemptAction,
successAction,
failureAction
}) => {

let result_url = apiConfig(url)

attemptAction()

if(method == "POST" || method == "DELETE"){



  fetch(result_url, {
      method: method,
      headers: {
          'Content-Type': 'application/json',
          'SessionToken': Cookies.get('token')
      },
      body: JSON.stringify({
          payload
      })
  })
  .then(response => {

      if (response.ok) {
        return response.json()
        .then(json => successAction(json))
      } else {
          failureAction()

      }

  })

}else if(method == "GET") {

  fetch(result_url, {
      method: method,
      headers: {
          'Content-Type': 'application/json',
          'SessionToken': Cookies.get('token')
      }

  })
  .then(response => {
      if (response.ok) {
        return response.json()
        .then(json => successAction(json))
      } else {
          failureAction()
      }

  })

}


}


export default apiAccess
