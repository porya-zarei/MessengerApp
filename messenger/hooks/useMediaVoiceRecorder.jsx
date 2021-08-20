import { useState } from "react";

const useMediaVoiceRecording = (setVoice) => {

    const [recordingState, setRecordingState] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState();
    const [url, setUrl] = useState("");

    const blobToFile = (theBlob, fileName) => {
        try {
            var file = new File([theBlob], fileName);
            console.log("file type 2 => ", file);
            setVoice(file);
            return file;
        } catch (error) {
            console.log("error file type 2 => ", error);
        }
    };

    const handleRecoding = () => {

        let d = [];
        
        if (!recordingState) {
            if (navigator && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices
                    .getUserMedia({
                        audio: true,
                    })
                    .then(function (stream) {
                        
                        let recorder = new MediaRecorder(stream);
                        
                        recorder.ondataavailable = function (e) {
                            console.log("on available data voice => ", e.data);
                            d.push(e.data);
                        };
                        
                        recorder.onstop = (e) => {
                            const blob = new Blob(d, {
                                type: "audio/ogg; codecs=opus",
                            });
                            let file = blobToFile(blob, "voice.ogg", "2");
                            setVoice(file);
                            const audioURL = window.URL.createObjectURL(file);
                            setUrl(audioURL);
                        };
                        
                        recorder.start();
                        
                        setMediaRecorder(recorder);
                        
                        setRecordingState(true);
                    })
                    .catch(function (err) {
                        console.log(
                            "The following getUserMedia error occurred: " + err,
                        );
                        setMediaRecorder(null);
                    });
            }
        } else {
            try {
                mediaRecorder.stop();
                setMediaRecorder(null);
                setRecordingState(false);
            } catch (error) {
                setRecordingState(false);
                setMediaRecorder(null);
                console.log("error in save voice => ", error);
            }
        }
    };
    return {recordingState,handleRecoding,url};
}
 
export default useMediaVoiceRecording;