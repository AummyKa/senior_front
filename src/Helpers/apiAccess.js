

const apiAccess = ({
url,
method,
payload,
attemptAction,
successAction,
failureAction
}) => {

attemptAction()


if(method == "POST" || method == "DELETE"){

  fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
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

  fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
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
