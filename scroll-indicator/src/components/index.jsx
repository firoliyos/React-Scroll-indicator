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
        <h3>Loading...</h3>
      </div>
    )
  }
   console.log(loading, data)
    return(
        <div>
          <h1>SCROLL INDICATOR</h1>
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