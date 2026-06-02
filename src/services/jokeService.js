export const postNewJoke = (newJoke) => {
  //check if text has been entered
  if (newJoke != "") {
    console.log(`creating new post`)
    //create post options
    const postOptions = {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: null,
        text: `${newJoke}`,
        told: false,
      }),
    }

    //posts to database
    return fetch(`http://localhost:8088/jokes`, postOptions)
  }
}

//Changes Told status of Joke
export const changeToldStatus = (clickedJoke) => {
  const putOption = {
    method: "put",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      id: clickedJoke.id,
      text: clickedJoke.text,
      told: !clickedJoke.told,
    }),
  }
  return fetch(`http://localhost:8088/jokes/${clickedJoke.id}`, putOption)
}


//Deletes Joke
export const deleteJoke = (clickedJoke) => {
  const deleteRequest = {
    method: "Delete",
    headers: {
      "content-type": "application/json",
    },
  }
  return fetch(`http://localhost:8088/jokes/${clickedJoke.id}`, deleteRequest)
}



// Fetch for all jokes
export const getAllJokes = () => {
  return fetch("http://localhost:8088/jokes").then((res) => res.json())
}
