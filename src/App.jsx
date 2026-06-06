import { use, useEffect, useState } from "react"
import "./App.css"
import {
  changeToldStatus,
  deleteJoke,
  getAllJokes,
  postNewJoke,
} from "./services/jokeService.js"
import stevePic from "./assets/steve.png"
import { Joke } from "./components/Jokes.jsx"

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
  }, [allJokes])

  const getUpdatedJokes = () => {
    getAllJokes().then((jokeArray) => {
      setAllJokes(jokeArray)
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

    {/* Joke List Start */}
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
                  <Joke 
                  joke={joke} 
                  deleteJoke={deleteJoke}
                  changeToldStatus={changeToldStatus}
                  getUpdatedJokes={getUpdatedJokes}
                  key={joke.id}
                  />
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
                  <Joke 
                  joke={joke} 
                  deleteJoke={deleteJoke}
                  changeToldStatus={changeToldStatus}
                  getUpdatedJokes={getUpdatedJokes}
                  key={joke.id}
                  />
                )
              })}
            </ul>
          </div>
        </div>
      </div>
      {/* Joke List End */}
    </div>
  )
}
