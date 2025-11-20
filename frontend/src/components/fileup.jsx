import { useState } from "react";
import axios from 'axios';
import VideoPlayer from "./video";
import LoadingBar from "./loading";
import YoutubeEmbed from "./YoutubeEmbed";
import { BiCctv } from "react-icons/bi";

function FileWindow() {
    const [file, setFile] = useState()
    const [url, setURL] = useState()
    const [path, setPath] = useState()
    const [success, setSuccess] = useState(0)
    const [content, setContent] = useState('')
    const [processing, setProcessing] = useState(0)

    function handleChange(event) {
        setFile(event.target.files[0])
    }

    function handleUrlChange(event) {
        console.log(event.target.value)
        setURL(event.target.value)
    }

    function handleURLSubmit(event) {
        event.preventDefault()
        setPath(url)
        setSuccess(1)
        setProcessing(1)
    }

    function handleStreamLoad() {
        setProcessing(0)
    }

    function handleStreamError() {
        setProcessing(0)
        alert("Failed to load video stream. Please check the URL.")
    }

    return (
        <div className="flex-row items-center justify-start">
            <h1 className="w-full my-4 text-3xl font-bold text-center">Detection Tool </h1>

            <div className="w-full px-10 my-10">
                <form className="flex justify-center">
                    <input type="text" id="small-input" className="p-4 w-[50rem] outline-none rounded-full border-2 border-gray-300" placeholder="Enter video stream" onChange={handleUrlChange}></input>
                    <button onClick={handleURLSubmit} className="p-4 mx-5 text-white rounded-full bg-primary dark:bg-primary-dark"><BiCctv size={25} /></button>
                </form>
            </div>

            {success == 1 ? (
                <div className={processing ? 'hidden' : 'block'}>
                    <VideoPlayer
                        url={path}
                        onLoad={handleStreamLoad}
                        onError={handleStreamError}
                    />
                </div>
            ) : ''}
            {processing == 1 ? <LoadingBar /> : ''}
        </div>
    )
}

export default FileWindow;