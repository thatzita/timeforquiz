import React, {
    Component
} from 'react';
import firebase from './firebase.js';



class SportQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: true,
            sportQuestions: [],
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


        var ref = firebase.database().ref("questions/genre/sport/");
        ref.once("value", function (snapshot) {
          let obj = snapshot.val()
          for(let element in obj){

            console.log(obj[element])
            

          }
            console.log(snapshot.key)

            // console.log(snapshot.val().questions.genre);

        }, function (error) {
            console.log("Error: " + error.code);
        });


    }


    render() {
        let sportQuestions = [];






        return (

            <
            div className = "sportQuestion" > Lets see how much you know about sport!
            <
            button className = "btnQuestionSport"
            onClick = {
                this.sendQuestion
            } > Send question! < /button> <
            br / > < button className = "btnGetQuestions"
            onClick = {
                this.getQuestions
            } > Get Sport Questions! < /button> <
            div className = "sportDiv" > list goes here < /div>


            <
            /div>
        )
    }


}








export default SportQuestions;
