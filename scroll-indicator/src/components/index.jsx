import { useEffect, useState } from "react"


export default function ScrollIndicator({url}) {

   const [data, setData] = useState([])
   const [loading, setLoading] = useState(false)
   const [errorMsg, setErrorMsg] = useState('')
   const [scrollPercentage, setScrollPercentage] = useState(0)

   async function fetchData(getUrl) {
      try{
        setLoading(true)
        const response = await fetch(getUrl)
        const data = await response.json()
        if(data && data.products && data.products.length > 0) {
            setData(data.products)
            setLoading(false)
        }
        
      }catch(e){
       console.log(e)
       setErrorMsg(e.message)
       setLoading(false)
      }
   }
  
 
   useEffect(() => {
     fetchData(url) 
   }, [url])

   function handleScrollPercentage() {
    console.log(
      document.body.scrollTop,
      document.documentElement.scrollTop,
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    )

    const howMuchScrolled = 
       document.body.scrollTop || document.documentElement.scrollTop

    const height = 
       document.documentElement.scrollHeight - 
         document.documentElement.clientHeight  

    setScrollPercentage( (howMuchScrolled/height) *100)     
   }
   useEffect(() => {
     window.addEventListener('scroll', handleScrollPercentage)
     return() => {
      window.removeEventListener('scroll', ()=> {})
     }
   }, [])

   if(loading) {
    return(
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }
   console.log(loading, scrollPercentage)
    return(
        <div>
          <div className="top-container">
          <h1>SCROLL INDICATOR</h1>
          <div className="scroll-progress-tracking-container">
            <div 
              className="current-progress-bar" 
              style={{width: `${scrollPercentage}%`}}></div>
          </div>
          </div>
         <div className=""data-container>
           {
            data && data.length ? 
             data.map(item => <p>{item.title}</p>)
            : null
           } 
         </div>
        </div>
    )
}