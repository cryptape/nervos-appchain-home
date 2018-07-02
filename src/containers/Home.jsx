import React from 'react'
import AsyncLanguage from '../components/AsyncLanguage'
import Button from '../components/Button'
import Footer from '../containers/Footer'
import Headerbar from '../components/Headerbar'
import ImgSelf from '../components/Img'
import {log} from '../utils'
import '../style/home.scss'
import imgs from '../img/home'

const headerActiveImgs = (actives, statics, index) => {
  return statics.map((staticSrc, i) => {
    // let src = index === i ? actives[i] : staticSrc
    // let cls = `headerActiveImgCell i${i}`
    // if (i === index) {
    //   cls += ' active'
    // }
    // const e = new Image()
    // e.src = actives[i]
    // return <ImgSelf src1={staticSrc} src2={src} alt="" key={src + i} className={`headerActiveImgCell i${i}`}/>
    return <img src={staticSrc} alt="" key={staticSrc + i} className={`headerActiveImgCell i${i}`}/>
  })
}

const headerActiveTexts = (texts, index) => {
  return texts.map((text, i) => {
    let cls = `headerActiveText i${i}`
    if (i === index) {
      cls += ' active'
    }
    return (
      <span key={text + i} className={cls}>
        {text}
      </span>
    )
  })
}

const headerActiveTrigger = (number, index, setActive) => {
  const list = []
  for (let i = 0; i < number; i++) {
    const enter = (event) => {
      setActive(i)
    }
    const leave = (event) => {
      setActive(null)
    }
    list.push(
      <div className={`headerActiveTrigger i${i}`} key={'text' + i} onMouseEnter={enter} onMouseLeave={leave}/>,
    )
  }
  return list
}

class HeaderActiveImg extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: null,
    }
    // const {
    //   headerImg1,
    //   headerImg2,
    //   headerImg3,
    //   headerImg4,
    //   // headerActive1,
    //   // headerActive2,
    //   // headerActive3,
    //   // headerActive4,
    // } = imgs
    // this.staticImgs = [
    //   headerImg1,
    //   headerImg2,
    //   headerImg3,
    //   headerImg4,
    // ]
    // this.activeImgs = [
    //   // headerActive1,
    //   // headerActive2,
    //   // headerActive3,
    //   // headerActive4,
    // ]
    // this.activeTexts = props.content
    // this.activeNumber = this.activeTexts.length
  }

  setActive = (activeIndex) => {
    this.setState({
      activeIndex,
    })
  }

  render() {
    const {activeImgs, staticImgs, activeNumber, activeTexts, setActive} = this
    const {activeIndex} = this.state
    return (
      <div className="headerActiveImg">
        {/*<div>{activeIndex}</div>*/}
        <img src={imgs.headerImg} alt=""/>
        {/*{headerActiveImgs(activeImgs, staticImgs, activeIndex,)}*/}
        {/*{headerActiveTexts(activeTexts, activeIndex,)}*/}
        {/*{headerActiveTrigger(activeNumber, activeIndex, setActive)}*/}
      </div>
    )
  }
}

const Header = (props) => {
  const {content} = props
  const {slogan, buttonLabel, activeImgText, href} = content.header
  return (
    <div id="id-home-header" className="header">
      {/*<Test {...props} />*/}
      <div className="headerContainer container">
        <img className="headerLogo" src={imgs.logo} alt=""/>

        <HeaderActiveImg content={activeImgText}/>

        <div className="headerSlogan textBig">{slogan}</div>

        <a href={href}>
          <Button label={buttonLabel} className=""/>
        </a>
      </div>
      <div className="headerBottom">
        <img className="headerBottomImg" src={imgs.headerBack} alt=""/>
      </div>
    </div>
  )
}

const BigTitle = (props) => {
  const {name} = props
  const {title} = props.content
  return <div className={`${name}BigTitle bigTitle titleBig`}>{title}</div>
}

const createBlockTemplate = (name, Body) => (props) => {
  const params = {
    ...props,
    name: name,
    content: props.content[name],
  }
  return (
    <div id={`id-home-${name}`} className={name}>
      <div className={`${name}Container container`}>
        <BigTitle {...params} />
        <Body {...params} />
      </div>
    </div>
  )
}

const ProducButton = (props) => {
  const {text, href} = props
  return (
    <a className="productionsButton text" href={href}>
      {text}
    </a>
  )
}

const Production = (props) => {
  const {title, text, buttons} = props
  return (
    <div className="productionsProduction">
      <div className="productionsTitle title">{title}</div>
      <div className="productionsText text">{text}</div>
      <div className="productionsButtonContainer">
        {buttons.map((params, i) => <ProducButton {...params} key={i}/>)}
      </div>
    </div>
  )
}

const ProductionsBody = (props) => {
  const {body} = props.content
  return <div className="productionsBody">{body.map((params, i) => <Production {...params} key={i}/>)}</div>
}

const Productions = (props) => {
  const name = 'productions'
  const Elem = createBlockTemplate(name, ProductionsBody)
  return <Elem {...props} />
}

const Feature = (props) => {
  const {img, title, text, comment, direction, img2} = props
  return (
    <div className={`featuresFeature ${direction}`}>
      <div className="featuresImg">
        {/*<ImgSelf src1={img} src2={img2} alt=""/>*/}
        <img src={img} alt=""/>
      </div>
      <div className="featuresContent">
        <div className="featuresTitle title">{title}</div>
        <div className="featuresText text">
          {
            text.map((s, i) => {
              return <div>{s}</div>
            })
          }
          {comment ? <div className="comment">{comment}</div> : null}
        </div>
      </div>
    </div>
  )
}

const FeaturesBody = (props) => {
  const {body} = props.content
  const {
    feature1,
    feature2,
    feature3,
    feature4,
    featureActive1,
    featureActive2,
    featureActive3,
    featureActive4,
  } = imgs
  const featureImg = [feature1, feature2, feature3, feature4]
  const activeImg = [featureActive1, featureActive2, featureActive3, featureActive4]
  return (
    <div className="featuresBody">
      {body.map((params, i) => {
        if (i % 2 === 1) {
          params.direction = 'left'
        } else {
          params.direction = 'right'
        }
        params.img = featureImg[i]
        params.img2 = activeImg[i]
        return <Feature {...params} key={i}/>
      })}
    </div>
  )
}

const Features = (props) => {
  const name = 'features'
  const Elem = createBlockTemplate(name, FeaturesBody)
  return <Elem {...props} />
}

const Case = (props) => {
  const {img, title, text, href} = props
  return (
    <div className="casesOuter">
      <div className="casesCase">
        <a className="casesLink" target="_blank" href={href}>
          <div className="casesImg">
            <img className="" src={img} alt=""/>
          </div>
          <div className="casesTitle title">{title}</div>
        </a>
        <div className="casesText text">{text}</div>

      </div>
    </div>
  )
}
const CasesBody = (props) => {
  const {body} = props.content
  const {case1, case2, case3} = imgs
  const imglist = [case1, case2, case3]
  return (
    <div className="casesBody">
      {body.map((params, i) => {
        params.img = imglist[i]
        return <Case {...params} key={i}/>
      })}
    </div>
  )
}

const Cases = (props) => {
  const name = 'cases'
  const Elem = createBlockTemplate(name, CasesBody)
  return <Elem {...props} />
}

// const Footer = (props) => {
//   const {content} = props
//   const {buttonLabel, footerInfo, buttonTo, iconLinks} = content.footer
//   log(iconLinks, content.footer)
//   const {iconWechat, iconTelegram} = imgs
//   const imgList = [iconTelegram, iconWechat, iconWechat]
//   return (
//     <div id="id-home-footer" className="footer">
//       <div className="footerContainer container">
//         <Button className="footerContact" to={buttonTo} label={buttonLabel}/>
//         <div className="footerIconsOuter">
//           <div className="footerIcons">
//             {iconLinks.map((params, i) => {
//               const {href} = params
//               const img = imgList[i]
//               if (href) {
//
//                 return (
//                   <div className="footerIcon" key={i}>
//                     <a href={params.href} target="_blank">
//                       <img src={img} alt=""/>
//                     </a>
//                   </div>
//                 )
//               } else {
//                 return (
//                   <div className="footerIcon" key={i}>
//                     <a href={href} target="_blank">
//                       <img src={img} alt=""/>
//                     </a>
//                   </div>
//                 )
//               }
//
//             })}
//           </div>
//         </div>
//         <div className="footerBottom">
//           <div className="footerInfo textSmall">{footerInfo}</div>
//         </div>
//       </div>
//     </div>
//   )
// }

const Main = (props) => {
  // log('home props:', props)
  return (
    <div className="main" id="id-home">
      <div className="coverFooter">
        <Header {...props} />
        <Productions {...props} />
        <div className="backgroundBottom">
          <Features {...props} />
          <Cases {...props} />
        </div>
      </div>
      <Footer {...props} />
    </div>
  )
}

export default (props) => <AsyncLanguage {...props} Main={Main} contentFile="home"/>
