import React, {
    Component
} from 'react';
import firebase from './firebase.js';



class SportQuestions extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: true
        }
    }

    sendQuestion = () => {
        this.setState({
            clicked: false
        })

        const questionRef = firebase.database().ref('questions/genre/History/');

        let theQuestions = [{
                Question1: "What year did the Titanic sink?",
                answers: {
                    a: "1909",
                    b: "1912",
                    c: "1913",
                    d: "1911"
                },
                correctAnswer: "b"
          }
    ]

        questionRef.once("value", function (snapshot) {
            questionRef.push(theQuestions)
        });
    }

    getQuestions = () => {
        this.setState({
            clicked: false
        })


        var ref = firebase.database().ref();
        ref.on("value", function (snapshot) {
            console.log(snapshot.val().questions.genre);

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
