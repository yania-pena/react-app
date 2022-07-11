import React from 'react';
import './style.css';
import * as htmlToImage from 'html-to-image';
import FileSaver from 'file-saver';

class MemeGenerator extends React.Component {
    constructor() {
        super();
        this.state = {
            topText : "",
            bottomText : "",
            randomImage : "http://i.imgflip.com/1bij.jpg",
            allMemeImages : []
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    componentDidMount() {
        fetch("https://api.imgflip.com/get_memes")
        .then(response => response.json())
        .then(response => {
            const {memes} = response.data
            this.setState({
                allMemeImages: memes
            })
        });
    }

    changeHandler(event) {
        const {name, value} = event.target;
        this.setState({
            [name] : value
        })
    }
    submitHandler(event) {
        event.preventDefault();
        const randNum = Math.floor(Math.random() * this.state.allMemeImages.length);
        const randMemeImg = this.state.allMemeImages[randNum].url;
        this.setState({ randomImage: randMemeImg });
    }
    downloadMeme() {
        htmlToImage.toBlob(document.getElementById('memeImg'))
        .then(function (blob) {
            FileSaver.saveAs(blob, 'memeImg.png');
        });
    }
    render() {
        return (
            <div>
                <form className="meme-form" onSubmit={this.submitHandler}>
                    <input type="text" name="topText" placeholder="Top Text" value={this.state.topText} onChange={this.changeHandler} />
                    <input type="text" name="bottomText" placeholder="Bottom Text" value={this.state.bottomText} onChange={this.changeHandler} />   
                    <button>Generate</button>
                </form>
                <div id="downloadSection">
                    <button id="btnDownloadMeme" onClick={this.downloadMeme}>Download Meme</button>
                </div>
                <div className="meme" id="memeImg">
                    <img src={this.state.randomImage} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        );
    };
}

export default MemeGenerator;