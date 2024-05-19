import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { BiRightArrowAlt } from "react-icons/bi";
import { BsFillPlayCircleFill } from "react-icons/bs";
import "./index.css";

const items = [
  [
    {
      label: "Hosea",
      counts: 61,
      correctAns: ["hosea"],
    },
    {
      label: "David",
      counts: 14,
      correctAns: ["david"],
    },

    {
      label: "Solomon",
      counts: 12,
      correctAns: ["solomon"],
    },
    {
      label: "Zedekias",
      counts: 6,
      correctAns: ["zedekias"],
    },
    {
      label: "Hezekias",
      counts: 4,
      correctAns: ["hezekias"],
    },
    {
      label: "Josias",
      counts: 2,
      correctAns: ["josias"],
    },
    {
      label: "Manases",
      counts: 1,
      correctAns: ["manases"],
    },
  ],
  [
    {
      label: "India",
      counts: 48,
      correctAns: ["india"],
    },
    {
      label: "Israel",
      counts: 28,
      correctAns: ["israel"],
    },
    {
      label: "Egypt",
      counts: 15,
      correctAns: ["ehipto", "egypt"],
    },
    {
      label: "Galacia",
      counts: 4,
      correctAns: ["galacia"],
    },
    {
      label: "Roma",
      counts: 3,
      correctAns: ["roma", "rome"],
    },
    {
      label: "Babilonya",
      counts: 2,
      correctAns: ["babilonya"],
    },
  ],
  [
    {
      label: "Pedro",
      counts: 35,
      correctAns: ["pedro"],
    },
    {
      label: "Santiago",
      counts: 25,
      correctAns: ["santiago"],
    },
    {
      label: "juan",
      counts: 7,
      correctAns: ["mapagpatawad"],
    },
    {
      label: "Tomas",
      counts: 5,
      correctAns: ["tomas"],
    },
    {
      label: "Felipe",
      counts: 3,
      correctAns: ["Felipe"],
    },
    {
      label: "mateo",
      counts: 2,
      correctAns: ["makatwiran"],
    },
    {
      label: "Andres",
      counts: 2,
      correctAns: ["andres"],
    },
  ],
];

const VoiceRecognitionComponent: React.FC = () => {
  const [level, setLevel] = useState(0);
  const [current, setCurrent] = useState<any[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [incorrect, setIncorrect] = useState(false);
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    setCurrent(items[level].sort((a, b) => b.counts - a.counts));
  }, [level]);

  const checkAnswer = () => {
    const correct = current.find(({ correctAns }) =>
      correctAns.includes(answer)
    );
    if (correct) {
      setAnswers([...answers, answer]);
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
      <h1>Round {level + 1}</h1>
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
          <input
            type="text"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          />
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
        </div>
      </div>
    </div>
  );
};

export default VoiceRecognitionComponent;
