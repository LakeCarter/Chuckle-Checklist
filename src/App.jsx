import { use, useEffect, useState } from "react"
import "./App.css"
import {
  changeToldStatus,
  getAllJokes,
  postNewJoke,
} from "./services/jokeService.js"
import stevePic from "./assets/steve.png"

export const App = () => {
  const [newJoke, setNewJoke] = useState("")
  const [allJokes, setAllJokes] = useState([])
  const [untoldJokes, setUntoldJokes] = useState([])
  const [toldJokes, setToldJokes] = useState([])

  
  useEffect(() => {
    getAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray)
    })
  }, [])
  
  useEffect(() => {
    setUntoldJokes(allJokes.filter((joke) => joke.told === false))
    setToldJokes(allJokes.filter((joke) => joke.told === true))
    console.log(`sort finished`,allJokes)
  }, [allJokes])
  
  const getUpdatedJokes = () => {
    getAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray)
      console.log(`get  all finished`,jokeArray)
    })
  }


  return (
    <div className="app-container">
      <div className="app-heading">
        <div className="app-heading-circle">
          <img className="app-logo" src={stevePic} alt="Good job Steve" />
        </div>
        <header>
          <h1 className="app-heading-text">Chuckle Checklist</h1>
        </header>
      </div>
      <header>
        <h2 className="underlined-heading">Add Joke</h2>
      </header>
      <div className="joke-add-form">
        <input
          className="joke-input"
          type="text"
          placeholder="New One Liner"
          value={newJoke}
          onChange={(event) => {
            // What's the value of event?
            setNewJoke(event.target.value)
          }}
        />
        <button
          onClick={() => {
            postNewJoke(newJoke).then(getUpdatedJokes)
            setNewJoke("")
            
          }}
          className="joke-input-submit"
        >
          Add
        </button>
      </div>
      <div className="joke-lists-container">
        <div className="joke-list-container">
          <header>
            <h2 className="underlined-heading">
              😐Untold<span className="untold-count">{untoldJokes.length}</span>
            </h2>
          </header>
          <div>
            <ul>
              {untoldJokes.map((joke) => {
                return (
                  <li className="joke-list-item" key={joke.id}>
                    <p className="joke-list-item-text">{joke.text}</p>
                    <div className="joke-list-action-toggle">
                      <button
                        onClick={() => {
                          changeToldStatus(joke).then(getUpdatedJokes)
                        
                        }}
                      >
                        😆
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <div className="joke-list-container">
          <header>
            <h2 className="underlined-heading">
              😆Told <span className="told-count">{toldJokes.length}</span>
            </h2>
          </header>
          <div>
            <ul>
              {toldJokes.map((joke) => {
                return (
                  <li className="joke-list-item" key={joke.id}>
                    <p className="joke-list-item-text">{joke.text}</p>
                    <div className="joke-list-action-toggle">
                      <button
                        onClick={() => {
                          changeToldStatus(joke).then(getUpdatedJokes)
                          
                        }}
                      >
                        😐
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
