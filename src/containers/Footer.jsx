import React from 'react'
import AsyncLanguage from '../components/AsyncLanguage'
import Button from '../components/Button'
import {log} from '../utils'
import '../style/qr.scss'
import '../style/footer.scss'
import imgs from '../img/footer'


const IconQr = (props) => {
  const {text, img, qr, key} = props
  return (
    <div className="qr qrContainer footerIcon" key={key}>
      <img src={img} alt=""/>
      <div className="qr qrContent">
        <img className="qrImg" src={qr} alt={text}/>
        {text}
      </div>
    </div>
  )
}

const IconA = (props) => {
  const {href, img, key} = props
  return (
    <div className="footerIcon" key={key}>
      <a href={href} target="_blank">
        <img src={img} alt=""/>
      </a>
    </div>
  )
}


class Footer extends React.Component {
  constructor(props) {
    super()
    this.iconTable = {
      [undefined]: IconA,
      ['qr']: IconQr,
    }
  }

  render() {
    log(props)
    const {props} = this
    const {content} = props
    const {buttonLabel, footerInfo, buttonTo, iconLinks} = content
    const {iconWechat, iconTelegram, qrContact, qrGroup} = imgs
    const imgList = [iconTelegram, iconWechat, iconWechat]
    const qrList = [null, qrContact, qrGroup]
    return (
      <div id="id-home-footer" className="footer">
        <div className="footerContainer container">
          <Button className="footerContact" to={buttonTo} label={buttonLabel}/>
          <div className="footerIconsOuter">
            <div className="footerIcons">
              {iconLinks.map((params, i) => {
                const {type} = params
                params = {
                  ...params,
                  img: imgList[i],
                  qr: qrList[i],
                  key: i,
                }
                return this.iconTable[type](params)
              })}
            </div>
          </div>
          <div className="footerBottom">
            <div className="footerInfo textSmall">{footerInfo}</div>
          </div>
        </div>
      </div>
    )
  }

}


export default (props) => <AsyncLanguage {...props} Main={Footer} contentFile="footer"/>
