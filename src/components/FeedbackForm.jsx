import { v4 as uuidv4 } from 'uuid'
import { useState } from "react"
import Card from "./Shared/Card"
import Button from "./Shared/Button"
import RatingSelect from "./RatingSelect"


function FeedbackForm({handleAdd}) {
    const [text,setText] = useState('')
    const [btnDisabled,setBtnDisabled] = useState(true)
    const [message,setMessage] = useState('')
    const [rating,setRating] = useState('')


    const handleTextChange = (e) => {
        if(text === ''){
            setBtnDisabled(true)
            setMessage(null)
        }else if( text !== '' && text.trim().length <= 10){
            setMessage("Text Must Be AtLeast 10 Characters")
            setBtnDisabled(true)
        }else{
            setMessage(null)
            setBtnDisabled(false)
        }

        setText(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text.trim().length > 10){
            const newFeedback = {
                text,
                rating,
            }
            handleAdd(newFeedback);
            setText('')
        }
    }

    return (
        <Card>
            <form onSubmit={handleSubmit}>
                <h2>How would you rate your service with us?</h2>
                <RatingSelect select={setRating} selected={rating} />
                <div className="input-group">
                    <input onChange={handleTextChange} type="text" placeholder="Write a review" value={text}/>
                    <Button type="submit" isDisabled={btnDisabled}>Send</Button>
                </div>

                {message && <div className='message'>{message}</div>}

            </form>
        </Card>
    )
}

export default FeedbackForm