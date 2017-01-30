

const apiAccess = ({
url,
method,
payload,
attemptAction,
successAction,
failureAction
}) => {

attemptAction()
console.log("jibi" + method)


if(method == "POST"){
console.log("jibu" + method)
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
    console.log({ data: response.data })
      if (response.ok) {
        return response.json()
        .then(json => successAction(json))
      } else {
          failureAction()

      }

  })

}else if(method == "GET") {

  console.log("Helloooo")

  fetch(url, {
      method: method,
      headers: {
          'Content-Type': 'application/json'
      }

  })
  .then(response => {
    console.log({ data: response.data })
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
