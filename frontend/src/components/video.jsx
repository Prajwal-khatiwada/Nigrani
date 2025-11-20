
function VideoPlayer(props) {
    console.log("http://127.0.0.1:5000/testurl/" + props.url)

    return (
        <div className="flex justify-center">


            {/* <video controls autoPlay width="50%" className="mt-10">
                <source src="http://127.0.0.1:5000/video" type="video/mp4" />
                Processing
            </video> */}
            <img
                src={"http://127.0.0.1:5000/testurl/" + props.url}
                className={`mt-4 ${props.className || ''}`}
                width="70%"
                onLoad={props.onLoad}
                onError={props.onError}
            />
        </div>
    )
}

export default VideoPlayer;