import { Flex } from '@chakra-ui/react'
import React from 'react'

const Slider2 = () => {
    const[sImage, setImage]= React.useState(0)
    const[s5Image, set5Image]= React.useState(0)

  

    // React.useEffect(() => {
    //     setInterval(() => {
    //         setImage(sImage => sImage < 2 ? sImage + 1 : 0)
    //         set5Image(s5Image => s5Image < 4 ? s5Image + 1 : 0)
            
    //      },2000)

    // },[])
  return (
    <div>
        <div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="watchlogo" />
        </div>
        <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="ok" /> </div>
        <div>
            
        </div>
        <div>
            {/* <img src={PImage[sImage]} alt="logo1" /> */}
        </div>
        <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="replic" /> </div>
        <div style={{display:"flex"  }}>
        <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="k" /></div>
        <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="k" /></div>
        <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="k" /></div>
        </div>
        <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="p" /></div>
        {/* <div> <img src={rImage[s5Image]} alt="logo2" /> </div> */}
        <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="kj" /></div>
        {/* <div> <img src={kImage[s5Image]} alt="logo_5" /> </div> */}
        <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="ok" /> </div>
        <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="pp" /></div>
        <div style={{display:"flex"  }}> 
        <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="dhs" />      </div>
        <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="faa" /></div>
        <div> <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="dds" /></div> </div>
        <div><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFbIB1vita84U3eC7F57vtN-WFkM7sJ35to4v9SdrwiQ&s" alt="ls" /></div>
    </div>
  )
}

export default Slider2