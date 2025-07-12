import React, { useEffect, useRef, useState} from 'react';
import io from 'socket.io-client';
import {  IconButton, TextField } from '@mui/material';
import { useParams } from "react-router-dom";
import { Button } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import CallEndIcon from '@mui/icons-material/CallEnd';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import ScreenShareIcon from '@mui/icons-material/ScreenShare';
import StopScreenShareIcon from '@mui/icons-material/StopScreenShare';

import server from '../environment';
import axios from 'axios';
const server_url = server.prod;

var connections = {};

const peerConfigConnections = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export default function VideoMeetComponent() {
  const { appoinmentId } = useParams();
  console.log("ROOM ID FROM URL:", appoinmentId);
  const [appointment, setAppointment] = useState(null);
  const socketRef = useRef();
  const socketIdRef = useRef();
  const localVideoref = useRef();
  const [videoAvailable, setVideoAvailable] = useState(true);
  const [audioAvailable, setAudioAvailable] = useState(true);
  const [video, setVideo] = useState();
  const [audio, setAudio] = useState();
  const [screen, setScreen] = useState();
  const [showModal, setModal] = useState(true);
  const [screenAvailable, setScreenAvailable] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [newMessages, setNewMessages] = useState(0);
  const [askForUsername, setAskForUsername] = useState(true);
  const [username, setUsername] = useState('');
  const videoRef = useRef([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
  const fetchAppointment = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/appointments/${appoinmentId}`);
      setAppointment(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching appointment:", err);
    }
  };
  fetchAppointment();
}, [appoinmentId]);


  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    try {
      const videoPermission = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoPermission) {
        setVideoAvailable(true);
        console.log('Video permission granted');
      } else {
        setVideoAvailable(false);
        console.log('Video permission denied');
      }

      const audioPermission = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (audioPermission) {
        setAudioAvailable(true);
        console.log('Audio permission granted');
      } else {
        setAudioAvailable(false);
        console.log('Audio permission denied');
      }

      if (navigator.mediaDevices.getDisplayMedia) {
        setScreenAvailable(true);
      } else {
        setScreenAvailable(false);
      }

      if (videoAvailable || audioAvailable) {
        const userMediaStream = await navigator.mediaDevices.getUserMedia({
          video: videoAvailable,
          audio: audioAvailable,
        });
        if (userMediaStream) {
          window.localStream = userMediaStream;
          if (localVideoref.current) {
            localVideoref.current.srcObject = userMediaStream;
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (video !== undefined && audio !== undefined) {
      getUserMedia();
      console.log('SET STATE HAS ', video, audio);
    }
  }, [video, audio]);

  const getMedia = () => {
    setVideo(videoAvailable);
    setAudio(audioAvailable);
    connectToSocketServer();
  };

  const getUserMedia = () => {
    if ((video && videoAvailable) || (audio && audioAvailable)) {
      navigator.mediaDevices
        .getUserMedia({ video: video, audio: audio })
        .then(getUserMediaSuccess)
        .catch((e) => console.log(e));
    } else {
      try {
        let tracks = localVideoref.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      } catch (e) {}
    }
  };

  const getUserMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              'signal',
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          setVideo(false);
          setAudio(false);

          try {
            let tracks = localVideoref.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
          } catch (e) {
            console.log(e);
          }

          let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
          window.localStream = blackSilence();
          localVideoref.current.srcObject = window.localStream;

          for (let id in connections) {
            connections[id].addStream(window.localStream);

            connections[id].createOffer().then((description) => {
              connections[id]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    'signal',
                    id,
                    JSON.stringify({ sdp: connections[id].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        })
    );
  };

  const getDislayMedia = () => {
    if (screen) {
      if (navigator.mediaDevices.getDisplayMedia) {
        navigator.mediaDevices
          .getDisplayMedia({ video: true, audio: true })
          .then(getDislayMediaSuccess)
          .catch((e) => console.log(e));
      }
    }
  };

  const getDislayMediaSuccess = (stream) => {
    try {
      window.localStream.getTracks().forEach((track) => track.stop());
    } catch (e) {
      console.log(e);
    }

    window.localStream = stream;
    localVideoref.current.srcObject = stream;

    for (let id in connections) {
      if (id === socketIdRef.current) continue;

      connections[id].addStream(window.localStream);

      connections[id].createOffer().then((description) => {
        connections[id]
          .setLocalDescription(description)
          .then(() => {
            socketRef.current.emit(
              'signal',
              id,
              JSON.stringify({ sdp: connections[id].localDescription })
            );
          })
          .catch((e) => console.log(e));
      });
    }

    stream.getTracks().forEach(
      (track) =>
        (track.onended = () => {
          setScreen(false);

          try {
            let tracks = localVideoref.current.srcObject.getTracks();
            tracks.forEach((track) => track.stop());
          } catch (e) {
            console.log(e);
          }

          let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
          window.localStream = blackSilence();
          localVideoref.current.srcObject = window.localStream;

          getUserMedia();
        })
    );
  };

  const gotMessageFromServer = (fromId, message) => {
    var signal = JSON.parse(message);

    if (fromId !== socketIdRef.current) {
      if (signal.sdp) {
        connections[fromId]
          .setRemoteDescription(new RTCSessionDescription(signal.sdp))
          .then(() => {
            if (signal.sdp.type === 'offer') {
              connections[fromId]
                .createAnswer()
                .then((description) => {
                  connections[fromId]
                    .setLocalDescription(description)
                    .then(() => {
                      socketRef.current.emit(
                        'signal',
                        fromId,
                        JSON.stringify({ sdp: connections[fromId].localDescription })
                      );
                    })
                    .catch((e) => console.log(e));
                })
                .catch((e) => console.log(e));
            }
          })
          .catch((e) => console.log(e));
      }

      if (signal.ice) {
        connections[fromId]
          .addIceCandidate(new RTCIceCandidate(signal.ice))
          .catch((e) => console.log(e));
      }
    }
  };

  const connectToSocketServer = () => {
    socketRef.current = io.connect(server_url, { secure: false });

    socketRef.current.on('signal', gotMessageFromServer);

    socketRef.current.on('connect', () => {
      socketRef.current.emit('join-call', window.location.href);
      socketIdRef.current = socketRef.current.id;

      socketRef.current.on('chat-message', addMessage);

      socketRef.current.on('user-left', (id) => {
        setVideos((videos) => videos.filter((video) => video.socketId !== id));
      });

      socketRef.current.on('user-joined', (id, clients) => {
        clients.forEach((socketListId) => {
          connections[socketListId] = new RTCPeerConnection(peerConfigConnections);
          connections[socketListId].onicecandidate = function (event) {
            if (event.candidate != null) {
              socketRef.current.emit('signal', socketListId, JSON.stringify({ ice: event.candidate }));
            }
          };

          connections[socketListId].onaddstream = (event) => {
            let videoExists = videoRef.current.find((video) => video.socketId === socketListId);

            if (videoExists) {
              setVideos((videos) => {
                const updatedVideos = videos.map((video) =>
                  video.socketId === socketListId ? { ...video, stream: event.stream } : video
                );
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            } else {
              let newVideo = {
                socketId: socketListId,
                stream: event.stream,
                autoplay: true,
                playsinline: true,
              };

              setVideos((videos) => {
                const updatedVideos = [...videos, newVideo];
                videoRef.current = updatedVideos;
                return updatedVideos;
              });
            }
          };

          if (window.localStream !== undefined && window.localStream !== null) {
            connections[socketListId].addStream(window.localStream);
          } else {
            let blackSilence = (...args) => new MediaStream([black(...args), silence()]);
            window.localStream = blackSilence();
            connections[socketListId].addStream(window.localStream);
          }
        });

        if (id === socketIdRef.current) {
          for (let id2 in connections) {
            if (id2 === socketIdRef.current) continue;

            try {
              connections[id2].addStream(window.localStream);
            } catch (e) {}

            connections[id2].createOffer().then((description) => {
              connections[id2]
                .setLocalDescription(description)
                .then(() => {
                  socketRef.current.emit(
                    'signal',
                    id2,
                    JSON.stringify({ sdp: connections[id2].localDescription })
                  );
                })
                .catch((e) => console.log(e));
            });
          }
        }
      });
    });
  };

  const silence = () => {
    let ctx = new AudioContext();
    let oscillator = ctx.createOscillator();
    let dst = oscillator.connect(ctx.createMediaStreamDestination());
    oscillator.start();
    ctx.resume();
    return Object.assign(dst.stream.getAudioTracks()[0], { enabled: false });
  };

  const black = ({ width = 640, height = 480 } = {}) => {
    let canvas = Object.assign(document.createElement('canvas'), { width, height });
    canvas.getContext('2d').fillRect(0, 0, width, height);
    let stream = canvas.captureStream();
    return Object.assign(stream.getVideoTracks()[0], { enabled: false });
  };

  const handleVideo = () => {
    setVideo(!video);
  };

  const handleAudio = () => {
    setAudio(!audio);
  };

  useEffect(() => {
    if (screen !== undefined) {
      getDislayMedia();
    }
  }, [screen]);

  const handleScreen = () => {
    setScreen(!screen);
  };
  // HAndle ENd Call

  // const handleEndCall = () => {
  //   try {
  //     let tracks = localVideoref.current.srcObject.getTracks();
  //     tracks.forEach((track) => track.stop());
  //   } catch (e) {}
  //   window.location.href = '/';
  // };
  const handleEndCall = async () => {
  try {
    // Stop video/audio tracks
    let tracks = localVideoref.current.srcObject?.getTracks();
    tracks?.forEach((track) => track.stop());

    // ✅ FIXED: Correct URL & Check if ID is valid
    if (!appoinmentId) {
      alert("Appointment ID missing!");
      return;
    }

    await axios.put(`http://localhost:5000/api/appointments/${appoinmentId}/complete`);

    alert("Call ended and appointment marked as completed.");
  } catch (err) {
    console.error("Error ending call:", err);
    alert("Failed to end call or update appointment.");
  } finally {
    window.location.href = "/";
  }
};



  // const openChat = () => {
  //   setModal(true);
  //   setNewMessages(0);
  // };

  // const closeChat = () => {
  //   setModal(false);
  // };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const addMessage = (data, sender, socketIdSender) => {
    setMessages((prevMessages) => [...prevMessages, { sender: sender, data: data }]);
    if (socketIdSender !== socketIdRef.current) {
      setNewMessages((prevNewMessages) => prevNewMessages + 1);
    }
  };

  const sendMessage = () => {
    socketRef.current.emit('chat-message', message, username);
    setMessage('');
  };

  const connect = () => {
    setAskForUsername(false);
    getMedia();
  };
return (
  <div className="min-h-screen bg-gray-900 text-white flex flex-col">
    {askForUsername ? (
      <div className="flex flex-col items-center justify-center flex-1 space-y-6">
        <h2 className="text-3xl font-bold">Enter into Lobby</h2>
        <TextField
          id="outlined-basic"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          variant="outlined"
          className="w-80"
          InputProps={{
            className: 'bg-gray-800 text-white',
          }}
          InputLabelProps={{
            className: 'text-gray-400',
          }}
        />
        <Button
          variant="contained"
          onClick={connect}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Connect
        </Button>
        <div className="w-80 h-60 bg-gray-800 rounded-lg overflow-hidden">
          <video
            ref={localVideoref}
            autoPlay
            muted
            className="w-full h-full object-cover"
          ></video>
        </div>
      </div>
    ) : (
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Video Section */}
        <div className="flex-1 p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 overflow-y-auto">
          {/* Local Video */}
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md">
            <video
              ref={localVideoref}
              autoPlay
              muted
              className="w-full h-64 object-cover"
            ></video>
          </div>

          {/* Remote Videos */}
          {videos.map((video) => (
            <div
              key={video.socketId}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-md"
            >
              <video
                data-socket={video.socketId}
                ref={(ref) => {
                  if (ref && video.stream) {
                    ref.srcObject = video.stream;
                  }
                }}
                autoPlay
                className="w-full h-64 object-cover"
              ></video>
            </div>
          ))}
        </div>

        {/* Right: Chat Section */}
        <div className="w-80 bg-gray-800 shadow-lg flex flex-col">
          <div className="p-4 border-b border-gray-700">
            <h1 className="text-xl font-semibold">Chat</h1>
          </div>
          <div className="flex-1 p-4 overflow-y-auto">
            {messages.length ? (
              messages.map((item, index) => (
                <div key={index} className="mb-4">
                  <p className="font-bold text-blue-400">{item.sender}</p>
                  <p className="text-gray-300">{item.data}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No Messages Yet</p>
            )}
          </div>
          <div className="p-4 border-t border-gray-700 flex space-x-2">
            <TextField
              value={message}
              onChange={handleMessage}
              id="outlined-basic"
              label="Enter Your Chat"
              variant="outlined"
              className="flex-1"
              InputProps={{
                className: 'bg-gray-700 text-white',
              }}
              InputLabelProps={{
                className: 'text-gray-400',
              }}
            />
            <Button
              variant="contained"
              onClick={sendMessage}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Send
            </Button>
          </div>
        </div>
      </div>
    )}

    {/* Bottom Center Controls */}
    {!askForUsername && (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-gray-800 p-3 rounded-full shadow-lg flex space-x-4">
        <IconButton onClick={handleVideo} className="text-white">
          {video ? <VideocamIcon /> : <VideocamOffIcon />}
        </IconButton>
        <IconButton onClick={handleEndCall} className="text-red-500">
          <CallEndIcon />
        </IconButton>
        <IconButton onClick={handleAudio} className="text-white">
          {audio ? <MicIcon /> : <MicOffIcon />}
        </IconButton>
        {screenAvailable && (
          <IconButton onClick={handleScreen} className="text-white">
            {screen ? <ScreenShareIcon /> : <StopScreenShareIcon />}
          </IconButton>
        )}
      </div>
    )}
  </div>
);


}