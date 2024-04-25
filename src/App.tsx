import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { BiMicrophone, BiMicrophoneOff, BiRightArrowAlt } from "react-icons/bi";
import { BsFillPlayCircleFill } from "react-icons/bs";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import "./index.css";

const items = [
  [
    {
      label: "Abraham",
      counts: 6,
      correctAns: ["abraham"],
    },
    {
      label: "Daniel",
      counts: 3,
      correctAns: ["daniel"],
    },
    {
      label: "Moises",
      counts: 4,
      correctAns: ["moises"],
    },
    {
      label: "Jesus",
      counts: 7,
      correctAns: ["jesus", "hesus"],
    },
    {
      label: "Pablo",
      counts: 9,
      correctAns: ["pablo"],
    },
  ],
  [
    {
      label: "Kawikaan",
      counts: 6,
      correctAns: ["kawikaan"],
    },
    {
      label: "Daniel",
      counts: 3,
      correctAns: ["daniel"],
    },
    {
      label: "Genesis",
      counts: 4,
      correctAns: ["genesis"],
    },
    {
      label: "Marcos",
      counts: 7,
      correctAns: ["marcos"],
    },
  ],
  [
    {
      label: "Maibigin",
      counts: 6,
      correctAns: ["love", "loving", "pag-ibig"],
    },
    {
      label: "Daniel",
      counts: 3,
      correctAns: ["daniel"],
    },
    {
      label: "Genesis",
      counts: 4,
      correctAns: ["genesis"],
    },
    {
      label: "Marcos",
      counts: 7,
      correctAns: ["marcos"],
    },
    {
      label: "Maibigin",
      counts: 6,
      correctAns: ["love", "loving", "pag-ibig"],
    },
    {
      label: "Daniel",
      counts: 3,
      correctAns: ["daniel"],
    },
    {
      label: "Genesis",
      counts: 4,
      correctAns: ["genesis"],
    },
    {
      label: "Marcos",
      counts: 7,
      correctAns: ["marcos"],
    },
  ],
];

const VoiceRecognitionComponent: React.FC = () => {
  const [disabled, setDisbled] = useState(true);
  const [transcript, setTranscript] = useState<string>("");
  const [level, setLevel] = useState(0);
  const [current, setCurrent] = useState<any[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [incorrect, setIncorrect] = useState(false);

  const { transcript: currentTranscript } = useSpeechRecognition();

  useEffect(() => {
    setTranscript(currentTranscript);
  }, [currentTranscript]);

  useEffect(() => {
    setCurrent(items[level].sort((a, b) => b.counts - a.counts));
  }, [level]);

  const startListening = () => {
    if (!disabled) {
      setDisbled(true);
    } else {
      setDisbled(false);
      SpeechRecognition.startListening();
      setTranscript(currentTranscript);
    }
  };

  const checkAnswer = () => {
    const correct = current.find(({ correctAns }) =>
      correctAns.includes(transcript)
    );
    if (correct) {
      setAnswers([...answers, transcript]);
    } else {
      setIncorrect(true);
    }
  };

  return (
    <div className="main-container">
      {incorrect ? (
        <div className="modal" onClick={() => setIncorrect(false)}>
          <div>
            <IoClose />
          </div>
        </div>
      ) : null}
      <h1>Family Feud</h1>
      <div className="answer-main-container">
        <div className="answer-container">
          {current.slice(0, 4).map(({ label, counts, correctAns }) => {
            const inAnswer = correctAns.some((ans: string) =>
              answers.includes(ans)
            );

            return (
              <div onClick={() => setAnswers([...answers, correctAns[0]])}>
                {inAnswer ? (
                  <>
                    {label} <span className="counts">{counts}</span>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
        <div className="answer-container">
          {current.slice(4).map(({ label, counts, correctAns }) => {
            const inAnswer = correctAns.some((ans: string) =>
              answers.includes(ans)
            );

            return (
              <div onClick={() => setAnswers([...answers, correctAns[0]])}>
                {inAnswer ? (
                  <>
                    {label} <span className="counts">{counts}</span>
                  </>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <div className="footer">
        <div className="buttons">
          <button onClick={startListening}>
            {disabled ? <BiMicrophoneOff /> : <BiMicrophone />}
          </button>
          <button onClick={() => checkAnswer()}>
            <BsFillPlayCircleFill />
          </button>
          <button
            onClick={() => {
              setAnswers([]);
              setLevel(level + 1);
            }}
          >
            <BiRightArrowAlt />
          </button>
          <div className="user-answer">{transcript}</div>
        </div>
        <div className="score-board">
          <div>
            <p>TEAM A</p>
            <input type="text" />
          </div>
          <div>VS</div>
          <div>
            <p>TEAM B</p>
            <input type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecognitionComponent;
