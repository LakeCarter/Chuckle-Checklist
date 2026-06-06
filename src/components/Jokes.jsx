export const Joke = ({joke,deleteJoke,changeToldStatus,getUpdatedJokes}) =>{
    return(
                    
                          <li className="joke-list-item" key={joke.id}>
                            <p className="joke-list-item-text">{joke.text}</p>
                            <div className="joke-list-action-delete">
                              <button
                                onClick={() => {
                                  deleteJoke(joke).then(getUpdatedJokes)
                                }}
                              >
                                🗑️
                              </button>
                            </div>
        
                            <div className="joke-list-action-toggle">
                              <button
                                onClick={() => {
                                  changeToldStatus(joke).then(getUpdatedJokes)
                                }}
                              >
                                {joke.told ? "😆" : "😐"}
                              </button>
                            </div>
                          </li>
    )    
}