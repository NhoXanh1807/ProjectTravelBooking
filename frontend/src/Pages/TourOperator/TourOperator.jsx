import React from 'react'
import OperatorHeader from '../../Components/Headers/OperatorHeader/OperatorHeader'
import OperatorSearchBar from '../../shared/Searched-bar/operator-searched-bar'
import './TourOperator.css'

const TourOperator = () => {

  return (
    <body>
        <OperatorHeader/>
        <div className="TourOperator">
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
                <h1>All tours</h1>
                <button>Add new tour</button>
            </div>
            <div className="tour-list">
                <OperatorSearchBar/>
                
            </div>
        </div>
    </body>
  )
}

export default TourOperator