import React, {useState, useEffect} from 'react' // Importing States
import axios from 'axios' // Importing Axios, a third party library For API calls

const MainGame = (props) => {
    const [givenQuestion, setGivenQuestion] = useState([]) // Stores the value of the API response
    const [answerInput, setAnswerInput] = useState('') // Stores the input provided by the user
    const [output, setOutput] = useState('') // Stores the output result
    const [loadApi, setLoadApi] = useState(false) // API load flag, initially set to false
    
    // Renders on browser refresh and when the loadApi state value is changed
    useEffect(() => {
      axios.get(`https://jservice.io/api/random`) // GET from the url
        .then((response) => {                     // promise 
          const result = response.data            // store the response into the result variable
          setGivenQuestion(result)                // set the API response into 'givenQuestion' state
        })
        .catch((err) => {                         // Incase of promise fails catch errors
          alert(err.message)                      // Alerts the error message 
        })
    }, [loadApi])
    
    // Function to set 'answerInput' provided by the user
    const handleAnswerInput = (e) => {
      const result = e.target.value
      setAnswerInput(result)
    }
    
    // Function When Submitting the form
    const handleFormSubmit = (e) => {
      e.preventDefault()                                           // prevents page load
      const answer = givenQuestion.map((ans) => {                  // store the answer from the 'givenQuestion' state
        return ans.answer
      }).toString()
  
      answer.toLowerCase() === answerInput.toLowerCase() ? (        // Ternery Operator validation to check the answer
        setOutput(`Correct Answer`)                                 // And set the 'output' state
      ) : ( 
        setOutput(`Wrong Answer - Correct answer is "${answer}"`)
      )
      
      // Timeout function to clear all the states and show next Question Once form submitted
      setTimeout(() => {
        setOutput('')
        setAnswerInput('')
        setLoadApi(!loadApi)
      }, 3000)
  
    }
    
    return (
        <div>
            <div className="d-flex justify-content-center col-md-6 m-auto">
                <form onSubmit={handleFormSubmit}>
                    <h3 className="form-label pt-4">
                        {
                            givenQuestion.map((ele) => {
                            return ele.question
                            })
                        }
                    </h3>

                    <input type="text" 
                        className="form-control my-4" 
                        value={answerInput} 
                        onChange={handleAnswerInput}
                    />

                    <input type="submit" 
                        value="Check"
                        disabled={answerInput.length === 0 ? true : false}
                        className="btn btn-primary mx-2" 
                    />
        
                </form>
            </div>

            {/* Shows the result in an alert tab */}
            {
                output === '' ? (
                    <div></div>
                ) : (
                    <div className="alert alert-secondary col-md-4 m-auto mt-4" role="alert">
                        {output}
                    </div>
                )
            }
        </div>
      
    )
  }
  
  export default MainGame
  