import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import AsyncLanguage from '../components/AsyncLanguage'
import Button from '../components/Button'
import { log } from '../utils'
import imgs from '../img/contactUs'
import '../style/contactUs.scss'
import api from '../config/apiTable'

const sendQuestion = (questionData, props) => () => {
  axios
  .post(api.answers, {
    content: questionData,
  })
  .then((res) => {
      props.sendedAlert()
    })
}

const createQuestion = () => (props) => {}

class Question extends Component {
  constructor() {
    super()
    // this.state = {
    //   answered: false,
    // }
    this.block = React.createRef()
  }

  // hasAnswered = () => {
  //   const {answered} = this.state
  //   if (!answered) {
  //     this.setState({answered: true})
  //   }
  // }

  render() {
    const { props, block, hasAnswered } = this
    const {
      answeredQuestion,
      question,
      children,
      totalQuestion,
      questionIndex,
      changeState,
      change: superChange,
      setMoveNumber,
      moveNumber,
    } = props
    const moveCenter = (event) => {
      const e = block.current
      // log(answeredQuestion, questionIndex)
      // if (answeredQuestion >= questionIndex + 1) {

      // }
      changeState({
        questionsX: e.offsetLeft,
        questionsY: e.offsetTop,
      })
      setMoveNumber(questionIndex + 1)
      event.stopPropagation()
      // log('move center')
    }
    const moveNextCenter = (event) => {
      const e = block.current.nextSibling
      // log('move next')
      changeState({
        questionsX: e.offsetLeft,
        questionsY: e.offsetTop,
      })
      setMoveNumber(questionIndex + 2)
      event.stopPropagation()
      // log('move next')
    }
    const change = (...args) => {
      superChange(...args)
      // hasAnswered()
    }
    const params = {
      ...props,
      block,
      // answered,
      // hasAnswered,
      moveNextCenter,
      change,
    }
    const cls = 'questionsQuestion  border '
    const classActive = moveNumber === questionIndex + 1 ? cls + 'active' : cls
    return (
      <div className={classActive} ref={this.block} onClick={moveCenter}>
        <div>
          <div className="questionsIndex text">{`0${questionIndex + 1} / 0${totalQuestion}`}</div>
          <div className="questionsQue title">{question}</div>
        </div>
        {children(params)}
      </div>
    )
  }
}

// class Selection extends Component {
//   constructor() {
//     super()
//     this.cell = React.createRef()
//   }

//   render() {
//     const {props} = this
//     const {img, text, index, questionIndex, state, changeFrameLeft, onClick} = props
//     const cls = 'selection'
//     const answer = state.questionsAnswer[questionIndex]
//     const beSelected = answer === text
//     const className = beSelected ? cls + ' active' : cls
//     const enter = (event) => {
//       changeFrameLeft(this.cell.current.offsetLeft)
//     }
//     const touch = (event) => {
//       // log('touch')
//       onClick(event)
//       // enter(event)
//       event.stopPropagation()
//     }
//     const click = (event) => {
//       // log('click')
//       onClick(event)
//     }
//     const Selected = beSelected ? (
//       <img className="selectionSelected" src={imgs.selected} alt=""/>
//     ) : null
//     return (
//       <div className={className} onClick={click} onMouseEnter={enter} onTouchStart={touch} ref={this.cell}>
//         <img className="selectionImg" src={img} alt=""/>
//         <div className="selectionText textSmall">{text}</div>
//         {Selected}
//       </div>
//     )
//   }
// }

// class Selections extends Component {
//   constructor() {
//     super()
//     this.state = {
//       frameLeft: 0,
//     }
//   }

//   changeFrameLeft = (frameLeft) => {
//     this.setState({
//       frameLeft,
//     })
//   }

//   render() {
//     const {props, changeFrameLeft} = this
//     const {selections, imgs, state, questionIndex, changeState, moveNextCenter, toAnswer, hasAnswered} = props

//     const select = (value) => (event) => {
//       const questionsAnswer = state.questionsAnswer
//       if (questionsAnswer[questionIndex] !== value) {
//         questionsAnswer[questionIndex] = value
//         changeState({
//           questionsAnswer,
//         })
//         toAnswer(value)
//       }
//       // hasAnswered()
//       moveNextCenter(event)
//       log('select')
//     }
//     return (
//       <div className="selections">
//         <div className="selectionsContainer">
//           {selections.map((selec, i) => <Selection {...props} changeFrameLeft={changeFrameLeft}
//                                                    onClick={select(selec)} text={selec}
//                                                    img={imgs[i]} key={i}
//                                                    index={i}/>)}
//           <div className="selectFrame" style={{
//             left: this.state.frameLeft,
//           }}/>
//         </div>
//       </div>
//     )
//   }
// }
class Selections extends Component {
  render() {
    const { props, changeFrameLeft } = this
    const { selections, imgs, state, questionIndex, changeState, moveNextCenter, toAnswer, hasAnswered } = props

    const select = (value) => (event) => {
      const questionsAnswer = state.questionsAnswer
      if (questionsAnswer[questionIndex] !== value) {
        questionsAnswer[questionIndex] = value
        changeState({
          questionsAnswer,
        })
        toAnswer(value)
      }
      // hasAnswered()
      moveNextCenter(event)
      // log('select')
    }
    // log(selections)
    return (
      <div className="selections">
        <div className="selectionsContainer">
          {selections.map((selec, i) => (
            <div>
              <input type="checkbox" onChange={select} />
              <div>{selec}</div>
            </div>
            // <Selection
            //   {...props}
            //   changeFrameLeft={changeFrameLeft}
            //   onClick={select(selec)}
            //   text={selec}
            //   img={imgs[i]}
            //   key={i}
            //   index={i}
            // />
          ))}
        </div>
      </div>
    )
  }
}

const QuesInput = (props) => {
  const { placeholder, change } = props
  return <input placeholder={placeholder} className="questionsInput text" onChange={change} />
}

const QuesTextarea = (props) => {
  const { placeholder, change } = props
  return (
    <div className="questionsTextareaContainer">
      <textarea className="questionsTextarea text" onChange={change} rows={10} />
    </div>
  )
}

const QuesButton = (props) => {
  const { buttonLabel, moveNextCenter, answeredQuestion, questionIndex } = props
  const click = (event) => {
    // log(answeredQuestion, questionIndex)
    if (answeredQuestion > questionIndex + 1) {
      moveNextCenter(event)
    }
  }
  return (
    <div className="questionsButton">
      <Button label={buttonLabel} onClick={click} />
    </div>
  )
}

const QuesSend = (props) => {
  const { buttonLabel, questionData, to } = props
  return (
    <div key="button" className="questionsComplete">
      <Button label={buttonLabel} onClick={sendQuestion(questionData, props)} />
    </div>
  )
}

const questionElements1 = (props) => {
  return [
    <div className="quesGrow">
      <QuesInput {...props} key="input" />
    </div>,
    <QuesButton {...props} key="button" />,
  ]
}

const questionElements2 = (props) => {
  return [
    <div className="quesGrow">
      <QuesInput {...props} key="input" />
    </div>,
    <QuesButton {...props} key="button" />,
  ]
}

const questionElements3 = (props) => {
  const { selectionImg1, selectionImg2, selectionImg3 } = imgs
  const imgList = [selectionImg1, selectionImg2, selectionImg3]
  return [
    <div className="quesGrow">
      <Selections {...props} imgs={imgList} key="selections" />
    </div>,
  ]
}

const questionElements4 = (props) => {
  // log(props.buttonLabel)
  return [
    <QuesTextarea {...props} key="textarea" />,
    <div className="quesGrow">
      <QuesButton {...props} key="button" />
    </div>,
  ]
}

const questionElements5 = (props) => {
  return [
    <div className="quesGrow">
      <QuesInput {...props} key="input" />
    </div>,
    <QuesSend {...props} key="button" />,
  ]
}

const SendedAlert = () => {
  return (
    <div className="sendedalert">
      <div className="alertboard">
        <div className="alertmessage">已收到您的回复, 将有同事向您反馈</div>
        <Button label={'确认并返回首页'} className="alertbutton" to="/" />
      </div>
    </div>
  )
}

class Questions extends Component {
  constructor(props) {
    super(props)
    this.state = {
      questionsX: 0,
      questionsY: 0,
      totalQuestion: 0,
      answeredQuestion: 0,
      questionsAnswer: [],
      sended: false,
    }
    this.questionDiv = []
    this.questionData = []
    this.questionElementList = [
      questionElements1,
      questionElements2,
      // questionElements3,
      questionElements4,
      questionElements5,
    ]
  }

  answerQuestion = (index, question) => {
    const { questionData } = this
    const { answeredQuestion } = this.state
    let data = questionData[index]
    if (data === undefined) {
      data = {
        q: question,
      }
      questionData[index] = data
    }
    const answer = (answer) => {
      questionData[index].a = answer
      if (answeredQuestion < index + 2) {
        this.setState({ answeredQuestion: index + 2 })
      }
    }
    return answer
  }

  changeState = (params) => {
    this.setState(params)
  }

  render() {
    const {
      state,
      props,
      changeState,
      questionDiv,
      questionElementList,
      moveQuestionsRight,
      questionData,
      answerQuestion,
    } = this
    const { moveNumber, setQuestionsNumber, totalQuestion, setMoveNumber } = props
    const { questionsX, questionsY, answeredQuestion } = state
    const { questions } = props.content
    const total = questions.length
    if (total !== totalQuestion) {
      setQuestionsNumber(total)
    }

    const QuestionsElems = questions.map((info, i) => {
      const { question } = info
      const toAnswer = answerQuestion(i, question)
      const children = questionElementList[i]
      // log(children)

      const change = (event) => {
        const target = event.target
        const value = target.value
        toAnswer(value)
      }

      const params = {
        ...props,
        ...info,
        state,
        change,
        toAnswer,
        children,
        totalQuestion: total,
        questionIndex: i,
        questionDiv,
        questionData,
        changeState,
        answeredQuestion,
      }
      return <Question {...params} key={question} />
    })

    return (
      <div className="questions">
        <form
          className="questionsContainer"
          style={{
            transform: `translate(-${questionsX}px, -${questionsY}px)`,
          }}
        >
          {QuestionsElems}
        </form>
        {/*<div className="questionsMoveLeft" onClick={moveQuestionsRight}/>*/}
        {/*<div className="questionsCoverRight"/>*/}
      </div>
    )
  }
}

const Imgs = (props) => {
  const { totalQuestion, moveNumber } = props
  const { cube, cubeDone } = imgs
  const ImgList = () => {
    let list = []
    for (let i = 0; i < totalQuestion; i++) {
      let Img
      if (i < moveNumber) {
        Img = <img src={cubeDone} alt="" key={i} />
      } else {
        Img = <img src={cube} alt="" key={i} />
      }
      list.push(Img)
    }
    return list
  }
  return (
    <div className="imgs">
      <div className="imgsContainer">{ImgList()}</div>
    </div>
  )
}

class Main extends Component {
  constructor() {
    super()
    this.state = {
      moveNumber: 1,
      totalQuestion: 5,
      sended: false,
    }
  }

  setMoveNumber = (n) => {
    this.setState({ moveNumber: n })
  }

  setQuestionsNumber = (n) => {
    this.setState({ totalQuestion: n })
  }

  changeState = (props) => {
    this.setState(props)
  }

  sendedAlert = () => {
    this.setState({
      sended: true,
    })
  }

  render() {
    const { moveNumber, totalQuestion } = this.state
    const { props, setMoveNumber, setQuestionsNumber, sendedAlert } = this
    const params = {
      ...props,
      moveNumber,
      totalQuestion,
      setMoveNumber,
      setQuestionsNumber,
      sendedAlert,
    }
    return (
      <div className="main" id="id-contactUs">
        <div className="container">
          <Questions {...params} />
          <Imgs {...params} />
        </div>
        {this.state.sended ? SendedAlert() : null}
      </div>
    )
  }
}

export default (props) => <AsyncLanguage {...props} Main={Main} contentFile="contactUs" />
