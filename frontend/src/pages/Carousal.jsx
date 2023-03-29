import { Flex } from '@chakra-ui/react'
import React from 'react'

const Slider2 = () => {
    const[sImage, setImage]= React.useState(0)
    const[s5Image, set5Image]= React.useState(0)

    const[PImage, setPImage]= React.useState(["https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-26Hrs-P2-Fig-Min50.jpg","https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-26Hrs-P3-LevisUSPA-Min50.jpg","https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-26Hrs-P1-AldoPedro-Min40.jpg"])
    const[rImage, setrImage]= React.useState(["https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-TopBanner-P2-DealsLikeNeverBefore-USPAFortCollins-6080.jpg", "https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-TopBanner-P4-BestOfTrends-AvaasaDNMX-Under499.jpg", "https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-TopBanner-P1-BestsellingFootwear-PumaAdidas-3050.jpg", "https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-TopBanner-P3-PremiumWatches-FossilFastrack-Upto50.jpg","https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-TopBanner-P4-BestOfTrends-AvaasaDNMX-Under499.jpg"])
    const[kImage, setkImage]= React.useState(["https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-DailyBanner-P4-UpgradeYourFootwearCollection-FilaCampus-4560.jpg", "https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-DailyBanner-P1-SmartShirtstshirts-IvocMissChase-Min55Extra30.jpg", "https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-DailyBanner-P5-BedsheetsCushionsPillows-QuraKlotthe-Upto90.jpg", "https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-DailyBanner-P2-TrendsCollection-AvaasaNetplay-Under599.jpg", "https://assets.ajio.com/cms/AJIO/WEB/20012023-UHP-D-DailyBanner-P6-Sale-AzorteAltheoryOutryt-Flat50.jpg"])

    React.useEffect(() => {
        setInterval(() => {
            setImage(sImage => sImage < 2 ? sImage + 1 : 0)
            set5Image(s5Image => s5Image < 4 ? s5Image + 1 : 0)
            
         },2000)

    },[])
  return (
    <div>
        <div>
            <img src="https://assets.ajio.com/cms/AJIO/WEB/Earlybird-Strip-D-1440x128%20(1).gif" alt="watchlogo" />
        </div>
        <div> <img src="https://assets.ajio.com/cms/AJIO/WEB/D-HeroDeals-SectionHeaderStripkjkf.gif" alt="ok" /> </div>
        <div>
            
        </div>
        <div>
            <img src={PImage[sImage]} alt="logo1" />
        </div>
        <div> <img src="https://assets.ajio.com/cms/AJIO/WEB/UHP-D-Fashionation-Coupon-header.gif" alt="replic" /> </div>
        <div style={{display:"flex"  }}>
        <div><img src="https://assets.ajio.com/cms/AJIO/WEB/D-Extra30-480x6001.gif" alt="k" /></div>
        <div> <img src="https://assets.ajio.com/cms/AJIO/WEB/D-FootwearFiesta-480x6001.gif" alt="k" /></div>
        <div> <img src="https://assets.ajio.com/cms/AJIO/WEB/D-1950-480x6001.gif" alt="k" /></div>
        </div>
        <div><img src="https://assets.ajio.com/cms/AJIO/WEB/D-TopBanner-SectionHeaderStrip.gif" alt="p" /></div>
        <div> <img src={rImage[s5Image]} alt="logo2" /> </div>
        <div> <img src="https://assets.ajio.com/cms/AJIO/WEB/D-DailyBanner-SectionHeaderStrip.gif" alt="kj" /></div>
        <div> <img src={kImage[s5Image]} alt="logo_5" /> </div>
        <div> <img src="https://assets.ajio.com/cms/AJIO/WEB/060123-D-UHP-gamesonze-header.jpg" alt="ok" /> </div>
        <div> <img src="https://assets.ajio.com/cms/AJIO/WEB/060123-D-UHP-rewards-header.jpg" alt="pp" /></div>
        <div style={{display:"flex"  }}> 
        <div> <img src="https://assets.ajio.com/cms/AJIO/WEB/060123-D-UHP-rewards-shopearn5cashback.jpg" alt="dhs" />      </div>
        <div> <img src="https://assets.ajio.com/cms/AJIO/WEB/060123-D-UHP-rewards-relianceone.jpg" alt="faa" /></div>
        <div> <img src="https://assets.ajio.com/cms/AJIO/WEB/060123-D-UHP-rewards-referearn1500.jpg" alt="dds" /></div> </div>
        <div><img src="https://assets.ajio.com/cms/AJIO/WEB/060123-D-UHP-sponsorbrands-header.jpg" alt="ls" /></div>
    </div>
  )
}

export default Slider2