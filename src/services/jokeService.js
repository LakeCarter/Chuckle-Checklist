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
    fetch(`http://localhost:8088/jokes`, postOptions)
  }
}

export const changeToldStatus = (clickedJoke) =>{
    if(clickedJoke.told === true){
        const putOption = {
            method: "put",
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id:clickedJoke.id,
                text: clickedJoke.text,
                told:false,
            })
        }
        fetch(`http://localhost:8088/jokes/${clickedJoke.id}`,putOption)
    }
    else{
        const putOption = {
            method: "put",
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify({
                id:clickedJoke.id,
                text: clickedJoke.text,
                told:true,
            })
        }
        fetch(`http://localhost:8088/jokes/${clickedJoke.id}`,putOption)
    }
    console.log(`put finsihed`)
}


// Fetch for all jokes
export const getAllJokes = () => {
  return fetch("http://localhost:8088/jokes").then((res) => res.json())
}
