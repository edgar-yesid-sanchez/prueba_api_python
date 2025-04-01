import './Home.css'
import HomeUI from './HomeUI'
import { HomeProvider } from '../../context/HomeContext'
function Home() {

  return (
    <>
     <HomeProvider>
      <HomeUI />
     </HomeProvider>
    </>
  )
}

export default Home
