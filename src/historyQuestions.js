import React, {Component} from 'react';
import firebase from './firebase.js';
import AddQuestionsHistory from './addQuestionsHistory.js';
import ProfileComponent from './ProfileComponent.js';

import Quiz from './quiz.js';
import "./App.css"
import "./quiz.css"


class HistoryQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: true,
      writeQuestion: true,
      backToProfile: true,
      backToQuiz: true,
      timeLeft: 6,
      isPlaying: false,
      tenQuestions: [],
      backgroundA: "",
      backgroundB: "",
      backgroundC: "",
      backgroundD: "",
      currentQuestion: 0,
      lastVal: "",
      totalAnswers: [],
      totalCorrectAnswers: 0,
      totalFailedAnswers: 0,
      nickname: this.props.nickname,
      handleChange:true,
      divClass : "Row",
      profile : {},
      wichState:true,
      disabledBtn: '',
      displayPlay: "show",
      displayCreate: "showCreate"
    }
    // console.log(this.state)
    // console.log(this.props)
      this.clickedButton = this.clickedButton.bind(this);
      this.startTimer = this.startTimer.bind(this);
      this.resetTimer = this.resetTimer.bind(this);
      this.stopTimer = this.stopTimer.bind(this);
  }

  // sendQuestion = () => {
  //   this.setState({clicked: false})

  //   const questionRef = firebase.database().ref('questions/genre/History/');

  //   let theQuestions;
  //   questionRef.once("value", function(snapshot) {
  //     questionRef.push(theQuestions)
  //   });
  // }

  getQuestions = () => {

    if(this.state.displayPlay === "show"){
      console.log(this.state.displayPlay)
      this.setState({
        displayPlay:"none"
      })
    }else{
      console.log(this.state.displayPlay)

      this.setState({
        displayPlay:"show"
      })
    }

    if(this.state.displayCreate === "showCreate"){
      this.setState({
        displayCreate:"noneCreate"
      })
    }else{
      this.setState({
        displayCreate:"showCreate"
      })
    }
      this.startTimer()
    this.setState({clicked: false, currentQuestion: 0, totalCorrectAnswers: 0, totalFailedAnswers: 0, handleChange:false, wichState:false})


    let historyQuestions = [];

    let ten = [];
    let self = this;
    var ref = firebase.database().ref("questions/genre/History/");
    ref.once("value", function(snapshot) {
      let obj = snapshot.val()
      for (let element in obj) {

        HistoryQuestions.push(obj[element])
      }

      shuffleArray(HistoryQuestions)
      function shuffleArray(HistoryQuestions) {

        for (let i = HistoryQuestions.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [HistoryQuestions[i], HistoryQuestions[j]] = [HistoryQuestions[j], HistoryQuestions[i]];
        }
      }
      for (let y = 0; y < 10; y++) {

        ten.push(historyQuestions[y])

      }
      putState(ten)
    }, function(error) {
       // console.log("Error: " + error.code);
    });

    function putState(ten) {
      self.setState({tenQuestions: ten})

    }

      this.setState({
      isButtonDisabled: true
    });

  }

  componentDidUpdate() {



    if (this.state.currentQuestion === 10 && this.state.totalAnswers.length === 10) {

      this.setState({
        displayPlay:"show",
        displayCreate:"showCreate"
      })
      let correct = 0;
      let wrong = 0;

      for (let i = 0; i < this.state.totalAnswers.length; i++) {
        if (this.state.totalAnswers[i] === true) {
          correct++
        } else {
          wrong++
        }
      }

      let rank;

      let databaseCorrect;
      let databaseWrong;
      let self = this;
      // console.log(this.props.firebaseKey)

      firebase.database().ref('users/' + this.props.firebaseKey).once("value", function(snapshot) {
        let Obj = snapshot.val();

        // console.log(Obj)
        databaseCorrect = Obj.profile.correctAnswers;
        databaseWrong = Obj.profile.failedAnswers;


        function loopFunc(val) {
          firebase.database().ref('users/').once("value", function(snapshot) {

            let helaDatabasen = snapshot.val()
            // let newArr;
            let arr = []

            for (let element in helaDatabasen) {
              let namn = helaDatabasen[element].profile.nickname
              let profilen = helaDatabasen[element].profile.ranking
              // let length = helaDatabasen[element].profile.ranking.length
              arr.push({nickname: namn, ranking: Number(profilen)})
            }

            arr.sort(function(a, b) {
              return a.ranking - b.ranking
            })

            // newArr = arr.reverse();
            // let place = 0;
            // for (let element in helaDatabasen) {
            //   // console.log("element: ", helaDatabasen[element])
            //   // console.log("newArr: ", newArr)
            //   for (let i = 0; i < newArr.length; i++) {
            //     if (newArr[i].nickname === helaDatabasen[element].profile.nickname) {
            //       place = i + 1
            //     }
            //   }
            // }
            function hej(){
              self.setState({
                  handleChange:true,
                  nickname: self.state.nickname,
                  profile: {
                    nickname: self.state.nickname,
                    photo: self.props.profile.photo,
                    correctAnswers: databaseCorrect + correct,
                    failedAnswers: databaseWrong + wrong,
                    uid: self.props.profile.uid,
                    ranking: rank.toFixed(2),
                    // place: place,
                  }
              })
            }
              if(val === "finnsInte"){
                let plus = correct + wrong;
                rank = (correct / plus) * 100;
                firebase.database().ref('users/' + self.props.firebaseKey).set({
                  nickname: self.state.nickname,
                  profile: {
                    // nickname: self.state.nickname,
                    photo: self.props.profile.photo,
                    correctAnswers: databaseCorrect + correct,
                    failedAnswers: databaseWrong + wrong,
                    uid: self.props.profile.uid,
                    ranking: rank.toFixed(2),
                    // place: place,
                  }
                },hej());
              }else{
                // console.log(self.props)
                let totalCorrect = databaseCorrect + correct;
                let totalFail = databaseWrong + wrong;
                let plus = totalCorrect + totalFail;
                rank = (totalCorrect / plus) * 100

                firebase.database().ref('users/' + self.props.firebaseKey + "/").set({
                  nickname: self.props.nickname,
                  profile: {
                    nickname: self.props.nickname,
                    photo: self.props.profile.photo,
                    correctAnswers: databaseCorrect + correct,
                    failedAnswers: databaseWrong + wrong,
                    uid: self.props.profile.uid,
                    ranking: rank.toFixed(2),
                    // place: place,
                  }

                },hej());
              }
          })
        }
        if (databaseCorrect === 0 && databaseWrong === 0) {
          loopFunc("finnsInte")
        } else {
          loopFunc()
        }
      })
      this.setState({totalCorrectAnswers: correct, totalFailedAnswers: wrong, totalAnswers: []})

        this.setState({
            isButtonDisabled: false
    });
    }
  }




  clickedButton(val, correctAnswer) {

    switch (val) {
        case "a":
        this.setState({backgroundA: "bgColor", backgroundB: "", backgroundC: "", backgroundD: "", lastVal: "a", disabledBtn: "true"})
        break;
        case "b":
        this.setState({backgroundA: "", backgroundB: "bgColor", backgroundC: "", backgroundD: "", lastVal: "b", disabledBtn: "true"})
        break;
        case "c":
        this.setState({backgroundA: "", backgroundB: "", backgroundC: "bgColor", backgroundD: "", lastVal: "c", disabledBtn: "true"})
        break;
        case "d":
        this.setState({backgroundA: "", backgroundB: "", backgroundC: "", backgroundD: "bgColor", lastVal: "d", disabledBtn: "true"})
        break;
        default:
    }
    // console.log(val)
if(this.state.timeLeft === 0){
         // console.log("hejsan")
            this.setState({
          currentQuestion: this.state.currentQuestion + 1,
          backgroundA: "",
          backgroundB: "",
          backgroundC: "",
          backgroundD: "",
          divClass: "Row",
          disabledBtn: ""
        })

        }
    if (this.state.backgroundA !== "" || this.state.backgroundB !== "" || this.state.backgroundC !== "" || this.state.backgroundD !== "") {
      if (val === "next" && this.state.timeLeft > 0) {

        // console.log(val)
        // console.log(correctAnswer)
        if (this.state.lastVal === correctAnswer) {
          this.state.totalAnswers.push(true)
        } else {
          this.state.totalAnswers.push(false)
        }

        // console.log(this.state.totalAnswers);
        this.setState({
          currentQuestion: this.state.currentQuestion + 1,
          backgroundA: "",
          backgroundB: "",
          backgroundC: "",
          backgroundD: "",
          disabledBtn: ""
        })
      }
    }
  }
  tick() {
    this.setState({
      timeLeft: this.state.timeLeft - 1
    });
    if(this.state.timeLeft === 0) {
        // console.log(this.state)
      this.setState({
          divClass: "Row li, disabled",
          disabledBtn: "true"
      })
     this.stopTimer();
     this.state.totalAnswers.push(false)
    }
      if(this.state.currentQuestion === 10){
        this.stopTimer();
      }
      // else if(this.state.writeQuestion === false){
      //   this.stopTimer();
      // }
  }
  startTimer() {
      // console.log(this.state.timeLeft)
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
    this.setState({
      isPlaying: true
    });

  }
resetTimer() {
  clearInterval(this.timerID);
    this.setState({
      timeLeft: 6
    });
}
stopTimer() {
  clearInterval(this.timerID);
    this.setState({
      isPlaying: false
    });
}


  writeQuestion = () => {
    this.setState({writeQuestion: false})
  }
  backToQuiz = () => {
    this.setState({backToQuiz: false})
  }

  backToProfile = () => {

    if(this.state.wichState){
      // console.log(this.state.profile)

      this.setState({
        backToProfile: false,
        nickname: this.props.nickname,
        profile: {
          nickname: this.props.profile.nickname,
          photo: this.props.profile.photo,
          correctAnswers: this.props.profile.correctAnswers,
          failedAnswers: this.props.profile.failedAnswers,
          uid: this.props.profile.uid,
          ranking: this.props.profile.ranking,
          place: this.props.profile.place,
        }
      })
    }else{
      // console.log(this.state.profile)

      this.setState({
        backToProfile: false,
        nickname: this.state.nickname,
        profile: {
          nickname: this.state.profile.nickname,
          photo: this.state.profile.photo,
          correctAnswers: this.state.profile.correctAnswers,
          failedAnswers: this.state.profile.failedAnswers,
          uid: this.state.profile.uid,
          ranking: this.state.profile.ranking,
          place: this.state.profile.place,
        }
      })
    }
  }
  render() {
    // const isPlaying = this.state.isPlaying;

    if (!this.state.backToProfile) {
      return (<div>
        <ProfileComponent firebaseKey={this.props.firebaseKey} profile={this.state.profile} nickname={this.state.nickname} />
      </div>)
    }

    if (!this.state.writeQuestion) {
      return (<div>
        <AddQuestionsHistory profile={this.props.profile} nickname={this.state.nickname} firebaseKey={this.props.firebaseKey}/>
      </div>)
    }

    if (!this.state.backToQuiz) {
      return (<div>
        <Quiz profile={this.props.profile} nickname={this.state.nickname} firebaseKey={this.props.firebaseKey}/>
      </div>)
    }
    return (<div className="historyQuestion">
      <div className="buttons">
       <button  onClick={this.writeQuestion} className={"historyCreate " +this.state.displayCreate + " btn"}>Write your own question</button>
       <button onClick={this.backToQuiz}  className={"historyCreate " +this.state.displayCreate + " btn"}>Back to quizzes</button>
    </div>
        {(this.state.handleChange === true)
          ?
          <div>
          <div className="profilePosition">
          <div className="quizDiv">
            <div onClick={this.backToProfile} profile={this.props.profile}>
              <h3>{this.state.nickname}</h3>
                <img src={this.props.profile.photo + "?width=999"} alt=" "/>
            </div>
          </div>
          </div>
          </div>
          :
          <div></div>
        }


        <h1 className="knowledgeHeader">Lets see how much you know about history!</h1>

        <div className={this.state.displayPlay}>


          <div   onClick={this.getQuestions}>

            <button className="btn">

            Start quiz
            </button>
          </div>
        </div>
      <div>
        {
          (this.state.tenQuestions[this.state.currentQuestion] !== undefined)
            ? <div className="question">

                <h2>{this.state.tenQuestions[this.state.currentQuestion].Question}</h2>
                <ul>

                  <div className={this.state.divClass}>
                    <li id={this.state.backgroundA} onClick={e => this.clickedButton('a', this.state.tenQuestions[this.state.currentQuestion].correctAnswer)}>{this.state.tenQuestions[this.state.currentQuestion].answers.a}</li>
                    <li id={this.state.backgroundB} onClick={e => this.clickedButton('b', this.state.tenQuestions[this.state.currentQuestion].correctAnswer)}>{this.state.tenQuestions[this.state.currentQuestion].answers.b}</li>
                  </div>
                  <div className={this.state.divClass}>
                    <li id={this.state.backgroundC} onClick={e => this.clickedButton('c', this.state.tenQuestions[this.state.currentQuestion].correctAnswer)}>{this.state.tenQuestions[this.state.currentQuestion].answers.c}</li>
                    <li id={this.state.backgroundD} onClick={e => this.clickedButton('d', this.state.tenQuestions[this.state.currentQuestion].correctAnswer)}>{this.state.tenQuestions[this.state.currentQuestion].answers.d}</li>
                  </div>
                </ul>

                <button className="btn" onClick={e => this.clickedButton("next", this.state.tenQuestions[this.state.currentQuestion].correctAnswer, this.resetTimer(), this.startTimer())} disabled={!this.state.disabledBtn}>Next question</button>

                <br/>
                <div className="timeAndCurrentQ">
                <div>Currently On Question: {this.state.currentQuestion + 1}/10</div>
                <div>Time remaining on current question: { this.state.timeLeft}</div>
                </div>
              </div>
            : <div></div>
        }
        {
          (this.state.currentQuestion === 10)
            ? <div className="answersAll">

                <h2>You got {this.state.totalCorrectAnswers} correct answers. And {this.state.totalFailedAnswers} wronged ones.</h2>

                <h2>Everything will be updated at your profile</h2>
              </div>
            : <div></div>

        }

      </div>

    </div>)
  }

}

export default HistoryQuestions;
