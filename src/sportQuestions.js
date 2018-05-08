import React, {
    Component
} from 'react';
import firebase from './firebase.js';



class SportQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: true,
            tenQuestions:[],
        }
    }

    sendQuestion = () => {
        this.setState({
            clicked: false
        })

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


        questionRef.once("value", function (snapshot) {
            questionRef.push(theQuestions)
        });
    }

    getQuestions = () => {
        this.setState({
            clicked: false
        })

        let sportQuestions = [];
        let ten = [];
        let self = this;
        var ref = firebase.database().ref("questions/genre/sport/");
        ref.once("value", function (snapshot) {
          let obj = snapshot.val()
          for(let element in obj){

            sportQuestions.push(obj[element])
          }


          shuffleArray(sportQuestions)
          function shuffleArray(sportQuestions) {

              for (let i = sportQuestions.length - 1; i > 0; i--) {
                  let j = Math.floor(Math.random() * (i + 1));
                  [sportQuestions[i], sportQuestions[j]] = [sportQuestions[j], sportQuestions[i]];
              }
          }

          for(let y=0;y<10;y++){
            ten.push(sportQuestions[y])
          }


            // console.log(snapshot.val().questions.genre);


            putState(ten)

        }, function (error) {
            console.log("Error: " + error.code);
        });

        function putState(ten){
          self.setState({
           tenQuestions: ten
          })

          console.log(self.state.tenQuestions)
        }

    }


    componentDidUpdate(){

      if(this.state.tenQuestions.length !== 0){
        console.log(this.state.tenQuestions[0].Question)
      }
    }
    render() {
        let sportQuestions = [];


        return (

            <div className = "sportQuestion" > Lets see how much you know about sport!
            <button className = "btnQuestionSport" onClick = {this.sendQuestion} > Send question!< /button> <br / >

            <button className = "btnGetQuestions" onClick = {this.getQuestions} > Get Sport Questions! </button>
            <div className = "sportDiv" > list goes here </div>

              <div>
                { //Check if message failed
                  (this.state.tenQuestions[0] !== undefined)
                  ? <div className="question">

                      <h2>{this.state.tenQuestions[0].Question}</h2>
                      <ul>

                        <div className="Row">
                          <li>{this.state.tenQuestions[0].answers.a}</li>
                          <li>{this.state.tenQuestions[0].answers.b}</li>
                        </div>
                        <div className="Row">
                          <li>{this.state.tenQuestions[0].answers.c}</li>
                          <li>{this.state.tenQuestions[0].answers.d}</li>
                        </div>
                      </ul>


                    </div>
                  : <h2>Loading</h2>
                }

              </div>

            </div>
        )
    }


}








export default SportQuestions;
