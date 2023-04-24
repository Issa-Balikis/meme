import { useState, useEffect } from 'react';
/* import datas from '../data'; */

const Meme = () => {

const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg"
})


const [allMeme, setAllMeme] = useState([])

useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
        .then(res => res.json())    
        .then(data => setAllMeme(data.data.memes))
    }, [])

    const getMemeImage = () => {
        const randomNumber = Math.floor(Math.random() * allMeme.length)
        const url = allMeme[randomNumber].url
        setMeme(prevState => {
           return {
             ...prevState,
             randomImage: url
           }
        })    
    }



        const handleChange = (event) => {
            const{ name, value} = event.target
            setMeme(prevState => {
                return {
                    ...prevState,  
                    [name]: value
                }
            })
        }

       /*  const handleSubmit = (event) => {

        }
 */
    return ( 
        <main>
        <div className="forms"/*  onSubmit={handleSubmit} */>
            <input className="f-input"
                   type="text"  
                   placeholder="first text"
                   name="topText"
                   value={meme.topText}
                   onChange={handleChange}
                   />
            <input className="f-input" 
                   type="text"
                   placeholder="last text"
                   name="bottomText"
                   value={meme.bottomText}
                   onChange={handleChange}

                   />
            <button className="btn" onClick={getMemeImage}>Get A New Meme Image</button>
        </div>
       <div className="meme">
                <img src={meme.randomImage} className="meme--image" />
                <h2 className="meme--text top">{meme.topText}</h2>
                <h2 className="meme--text bottom">{meme.bottomText}</h2>
            </div>
        </main>
    );
}

export default Meme;