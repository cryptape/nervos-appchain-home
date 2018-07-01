

const Selection = (props) => {
  const {img, text, index, questionIndex, state, onClick} = props
  const cls = 'selection'
  const answer = state.questionsAnswer[questionIndex]
  const beSelected = answer === text
  const className = beSelected ? cls + ' active' : cls
  return (
    <div className={className} onClick={onClick}>
      <img className="selectionImg" src={img} alt=""/>
      <div className="selectionText">{text}</div>
    </div>
  )
}

const Selections = (props) => {
  const {selections, imgs, state, questionIndex, changeState, moveQuestionsLeft} = props

  const select = (value) => {
    const questionsAnswer = state.questionsAnswer
    questionsAnswer[questionIndex] = value
    changeState({
      questionsAnswer,
    })
    moveQuestionsLeft()
  }
  return (
    <div className="selections">
      <div className="selectionsContainer">
        {selections.map((selec, i) => <Selection {...props} onClick={() => select(selec)} text={selec} img={imgs[i]} key={i} index={i}/>)}
        <div className="selectFrame"/>
      </div>
    </div>
  )
}