import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { Rating, Skeleton } from "@mui/material";
import Header from "../../Header";
import { mainData } from "../../sharedConsts";

const useStyles = makeStyles(() => ({
  courseCard: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "30px",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#fff",
  },
  courseImage: {
    width: "100%",
    height: 250,
  },
  courseDetails: {
    padding: "20px",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  courseName: {
    marginTop: 0,
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "bold",
    color: "#349e5b",
  },
  coursePrice: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#349e5b",
  },
  courseTags: {
    display: "flex",
    flexWrap: "wrap",
    marginBottom: "10px",
  },
  tag: {
    backgroundColor: "#349e5b",
    color: "#fff",
    fontSize: "14px",
    fontWeight: "bold",
    padding: "5px 10px",
    borderRadius: "20px",
    marginRight: "10px",
    marginBottom: "10px",
  },
  courseDescription: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#555",
  },
  courseStats: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "14px",
    color: "#555",
  },
  courseViews: {
    display: "flex",
    alignItems: "center",
  },
  courseRating: {
    display: "flex",
    alignItems: "center",
  },
}));


function Result({correct, questions}) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" />
      <h2>Сіз {questions.length} сұрақтың {correct} жауабын таптыңыз</h2>
      <button onClick={()=>document.location.reload()}>Қайтадан</button>
    </div>
  );
}

function Game({ step, question, onClickVariant, questions }) {
  const percentage = Math.round((step / questions.length) * 100)

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1 className="product__detail_h1">{question.title}</h1>
      <ul>
        {question.variants.map((e, id) => 
          <li onClick={()=>onClickVariant(id)} key={id}>{e}</li>  
        )}
      </ul>
    </>
  );
}

function ProductDetail({ isAdmin }) {
  const { id } = useParams();
  const data = mainData.find((e) => e.id === id);
  const [course, setCourse] = useState(data);
  const classes = useStyles();

  return course ? (
    <>
      <Header isAdmin={isAdmin} pageName={id + ' - сабақ'} />
      <ProductCart {...course} />
    </>
  ) : (
    <div className={classes.courseCard}>
      <div className={classes.courseImage}>
        <Skeleton height={250} variant="rectangular" />
      </div>
      <div className={classes.courseDetails}>
        <div>
          <Skeleton width="60%" height={40} />
          <Skeleton width="30%" height={30} style={{ marginTop: "10px" }} />
          <div className={classes.courseTags}>
            <Skeleton width="20%" height={30} />
            <Skeleton width="20%" height={30} />
            <Skeleton width="20%" height={30} />
          </div>
          <Skeleton height={80} style={{ marginTop: "10px" }} />
        </div>
        <div className={classes.courseStats}>
          <div className={classes.courseViews}>
            <Skeleton width={24} height={24} style={{ marginRight: "5px" }} />
            <Skeleton width={50} height={24} />
          </div>
          <div className={classes.courseRating}>
            <Skeleton width={24} height={24} style={{ marginRight: "5px" }} />
            <Skeleton width={50} height={24} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProductCart(props) {
  const { id, name, description, text, video, questions } = props;
  const [step, setStep] = useState(0)
  const [correct, setCorrect] = useState(0)
  const question = questions[step]

  const onClickVariant = (index) => {
    setStep(step + 1)

    if (index === question.correct) {
      setCorrect(correct + 1)
    }
  }

  return (
    <div className="cart__page">
      <div className="course-card">
        <div className="course-image">
          <iframe
            width="100%"
            height="260"
            src={`https://www.youtube.com/embed/${video}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Embedded youtube"
          />
        </div>
        <div className="course-details">
          <h3 className="course-name">{name}</h3>
          <div className="course-description">{description}</div>
          <br />
          <div
            className="course-description"
            dangerouslySetInnerHTML={{
              __html: text.replaceAll("\n", "</br>"),
            }}
          >
          </div>
          <div className="detail__test">
            {
              step !== questions.length
              ? <Game step={step} question={question} questions={questions} onClickVariant={onClickVariant} />
              : <Result correct={correct} questions={questions} />
            }
          </div>

        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
