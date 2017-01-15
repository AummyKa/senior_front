

const apiAccess = ({
url,
method,
payload,
attemptAction,
successAction,
failureAction
}) => {

attemptAction()

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
}


export default apiAccess
