import React, {Component} from 'react';
import firebase from './firebase.js';
import AddQuestions from './AddQuestions.js';
import ProfileComponent from './ProfileComponent.js';

class SportQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: true,
      writeQuestion: true,
      backToProfile: true,
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
      profile : {

      },
    }
    this.clickedButton = this.clickedButton.bind(this)
    console.log(this.props.firebaseKey)
    console.log(this.props.profile)

  }

  sendQuestion = () => {
    this.setState({clicked: false})

    const questionRef = firebase.database().ref('questions/genre/sport/');

    let theQuestions = {
      Question: "In 2002 on the same day as the World Cup final, 'The Other Final' took place between the world's two lowest ranking nations. Who won the game?",
      answers: {
        a: "Bhutan",
        b: "Eritrea",
        c: "Montserrat",
        d: "Solomon Islands"
      },
      correctAnswer: "a"
    }

    questionRef.once("value", function(snapshot) {
      questionRef.push(theQuestions)
    });
  }

  getQuestions = () => {
    this.setState({clicked: false, currentQuestion: 0, totalCorrectAnswers: 0, totalFailedAnswers: 0})

    let sportQuestions = [];
    let ten = [];
    let self = this;
    var ref = firebase.database().ref("questions/genre/sport/");
    ref.once("value", function(snapshot) {
      let obj = snapshot.val()
      for (let element in obj) {

        sportQuestions.push(obj[element])
      }

      shuffleArray(sportQuestions)
      function shuffleArray(sportQuestions) {

        for (let i = sportQuestions.length - 1; i > 0; i--) {
          let j = Math.floor(Math.random() * (i + 1));
          [
            sportQuestions[i], sportQuestions[j]
          ] = [
            sportQuestions[j], sportQuestions[i]
          ];
        }
      }

      for (let y = 0; y < 10; y++) {
        ten.push(sportQuestions[y])
      }

      // console.log(snapshot.val().questions.genre);

      putState(ten)

    }, function(error) {
      console.log("Error: " + error.code);
    });

    function putState(ten) {
      self.setState({tenQuestions: ten})

      console.log(self.state.tenQuestions)
    }

  }

  componentDidUpdate() {
    if (this.state.tenQuestions.length !== 0 && this.state.currentQuestion !== 10) {
      console.log(this.state.tenQuestions[this.state.currentQuestion].Question)
    }

    if (this.state.currentQuestion === 10 && this.state.totalAnswers.length === 10) {
      console.log("updated")
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

      let databaseCorrect = ""
      let databaseWrong = ""
      let self = this;
      firebase.database().ref('users/' + this.props.firebaseKey).once("value", function(snapshot) {
        console.log(snapshot.val())
        let Obj = snapshot.val();
        console.log(Obj)

        databaseCorrect = Obj.profile.correctAnswers;
        databaseWrong = Obj.profile.failedAnswers;
        console.log(Obj)

        function loopFunc(val) {
          firebase.database().ref('users/').once("value", function(snapshot) {

            let helaDatabasen = snapshot.val()
            let newArr;
            let arr = []

            for (let element in helaDatabasen) {
              let namn = helaDatabasen[element].profile.nickname
              let profilen = helaDatabasen[element].profile.ranking
              let length = helaDatabasen[element].profile.ranking.length
              console.log(profilen)
              console.log(length)
              if (length !== undefined) {

                arr.push({nickname: namn, ranking: Number(profilen)})
              }

            }

            arr.sort(function(a, b) {
              return a.ranking - b.ranking
            })

            newArr = arr.reverse();

            console.log(newArr)
            let place = 0;

            for (let element in helaDatabasen) {

              for (let i = 0; i < newArr.length; i++) {

                if (newArr[i].nickname === helaDatabasen[element].profile.nickname) {

                  console.log(i + 1)
                  place = i + 1

                }
              }

            }

            function hej(){
              self.setState({
                  nickname: self.state.nickname,
                  profile: {
                    nickname: self.state.nickname,
                    photo: self.props.profile.photo,
                    correctAnswers: databaseCorrect + correct,
                    failedAnswers: databaseWrong + wrong,
                    uid: self.props.profile.uid,
                    ranking: rank.toFixed(2),
                    place: place,
                  }
              })


            }

              if(val === "finnsInte"){
                let plus = correct + wrong;
                rank = (correct / plus) * 100;
                console.log(self.state.nickname)
                firebase.database().ref('users/' + self.props.firebaseKey).set({
                  nickname: self.state.nickname,
                  profile: {
                    nickname: self.state.nickname,
                    photo: self.props.profile.photo,
                    correctAnswers: databaseCorrect + correct,
                    failedAnswers: databaseWrong + wrong,
                    uid: self.props.profile.uid,
                    ranking: rank.toFixed(2),
                    place: place,
                  }

                },hej());

              }else{
                let totalCorrect = databaseCorrect + correct;
                let totalFail = databaseWrong + wrong;
                let plus = totalCorrect + totalFail;
                rank = (totalCorrect / plus) * 100
                console.log(self.state)
                console.log(self.props)
                firebase.database().ref('users/' + self.props.firebaseKey).set({
                  nickname: self.state.nickname,
                  profile: {
                    nickname: self.state.nickname,
                    photo: self.props.profile.photo,
                    correctAnswers: databaseCorrect + correct,
                    failedAnswers: databaseWrong + wrong,
                    uid: self.props.profile.uid,
                    ranking: rank.toFixed(2),
                    place: place,
                  }

                },hej());
              }
          })

        }

        if (databaseCorrect === 0 && databaseWrong === 0) {

          console.log("användare finns inte")

          loopFunc("finnsInte")


        } else {

          console.log("användare finns")

          loopFunc()

          // let plus = databaseCorrect + databaseWrong;
          // rank = (databaseCorrect / plus) * 100
        }

      })

      console.log("correctAnswers:  " + correct)
      console.log("failedAnswers:  " + wrong)
      console.log(this.state.totalAnswers)
      this.setState({totalCorrectAnswers: correct, totalFailedAnswers: wrong, totalAnswers: []})

    }

  }

  clickedButton(val, correctAnswer) {

    switch (val) {

      case "a":

        this.setState({backgroundA: "bgColor", backgroundB: "", backgroundC: "", backgroundD: "", lastVal: "a"})
        break;
      case "b":

        this.setState({backgroundA: "", backgroundB: "bgColor", backgroundC: "", backgroundD: "", lastVal: "b"})
        break;
      case "c":

        this.setState({backgroundA: "", backgroundB: "", backgroundC: "bgColor", backgroundD: "", lastVal: "c"})
        break;
      case "d":

        this.setState({backgroundA: "", backgroundB: "", backgroundC: "", backgroundD: "bgColor", lastVal: "d"})
        break;

      default:
    }

    if (this.state.backgroundA !== "" || this.state.backgroundB !== "" || this.state.backgroundC !== "" || this.state.backgroundD !== "") {
      if (val === "next") {
        console.log(this.state.lastVal)
        if (this.state.lastVal === correctAnswer) {
          this.state.totalAnswers.push(true)
        } else {
          this.state.totalAnswers.push(false)

        }
        console.log(correctAnswer)
        this.setState({
          currentQuestion: this.state.currentQuestion + 1,
          backgroundA: "",
          backgroundB: "",
          backgroundC: "",
          backgroundD: ""
        })

      }
    }
  }
  writeQuestion = () => {
    console.log("enter")
    console.log(this.state.writeQuestion)
    this.setState({writeQuestion: false})
    console.log(this.state.writeQuestion)
  }


  backToProfile = () => {
      this.setState({backToProfile: false})

  }
  render() {
    let sportQuestions = [];

    console.log(this.state.tenQuestions[this.state.currentQuestion])
    if (!this.state.backToProfile) {
      console.log("PROFILEN")
      console.log(this.props.profile.nickname)
      return (<div>
        <ProfileComponent firebaseKey={this.props.firebaseKey} profile={this.state.profile} nickname={this.state.nickname} />
      </div>)
    }

    if (!this.state.writeQuestion) {
      console.log("hejsan")
      return (<div>
        <AddQuestions/>
      </div>)
    }

    return (<div className="sportQuestion">
      Lets see how much you know about sport!
      <button className="btnGetQuestions" onClick={this.getQuestions}>
        Get Sport Questions!
      </button>
      <br/>
      <button onClick={this.writeQuestion}>Click to write your own sport questions!</button>
      <button onClick={this.backToProfile}>Go back to your profile</button>
      <div>
        {
          //Check if message failed
          (this.state.tenQuestions[this.state.currentQuestion] !== undefined)
            ? <div className="question">

                <h2>{this.state.tenQuestions[this.state.currentQuestion].Question}</h2>
                <ul>

                  <div className="Row">
                    <li id={this.state.backgroundA} onClick={e => this.clickedButton('a', this.state.tenQuestions[this.state.currentQuestion].correctAnswer)}>{this.state.tenQuestions[this.state.currentQuestion].answers.a}</li>
                    <li id={this.state.backgroundB} onClick={e => this.clickedButton('b', this.state.tenQuestions[this.state.currentQuestion].correctAnswer)}>{this.state.tenQuestions[this.state.currentQuestion].answers.b}</li>

                  </div>
                  <div className="Row">
                    <li id={this.state.backgroundC} onClick={e => this.clickedButton('c', this.state.tenQuestions[this.state.currentQuestion].correctAnswer)}>{this.state.tenQuestions[this.state.currentQuestion].answers.c}</li>
                    <li id={this.state.backgroundD} onClick={e => this.clickedButton('d', this.state.tenQuestions[this.state.currentQuestion].correctAnswer)}>{this.state.tenQuestions[this.state.currentQuestion].answers.d}</li>
                  </div>
                </ul>

                <button onClick={e => this.clickedButton("next", this.state.tenQuestions[this.state.currentQuestion].correctAnswer)}>
                  Next question</button>
                <br/>
                <div>Currently On Question: {this.state.currentQuestion + 1}/10</div>
              </div>
            : <h2></h2>
        }
        {
          (this.state.currentQuestion === 10)
            ? <div>
                <h2>You got {this.state.totalCorrectAnswers}
                  correct answers. And {this.state.totalFailedAnswers}
                  wronged ones.</h2>
                <h2>Everything will be updated at your profile</h2>
                <button onClick={this.backToProfile}>Go back to your profile</button>
              </div>
            : <div></div>

        }

      </div>

    </div>)
  }

}

export default SportQuestions;
